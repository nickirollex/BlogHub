const express = require('express')
const router = express.Router()
const User = require('../models/User') //User Model
const Blog = require('../models/Blog')


//GET ALL USERS 
router.get('/' , async(req,res)=>{
    try {
        const blogs = await Blog.find().count()
        res.status(200).json(blogs)
    } catch (error) {
        
    }
})

module.exports = router