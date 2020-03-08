const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const pollController = require('./pollController')
const app = express()

app.set('view engine','ejs')


app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/create', pollController.createPollGetController)
app.post('/create', pollController.createPollPostController)


app.get('/polls/:id', pollController.viewPollGetController)
app.post('/polls/:id', pollController.viewPollPostController)

app.get('/polls', pollController.getAllPolls)

app.get('/',(req,res) => {
    res.render('home')
})


dotenv.config()

//Connect to Db
mongoose.connect(
process.env.DB_CONNECT,
{ useUnifiedTopology: true },
 () => console.log('connected to Db'))