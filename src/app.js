const express=require("express");

const app=express();

// this will only handle GET call to user
app.get("/user",(req,res)=>{
    res.send({firstName:"Aakash",LastName:"Maddela"})
})

// this is post 
app.post("/user",(req,res)=>{
    console.log("Save Data to the database")
    res.send("data successfully saved to db")
})

// delete call
app.delete("/user",(req,res)=>{
    res.send("Deleted successfully")
})


// this will use all http method api calls to test
app.use("/test",(req,res)=>{
    res.send("hello from the server");
})



app.listen(3000,()=>{
    console.log("server started..");
});