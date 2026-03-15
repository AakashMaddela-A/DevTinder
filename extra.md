-initialise git
-fitignore
-create a repo in github
-push into github


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
