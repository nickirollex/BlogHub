const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors') ///Module for linking the backend to the frontend
const path = require('path')
const connectDB = require('./config/db');
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');
const mongoStore = require('connect-mongo')
const multer = require('multer')

dotenv.config({path: './config/config.env'})

const app = express()

//passport
require('./config/passport')(passport);
//middleware for backend-frontend connectivity
app.use(cors({
  origin: "http://localhost:3000", //URL of the react App
  credentials: true
}))
//port connectivity
const PORT = process.env.PORT || 8000

//body and json parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//
app.use("/images" ,express.static(path.join(__dirname, "/images")))

//connect db
connectDB()


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store:  mongoStore.create({
      mongoUrl: process.env.MONGO_URI
    })
  }))

  //passport middleqare
  app.use(passport.initialize())
  app.use(passport.session())

    //flash middleware
    app.use(flash())
      //global vaRs
  app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg= req.flash('error_msg')
    res.locals.error= req.flash('error')
    next()
})



//Get Home route
app.use('/', require('./routes/index'))
//Post regsiter route
app.use('/user', require('./routes/user'))
//Route for Adding new Blog
app.use('/blogs', require('./routes/blogs'))


app.use('/adminblogs', require('./routes/adminblogs'))
app.use('/adminusers', require('./routes/adminusers'))

//route to Upload images
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "images")
  },
  filename: (req,file, cb)=>{
    cb(null, req.body.name)
  }
})

const upload = multer({storage:storage})
app.post('/uploads', upload.single('file'), (req, res)=>{
  res.status(200).json('Image Has Been Uploaded')
})

app.listen(PORT, ()=>console.log(`Server started on port: ${PORT}`))