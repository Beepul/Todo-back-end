const Todo = require("../model/todo");

exports.create = async (req,res) => {
    const{todotitle, description} = req.body;
    console.log(todotitle, description)
    try{
        const todoExist = await Todo.findOne({todotitle: todotitle});
        if(todoExist){
            return res
            .status(409)
            .json({sucess:false, message: "Todo already exist"});
        }else{
            const todo = new Todo({todotitle, description});
            const newTodo = await todo.save();
            res.status(201).json({
                sucess: true,
                message: "Todo create sucessful",
                data: newTodo,
            });
            console.log(newTodo)
        }
    }catch(error){
        res.status(500).json({sucess: false, error: error});
    }
};

exports.todoList = async(req, res) =>{
    try{
        const todo = await Todo.find();
        res.status(200).json({sucess: true, data: todo});
    }catch(error){
        res.status(404).json({sucess: false, error: error});
    }
};

exports.todoDelete = async(req, res) => {
    try{
        const _id = req.params.id;
        const todoDel = await Todo.findByIdAndDelete(_id);
        if(!_id){
            res.status(404).json({sucess: false, message: "Todo not found"});
        }else{
            res.status(200).json({
                sucess: true,
                message: "Todo delete sucessful",
                data: todoDel,
            });
        }
    }catch(error){
        res.status(400).json({sucess:false, error: error});
    }
};

exports.todoListById = async(req, res) => {
    const _id = req.params.id;
    try{
        const todo = await Todo.findById(_id);
        if(!todo){
            res
            .status(404)
            .json({sucess:false, message: "Todo not found"});
        }else{
            res.status(200).json({sucess: true, data: todo});
        }
    }catch(error){
        res.status(500).json({sucess:false, error: error});
    }
};

exports.todoUpdate = async (req, res) =>{
    try {
        let id = req.params.id;
        console.log(id)
        let todo = await Todo.findByIdAndUpdate(id, {todotitle:req.body.todotitle, description:req.body.description}, {new:true});
        if(!todo){
            return res.status(400).json({success: false, message: "cannot update"});
        } else {
            res.status(201).json({
            success: true,
            message: "todo update successfull",
            data: todo,
      });
    }
    
        
    } catch (error) {
         res.status(500).json({success: false, error: error});
         console.log(error)
    }
};