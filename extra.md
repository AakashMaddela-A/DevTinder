-initialise git
-fitignore
-create a repo in github
-push into github


<!-- this is using of the methods -->

/*

app.use("/hello/2",(req,res)=>{
    res.send("this is hello api from server 2");
})


app.use("/hello",(req,res)=>{
    res.send("this is hello api from server 1");
})


app.use("/dash",(req,res)=>{
    res.send("this is dash");
})


app.use("/",(req,res)=>{
    res.send("Namaste Aakash");
})

*/


<!-- this is post, get, delete -->

/*

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

*/


<!--  -->
/*

// this will only handle GET call to user
app.get("/user/:userid",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Aakash",LastName:"Maddela"})
})

*/

