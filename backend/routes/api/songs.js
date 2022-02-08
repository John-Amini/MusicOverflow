const express = require('express')
const router = express.Router();

router.get('/:id', (req,res) => {
//getting song info from database here
console.log("hit get song")

});

router.post('/',(req,res) => {
//adding song here
console.log("hit add song")

});

router.delete('/:id',(req,res)=> {
//deleting song here along with comments
console.log("hit delete song")
})




module.exports = router;
