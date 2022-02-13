const express = require('express')
const router = express.Router();
const formidable = require('formidable')
const AWS = require ('aws-sdk');
const fs = require ('fs')
const db = require("../../db/models");
const {Song,User} = db;
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const song = require('../../db/models/song');

 const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      })
router.get('/',asyncHandler(async (req, res) => {
    //hit get songs
    console.log("hit get songs");
    const songs = await Song.findAll({
        include:{
            model: User
                }});
          return res.json({songs});
        })
      )
async function checkIfExists(userId,title){
    let song = await Song.findAll({
        where:{
            userId:userId,
            title:title
        }
    })
    if(song.length === 0) return false;
    return true;
}
router.post('/',requireAuth,asyncHandler(async (req,res,next) => {
//adding song here
let errors = [];
let errorFlag = false
console.log("hit add song")
var form = new formidable.IncomingForm();
await form.parse(req, async function(err,fields,files) {
    console.log(fields)
    let exists = await checkIfExists(req.user.dataValues.id,fields.title)
    console.log(exists)
    if(exists){
        // const err = new Error('Same song same user');
        // err.status = 403;
        // err.title = 'Same song same user';
        // err.errors = ['You provided a song title that you have already uploaded.'];
        errors.push('You provided a song title that you have already uploaded.')
        errorFlag = true;
    }
    if(!files.song){
        errors.push("You did not upload a file!")
        errorFlag = true
    }
    if(files.song && !files.song.mimetype.includes("audio")){
        errors.push("The file you have sent is not a proper audio file");
        errorFlag = true;
    }
    console.log(files.song)
    if(errorFlag){
        const err = new Error('Upload problem');
        err.status = 403;
        err.errors = errors;
        return next(err);
    }

    if(files.song){
        //make sure user cannot upload same song twice with the same name
       await fs.readFile(files.song.filepath,async function(err,data){
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${req.user.email}/${fields.title}/${fields.title}.mp3`,
                Body: data,
            }
            await s3.upload(params, async (err, data) => {
                if (err) {
                 console.log(err)
                }
                console.log(data)
              let song = await Song.create({
                    userId: req.user.dataValues.id,
                    imageUrl:'S2otpG1NGNF93T22fLYsZzmExptk2LKjqrFk2LEFWLJs2xBtiybFiCrFk2LEFWLJsWIKsWTYsQVYsmxYgqxZNixBVgmwBlgwFONsWYANFmADRZgA2xZgA2wYANsWYANsWYANFmADbFmADbFmADRZgA2wYANsWYANBgAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD',
                    songUrl:data.Location,
                    title:fields.title,
                    albumId:1
                })
                return res.json({song})
              })
        })
    }
})
}));

router.delete('/:id',requireAuth,asyncHandler(async (req,res)=> {
//deleting song here along with comments
console.log("hit delete song")
let id = req.params.id;
id = +id;


const song = await Song.findByPk(id);
// console.log(song)
await song.destroy();

// console.log(song)
// console.log("adksjdbnasjhbdjhsab")
// console.log(req.user);
// console.log("adksjdbnasjhbdjhsab")

let key = buildKeyForAws(req.user.dataValues,song)
const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
}
await s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack);  // error
    else
        return res.json({song})
  });
}))

router.put('/',requireAuth,asyncHandler(async (req, res) => {
    let song = req.body.payload.song;
    let newTitle = req.body.payload.newTitle;
    let key = buildKeyForAwsNoDataValues(req.user.dataValues,song)
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key:`${req.user.dataValues.email}/${newTitle}/${newTitle}.mp3`,
        CopySource: `${process.env.AWS_BUCKET_NAME}/${key}`,
    }
    console.log(params)
    await s3.copyObject(params,async function(err,data){
        if(err)console.log(err,err.stack);
        else  {
            console.log(data)
            console.log("copied")
          let encodedEmail = convertAt(req.user.dataValues.email);
          let url = createExpectedUrl(encodedEmail,newTitle);
          const updatedSong = await Song.update(
            { title: newTitle, songUrl:url },
            { where: { id: song.id} }
          )
        //   console.log(updatedSong);
            return res.json({song:updatedSong});
        }
    })
    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
}
await s3.deleteObject(deleteParams, function(err, data) {
    if (err) console.log(err, err.stack);  // error
    else
        console.log("deleted")
  });
    console.log("HIT UPDATE")
    })
  )

function buildKeyForAws (user,song){
//the key for finding an object goes like userEmail/titleofsong/titleofsong.mp3
    let email = user.email;
    let title = song.dataValues.title;
    let str = `${email}/${title}/${title}.mp3`
    console.log(str)
    return str;
}
function buildKeyForAwsNoDataValues (user,song){
    //the key for finding an object goes like userEmail/titleofsong/titleofsong.mp3
        let email = user.email;
        let title = song.title;
        let str = `${email}/${title}/${title}.mp3`
        console.log(str)
        return str;
    }
function convertAt(email){
    let newStr = email.replace('@','%40')
    console.log(newStr);
    return newStr;
}

function createExpectedUrl (email,title){
    let str = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${email}/${title}/${title}.mp3`
    return str
}
module.exports = router;
