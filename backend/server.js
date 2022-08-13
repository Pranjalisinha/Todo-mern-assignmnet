const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
require("dotenv").config();
const registercontroller = require("./routes/register");
const todoController = require("./routes/todo")

app.use(cors());
app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({extended: false}));

app.listen(process.env.PORT || 3001,(err)=>{
    if(!err){
        console.log("Server connected succesfully at 3001")
    }
    else{
        console.log(err)
    }
});

const url = "mongodb+srv://test1:test12@test1.bewchyb.mongodb.net/instaclone?retryWrites=true&w=majority"
mongoose.connect(url, (data)=>{
    console.log("Successfully connect to db")
},(err)=>{
    console.log(err)
});

app.use("/user", registercontroller)
app.use("/add",todoController);


app.get("/",(req,res)=>{
    res.status(200).send("Laundry app")
},(err)=>{
    console.log(err)
})

