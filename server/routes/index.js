const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.get('/', (req, res) =>{
    res.status(200).json({msg:'Hola'})
})


module.exports = router