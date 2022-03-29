const Contact = require("../model/Contact");


exports.createContact = async (req,res) => {
    const{firstname, lastname, email, phonenumber,message} = req.body;
    console.log(firstname, lastname, email, phonenumber,message)
    try{
        const contactExist = await Contact.findOne({firstname:firstname});
        if(contactExist){
            return res
            .status(409)
            .json({sucess:false, message: "Contact already exist"});
        }else{
            const contact = new Contact({firstname, lastname, email, phonenumber,message});
            const newContact = await todo.save();
            res.status(201).json({
                sucess: true,
                message: "Contact create sucessful",
                data: newContact,
            });
            console.log(newContact)
        }
    }catch(error){
        res.status(500).json({sucess: false, error: error});
    }
};