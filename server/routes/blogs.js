const express = require('express')
const router = express.Router()
const User = require('../models/User') //User Model
const Blog = require('../models/Blog')



//POST method to create New blog
router.post('/', async(req, res)=>{
    const newBlog = new Blog(req.body)
    try {
        const savedBlog =await newBlog.save()
        res.status(200).json(savedBlog)
      
    } catch (error) {
        return res.status(500).json(error)
    }

})

//Get all posts
router.get('/', async(req, res)=>{
    try {
     const blog = await Blog.find().sort({createAt: -1})
     res.status(200).json(blog)
    } catch (error) {
        res.status(500).json(error)
    }
 })
  
//fetching specific blogs based on user ID 
router.get('/:id', async(req, res)=>{
    try {
        const userRef = await User.findById(req.params.id)
     const blog = await Blog.find({user:userRef}).sort({createAt: -1})
     res.status(200).json(blog)
    } catch (error) {
        res.status(500).json(error)
    }
 })

 //fetching a post using post ID
 router.get('/user/:id', async(req, res)=>{
    try {
        const blog = await Blog.findById(req.params.id).lean()
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json(error)
    }
 })
 

//Update with PUT method
router.put('/:id', async (req,res)=>{
  try {
      const blog = await Blog.findById(req.params.id)
    
          try {
              const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
              res.status(200).json(updatedBlog)
          } catch (error) {
            res.status(500).json(error)
          }
      
  } catch (error) {
      res.status(500).json(error)
  }
})

//Remove with delete method
router.delete('/:id', async (req,res)=>{
    try {
         await Blog.findByIdAndRemove(req.params.id)
        res.status(200).json({msg:'Blog deleted'})
        
    } catch (error) {
        res.status(500).json(error)
    }
  })



module.exports = router