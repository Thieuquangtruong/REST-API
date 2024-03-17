const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
var bodyParser = require("body-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")
const authorRouter = require("./routes/author")
const bookRouter = require("./routes/book")


dotenv.config()
// connect database
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


app.use(bodyParser.json({limit: "50mb"}))
app.use(cors())
app.use(morgan("common"))

//add routes
app.use("/v1/author", authorRouter)
app.use("/v1/book", bookRouter)


app.get("/api", (req,res)=>{
    res.status(200).json("hello")
})

app.listen(3000, ()=>{
    console.log('Sever  is running...')
})