const About = require("../model/About");

exports.createAbout = async (req,res) => {
    const{abouttitle, aboutdescription} = req.body;
    console.log(abouttitle, aboutdescription)
    try{
        const aboutExist = await About.findOne({abouttitle: abouttitle});
        if(aboutExist){
            return res
            .status(409)
            .json({sucess:false, message: "Info already exist"});
        }else{
            const about = new About({abouttitle, aboutdescription});
            const newAbout = await about.save();
            res.status(201).json({
                sucess: true,
                message: "Info create sucessful",
                data: newAbout,
            });
            console.log(newAbout)
        }
    }catch(error){
        res.status(500).json({sucess: false, error: error});
    }
};

exports.readAbout = async(req,res)=>{
    try{
        const about = await About.find();
        res.status(200).json({sucess: true, data: about});
    }catch(error){
        res.status(404).json({sucess:false, error:error});
    }
}

exports.deleteAbout = async(req,res)=>{
    try{
        const _id = req.params.id;
        const aboutDel = await About.findByIdAndDelete(_id);
        console.log(_id)
    }catch(error){
        res.status(400).json({sucess:false, error: error});
    }
}