// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../model/User');
// const router = express.Router();


// /* registering user */
// router.get("/", (req, res)=>{
//     res.send("what is te datata")
// })
// router.post('/signup', async(req, res)  => {

//     try {
//         const newuser = new User(req.body);
//         console.log(newuser);
//         const salt = await  bcrypt.genSalt(Number(10));
//         newuser.password = await bcrypt.hash(newuser.password, salt);
//         await newuser.save();
        
//     } catch (error) {

//         res.send("An error occur");
        
//     }
    

// })


module.exports = router;