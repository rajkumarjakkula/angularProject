const { Router } = require('express')
const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const Admin=mongoose.model('Admin')
const jwt=require("jsonwebtoken")
// const {JWT_SERECTKEY}=require('../keys')

const middleware=(req,res,next)=>{
    console.log("middleware executed.....")
    next()
}

router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body
    if (!email  || !password ||!name){
        return res.status(422).json({error:"please enter all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,13)
        .then(hashedpassword=>{
            const user = new User(  {
                email:email,
                password:hashedpassword,
                name
            })
            user.save()
            .then(()=>{
                return res.json({message:"successfully Signup"})
            })
            .catch(error=>{
                console.log(error)
            })
        })
        
    })
    .catch(error=>{
        console.log(error)
    })
})
router.post('/adminsignup',(req,res)=>{
    const {name,email,password}=req.body
    if (!email  || !password ||!name){
        return res.status(422).json({error:"please enter all the fields"})
    }
    Admin.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,13)
        .then(hashedpassword=>{
            const user = new Admin(  {
                email:email,
                password:hashedpassword,
                name
            })
            user.save()
            .then(()=>{
                return res.json({message:"successfully Signup"})
            })
            .catch(error=>{
                console.log(error)
            })
        })
        
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get('/allusers',middleware,(req,res)=>{
    User.find()
   // console.log("entered..")
    .then(Users=>{
        res.json(Users)
    })
    .catch(err=>{
        res.json(err)
    })
})

router.post('/adminsignin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please enter all the fields"})
    }
    Admin.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid mail or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                res.send({message:"signin successful"})
            }
            else
            {
                return res.status(422).json({error:"Invalid mail or password"})
            }  
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please enter all the fields"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid mail or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                res.send({message:"signin successful"})
            }
            else{
                return res.status(422).json({error:"Invalid mail or password"})
            }  
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
router.put('/updateuser/:userId',middleware,(req,res)=>{

    const id=req.params.userId;
    User.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
    .then(user=>{
        if(!user){
        return res.status(422).json({message:"cannot update this user"})
        }
        else{
            res.send(user)
        }
    })
    .catch(err=>{
        console.log(err)
    })
})
router.delete('/deleteuser/:userId',middleware,(req,res)=>{
    User.findByIdAndDelete({_id:req.params.userId})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:err})
        }else{
            res.send({
                message:"user deleted successfully"
            })
        }
            
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports=router