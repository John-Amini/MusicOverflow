const express = require('express')
const router = express.Router();
const formidable = require('formidable')
const AWS = require ('aws-sdk');
const fs = require ('fs')
const Song = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');

 const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      })
router.get('/:id', (req,res) => {
//getting song info from database here
console.log("hit get song")

});
async function testingSong (songData,obj){
    obj.songData = songData;
}
async function testingImage (imageData,obj){
    obj.imageData = imageData;
}
router.post('/',requireAuth,async (req,res) => {
//adding song here
console.log("hit add song")

var form = new formidable.IncomingForm();

await form.parse(req, async function(err,fields,files) {
    console.log(fields)
    // console.log(req)
    var imageData;
    var songData;
    var obj = {}
    if(files.song){
        // console.log(files.song.filepath)
        //make sure user cannot upload same song twice with the same name
       await fs.readFile(files.song.filepath,async function(err,data){
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${req.user.email}/${fields.title}/${fields.title}.mp3`,
                Body: data
            }
            await s3.upload(params, async (err, data) => {
                if (err) {
                 console.log(err)
                }
                songData = data
                obj.songData = data;
                await testingSong(data,obj)
                // console.log(data)
                //files.song.originalFilename is the name given for the song
                //data.location is songUrl
                //fields.album and fields.title have name
                //ignore image for now
                //req.user is person
                //req.user.dataValues.id is their id
                // let song = Song.build()
                // console.log(songData)
              })
        })
    }
    if(files.image){
       await fs.readFile(files.image.filepath, async function(err,data){
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${req.user.email}/${fields.title}/${fields.title}.png`,
                Body: data
            }
           await s3.upload(params, async (err, data) => {
                if (err) {
                 console.log(err)
                }
                imageData = data
                obj.imageData = data
                console.log("daksjbdaskjdb")
                console.log(imageData)
                console.log("asdnaskjhdnasjhkdn")
                await testingImage(data,obj)
                console.log(obj)
              })
        })

    }
    console.log("song data outside",songData);
    console.log("image data outside",imageData)
    console.log("obj",obj)
})
// console.log(req);
// console.log(req.file)

});

router.delete('/:id',(req,res)=> {
//deleting song here along with comments
console.log("hit delete song")
})




module.exports = router;
