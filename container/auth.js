const Signup = require("../model/auth");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.createSignup = async(req, res) =>{
    const{
        firstname, 
        lastname,
        phonenumber, 
        email, 
        password, 
        confirmpassword,
        role
    }= req.body;
    if(!firstname || !lastname || !email || !phonenumber  || !password || !confirmpassword){
        console.log("please fill all the fields");
    }
    if(confirmpassword !== password){
        console.log("password doesnot match");
    }
    try{
       const signupExist = await Signup.findOne({email:email});
       if(signupExist){
           return res
           .status(409)
           .json({sucess:false , message:"Info already exist"});
           
       }else{
           const signup = new Signup({
                firstname, 
                lastname,
                phonenumber, 
                email,
                password: await bcrypt.hash(password, 10),
                confirmpassword: await bcrypt.hash(confirmpassword, 10),
                role,
           });
           
           const newSignup = await signup.save();
           res.status(201).json({
               sucess:true,
               message:"Info created",
               data: newSignup
           });
           console.log(newSignup);
       }
    }catch(error){
        console.log(error)
        res.status(500).json({sucess:false, error:error});
    }

};

exports.readSignup = async(req, res) =>{
    try{
      const signup = await Signup.find();
      res.status(200).json({sucess:true, data: signup});
    }catch(error){
      res.status(404).json({sucess:false, error:error});
    }
}

exports.readbyidSignup = async(req, res) =>{
    const _id = req.params.id;
    try{
      const signup = await Signup.findById(_id);
      if(!signup){
          res.status(404).json({sucess:false, message:"user not found"});
      }else{
          res.status(200).json({sucess:true, data: signup});
      }
    }catch(error){
          res.status(500).json({sucess:false, error:error});
    }
}

exports.deleteSignup = async(req, res)=>{
    const _id = req.params.id;
    try{
       const signup = await Signup.findByIdAndDelete(_id);
       if(!signup){
           res.status(404).json({sucess:false, message:"user not found"});
       }else{
           res.status(200).json({sucess:true, data: signup});
       }
    }catch(error){
           res.status(500).json({sucess:false, error:error});
    }
}

exports.updateSignup = async(req, res)=>{
    const id = req.params.id;
    try{
       const signup = await Signup.findByIdAndUpdate(id, {
           firstname: req.body.firstname,
           lastname: req.body.lastname, 
           phonenumber: req.body.phonenumber, 
           email: req.body.email, 
           password: req.body.password, 
           confirmpassword: req.body.confirmpassword  }, {new:true});
    if(!signup){
        res.status(404).json({sucess:false, message:"User not found"});
    }else{
        res.status(200).json({sucess:true, data:signup});
    }
    }catch(error){
        console.log(error)
        res.status(500).json({sucess:false, error:error});
    }
}

exports.userLogin = async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const userLog = await Signup.findOne({email:email});
        console.log(userLog)
        if(!userLog){
            console.log("invalid your email")
            res.status(404).send('invalid email');
        }
        else{
            const isMatch = bcrypt.compareSync(password, userLog.password);
            if(isMatch){
                let token = jwt.sign({ _id: userLog._id, role:userLog.role }, "njdssnkjfndsj");
                 res.json({ status: 'Login success!', token: token, role:userLog.role });
           }else{
            console.log("invalid password")
            res.send('invalid password details');
           }
          }
    }catch(error){
    res.status(400).send("invalid login details");
   }
}

   


