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


    router.post("/login", async(req, res)=> {
      const signindata= await register_model.find({email:req.body.email})
      // console.log(signindata)
         if(signindata.length){
           const data= await bcrypt.compare(req.body.password,signindata[0].password)
             if(data){
              //generating token
                 const Authtoken=jwt.sign(signindata[0].email,process.env.SECRET_KEY)
                 const username = signindata[0].username
                 res.status(200).send({Authtoken: Authtoken, username: username})
              }
              else{
                 res.status(400).send("Invalid password")
              }
          }
          else{
            res.status(400).send(`Invalid User`)
          }
    });
    
    router.get("/data",(req,res)=>{
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