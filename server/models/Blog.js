const mongoose = require('mongoose')

const blogSchema =  new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
       
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogImage:{
            type: String,
            required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
})



module.exports = mongoose.model('Blog',blogSchema )