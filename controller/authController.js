const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// List all users
router.get('/users',(req,res)=>{
    User.find({},(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
})

// Register 
router.post('/register',(req,res)=>{

    // To encrypt password
    let hashpassword = bcrypt.hashSync(req.body.password,8); 

    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User'   
    },(err,data)=>{
        if(err) res.status(500).send("Error While registering.");
        res.status(200).send("Registration successful.")
    })

})

// Login User
router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) throw res.status(500).send({auth:false,token:"Error while login."})
        if(!user) throw res.status(200).send({auth:false,token:"No User Found. Register First."})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(!passIsValid) return res.status(200).send({auth:false,token:"Password Invalid."})

            // In case password matches
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400})
            res.status(200).send({auth:true,token:token});
        }
    })
})

// User info
router.get('/userinfo',(req,res)=>{
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:"No token Provided."});

    // Verifying token
    jwt.verify(token, config.secret, (err,user) => {
        if(err) res.status(200).send({auth:false,token:'Invalid Token'})
        User.findById(user.id,(err,result)=>{
            res.send(result)
        })
    })
})

// Delete user
router.delete('/delete',(req,res)=>{
    User.remove({},(err,res)=>{
        if(err) throw err;
        res.send("User(s) Deleted.")
    })
})

module.exports = router