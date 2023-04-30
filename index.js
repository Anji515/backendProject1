const { connection } = require("./config/db");
const Auth = require("./middleWares/auth.middleware");
const { notesRouter } = require("./routes/notes.route");
const userRouter = require("./routes/user.routes");
const express=require('express');
const cors=require('cors')
const app=express();

app.use(cors())
app.use(express.json());
app.use('/user',userRouter)

// protected
app.use(Auth)
app.use('/notes',notesRouter)


app.listen(process.env.port,async()=>{
    try {
      await connection   
      console.log('connected to db') 
    } catch (error) {
        console.log('error:', error)
    }
    console.log(`Server running at port ${process.env.port}`)
})