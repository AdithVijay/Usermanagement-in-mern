const userRoute = require("./routes/userRoutes");
const express = require("express")
const mongoose = require( 'mongoose')
const cors = require("cors")
const path = require("path"); 
const app = express()
app.use (express.json())
app.use(cors())


mongoose.connect("mongodb://localhost:27017/UserMangmentReact")

.then(() => {
    console.log(`MongoDB connected successfully to ${mongoose.connection.name}`);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
  app.use('/uploads', express.static(path.join(__dirname, 'multer', 'uploads')));

app.use("/user",userRoute)

app.listen("3000",()=>{
    console.log("server started");
})

