const express = require("express");
const router = express.Router();

const{
    create,
    todoList,
    todoDelete,
     todoListById,
     todoUpdate,
} = require("../container/todo");

router.post("/", create);

router.get("/", todoList );


router.put("/:id", todoUpdate );

router.delete("/:id", todoDelete);

 router.get("/:id", todoListById);






module.exports = router; 