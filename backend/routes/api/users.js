const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User , Song , Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );
  router.get('/:id',asyncHandler(async (req,res)=> {
      let id = req.params.id;
      id = +id;
      console.log("getting all user info")
      let user = await User.findByPk(id);
      if(!user){
        return res.json({error:"does not exist"})
      }
      const songs = await Song.findAll({
        where: { userId: id } ,
        order: [['createdAt', 'DESC']],
        include:{
            model: User
                }});

      const comments = await Comment.findAll({
        where:{userId:id},
        include : {
          model: Song
        } ,
        include: {
          model:User
      }
      })
                return res.json({songs,comments})
              })
  )
module.exports = router;
