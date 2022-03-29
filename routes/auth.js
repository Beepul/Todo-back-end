const express = require('express');
const router = express.Router();

const{
    createSignup,
    readSignup,
    readbyidSignup,
    deleteSignup,
    updateSignup,
    userLogin
}= require("../container/auth");

router.post("/", createSignup);
router.get("/", readSignup);
router.get("/:id",readbyidSignup);
router.delete("/:id", deleteSignup);
router.put("/:id", updateSignup);
router.post("/login",userLogin);



module.exports = router;
