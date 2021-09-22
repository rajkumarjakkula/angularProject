const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors=require('cors')
const PORT=process.env.PORT ||5500
// Connect to DB
const {mongoURI}=require('./keys');

mongoose.connect(mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const middleware=(req,res,next)=>{
    console.log("Middleware executed")
    next()
}
app.get('/',middleware,(req,res)=>{
    res.send('rajkumar')
})

mongoose.connection.on('connected',()=>{
    console.log("mongo yeah")
})

mongoose.connection.on('error',(err)=>{
    console.log("mongo error",err)
})

app.use(cors())
require('./models/user')
app.use(express.json())
app.use(require('./routes/auth'))

app.post("/shortUrls", (req, res) => {});
app.listen(PORT,()=>{
    console.log("port working at", 5500)
});