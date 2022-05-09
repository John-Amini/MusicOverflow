const express = require("express");
const asyncHandler = require("express-async-handler");
const {requireAuth} = require ("../../utils/auth")
const db = require("../../db/models");
const {Song,User,Comment} = db;

const router = express.Router();




router.get('/songs/:id',asyncHandler(async (req,res,next)=>{
    let id = req.params.id;
    const comments = await Comment.findAll({
        order: [['createdAt', 'DESC']],
        where:{
            songId:id
        },
        include: {
            model:User
        }
    })
    return res.json({comments});
}))




router.post('/',requireAuth,asyncHandler(async (req,res,next) => {
    const {content,songId} = req.body;
    let comment = await Comment.create({
       userId:req.user.dataValues.id,
       songId:songId,
       body:content
    });
    return res.json({comment});
}))

router.delete('/:id',requireAuth,asyncHandler(async (req,res,next)=>{
    const{id} = req.params;
    let comment = await Comment.findByPk(id);
    await comment.destroy()
    return res.json({comment});
}))

router.put('/:id',requireAuth,asyncHandler(async (req,res,next) => {
    const{id} = req.params;
    const{newContent} = req.body;
    const updatedComment = await Comment.update(
        { body: newContent},
        { where: { id: id} }
      )
    return res.json({comment:updatedComment});
} ))


module.exports = router;
