const userRoute = require("./routes/userRoutes");
const adminRoute =  require("./routes/adminRoutes");
const express = require("express")
const mongoose = require( 'mongoose')
const cors = require("cors")
const path = require("path"); 
const app = express()
const cookieParser = require("cookie-parser")
app.use (express.json())

app.use(cors(
  {origin: 'http://localhost:5174',
    credentials: true,}
))
app.use(cookieParser())

mongoose.connect("mongodb://localhost:27017/UserMangmentReact")

.then(() => {
    console.log(`MongoDB connected successfully to ${mongoose.connection.name}`);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
  app.use('/uploads', express.static(path.join(__dirname, 'multer', 'uploads')));

app.use("/user",userRoute)
app.use("/admin",adminRoute)

app.listen("3000",()=>{
    console.log("server started");
})

