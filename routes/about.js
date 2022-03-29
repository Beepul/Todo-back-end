const express = require("express");
const router = express.Router();

const{
    createAbout,
    readAbout,
    deleteAbout,
    
    
} = require("../container/about");

router.post("/", createAbout);
router.get("/", readAbout);
router.delete("/", deleteAbout);



module.exports = router; 