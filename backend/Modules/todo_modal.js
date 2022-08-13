const mongoose=require("mongoose")

const TodoSchema=mongoose.Schema({
    activity: String,
    status: String,
    timetaken: String,
    action: String,

})
const todo_model = mongoose.model("taskAdd",TodoSchema)
module.exports= todo_model;