// first connect to the database and then to listen
const express = require("express");
// conection of database 
const connectDB=require("./config/database");
const app = express();
const cookieParser=require("cookie-parser");


app.use(express.json());
app.use(cookieParser());


const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);







connectDB().then(()=>{
    console.log("database connection successfull");
    app.listen(3000,()=>{
    console.log("server started..");
});

}).catch((err)=>{
    console.error("database cannot be connected")
})



