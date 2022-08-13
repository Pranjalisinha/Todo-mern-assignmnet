const express=require("express")
const bcrypt=require("bcrypt")
const router=express.Router()
const jwt=require("jsonwebtoken")

const register_model = require("../Modules/register_modle")

const salt=10

router.post("/register",async(req,res)=>{
    const Email= await register_model.find({email:req.body.email})
    if(Email.length){
        res.status(400).send("User already exist")
     }else{       
             bcrypt.genSalt(salt,(salterr,saltval)=>{
             if(!salterr){
                  bcrypt.hash(req.body.password,saltval,(hasherr,hasval)=>{
                  if(!hasherr){
                      register_model.create({
                         username: req.body.username,
                         email: req.body.email,
                         password: hasval,
                         conform_password: hasval
                          })
                          res.status(200).send('User Register Succesfully')
                    }
                     else {
                       res.status(400).send("hasherr")
                     }
                  })
                }else
                  {
                  res.status(400).send("salterr")
                  }
            }) 
         }
    })


    router.post("/login", (req, res)=> {
        register_model.find({email: req.body.email}).then((userData)=> {
            if(userData.length) {
                bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                    if(val) {
                        const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                        res.status(200).send({authToken});
                    } else {
                        res.status(400).send("Invalid Password");
                    }
                })
            } else {
                res.status(400).send("Unauthorized user");
            }
        })
    });
    
    router.get("/user",(req,res)=>{
      try {
        const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY );
        register_model.find({email : user}).then((data)=>{
          // console.log(data)
          res.status(200).send({user: data});
        }).catch((err)=>{
          res.status(400).send(err);
        })
    } catch(err) {
        res.status(400).send("Unauthorize user")
    }  
  
    })

    module.exports=router