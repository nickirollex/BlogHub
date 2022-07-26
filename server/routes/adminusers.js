const express = require('express')
const router = express.Router()
const User = require('../models/User') //User Model
const Blog = require('../models/Blog')


//GET ALL USERS 
router.get('/' , async(req,res)=>{
    try {
        const userCount = await User.find().count()
        res.status(200).json(userCount)
    } catch (error) {
        
    }
})

//SEARCH USER BY NAME
//GET METHOD
router.get('/search' , async(req, res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.json(error)
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

 //fetch using GEt method
router.put('/verification/:id', async(req, res)=>{
    try {
        const changeUserStatus = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(changeUserStatus)
    } catch (error) {
        res.status(500).json(error)
    }
 })

module.exports = router