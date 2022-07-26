const express = require('express')
const router = express.Router()
const User = require('../models/User') //User Model
const Blog = require('../models/Blog')
const bcrypt = require('bcrypt')
const passport = require('passport')

//POST method to Add New Users
router.post('/register', async (req, res)=>{
 
    try {
        //password encryption
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    const newUser = new User({
        name: req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
    const user = await newUser.save();
    res.status(200).json(user)
    console.log(user)
   } catch (error) {
       res.status(500).json(error)
   }
})

//Login 
router.post('/login', (req, res, next)=>{
    passport.authenticate("local", (err, user, info )=>{
        if(err) throw err;
        if(!user) res.status(400).json('No User Exists')
        else{
            req.logIn(user, err =>{
                if(err) throw err;

                //if successfull
                const {password, ...others} = user._doc
                res.status(200).json(others)
                console.log(req.user)
            })
        }
    })(req, res, next)
})

//Update with PUT method
router.put('/:id', async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
      
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
                res.status(200).json(updatedUser)
            } catch (error) {
              res.status(500).json(error)
            }
        
    } catch (error) {
        res.status(500).json(error)
    }
})

//Remove with delete method
router.delete('/:id', async (req,res)=>{
    if(req.body.userId === req.params.id){
       try {
         const user =  await User.findById(req.params.id)
        try {
            await Blog.deleteMany({user: user.user})
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('User Removed')
        } catch (error) {
             res.status(500).json(error)
        }
       } catch (error) {
           res.status(401).json(`User with: ${req.params.id} Not Found!!!`)
       }
        
    }else{
        return res.status(401).json('You Can Only Update Your Account')
    }
})

//fetch using GEt method
router.get('/:id', async(req, res)=>{
   try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
   } catch (error) {
       res.status(500).json(error)
   }
})


router.get('/' ,async (req, res)=>{ 
    try {
       
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json(error)
    }
    })
    
//logout
    router.get('/logout', (req, res)=>{
        req.logout()
    })
    

module.exports = router