const express = require('express');

const User = require("./model/User");
const todoRoute = require("./routes/todo");
const aboutRoute = require("./routes/about");
const signupRoute = require("./routes/auth");
const mongoose = require('mongoose');
const cors = require('cors');



var app = express();

var port = 8000;



//database connection
mongoose.connect("mongodb://localhost:27017/mytodoapi",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(() =>{
    console.log(`connection sucessful`);
}).catch((e) =>{
    console.log(e)
})


// connection to mongodb
// mongoose.connect('mongodb+srv://bipul:magar_0@cluster0.1oscj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ,

// ).then( () => console.log("connection sucessfuly..."))
// .catch((err) => console.log(err));



app.use(express.json());
app.use(cors());


app.use('/todo', todoRoute);
app.use('/about',aboutRoute);
app.use('/auth',signupRoute);


app.listen(port, () => {
    console.log(`your server is connected at local host: ${port}`)
})