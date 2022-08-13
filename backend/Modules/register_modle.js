const mongoose=require("mongoose")

const Regschema=mongoose.Schema({
   username: String,
    email: String,
    password: String,
    conform_password: String,
})
const register_model = mongoose.model("Users",Regschema)
module.exports= register_model;