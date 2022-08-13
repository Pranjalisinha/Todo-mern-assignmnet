const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const todo_model = require("../Modules/todo_modal");
const register_model = require("../Modules/register_modle")

router.post("/task", (req, res)=>{
    try {
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
        register_model.find({email:user}).then((data)=>{
            if(data.length){
                todo_model.create({
                    activity:req.body.activity,
                    status: req.body.status,
                    timetaken: req.body.timetaken,
                    action:req.body.action
                }).then(()=>{
                    res.status(200).send("Activity Added")
                })
            } else{
                res.status.apply(400).send('Uauthorize user')
            }
        }).catch((err)=>{
            res.status(400).send(err);
        })

    } catch(err) {
        // console.log(err)
        res.status(400).send("Unauthorize user")
    }    
   
})

router.get("/todo", (req,res)=>{
    const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
    register_model.find({email:user}).then((data)=>{
        if(data.length){
            todo_model.find({activity}).then((data)=>{
                res.status(200).send({task: data})
            })
        } else{
            res.status.apply(400).send('Uauthorize user')
        }
})
});
module.exports=router