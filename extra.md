-initialise git
-fitignore
-create a repo in github
-push into github




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




/*

// this will only handle GET call to user
app.get("/user/:userid",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Aakash",LastName:"Maddela"})
})

*/





/* Multiple route handlers and ep-5





/*
// route handler

app.use("/user",(req,res)=>{
    // route handler
    console.log("handling the route user!!");
    res.send("Route handler");
})

*/



/*
// multiple route handlers

app.use("/user",(req,res)=>{
    // route handler
    console.log("handling the route user!!");
    res.send("Route handler 1");
},
(req,res)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    res.send("Route handler 2");
});

// prints only route handler 1

*/




/*
// infinite loop

app.use("/user",(req,res)=>{
    // route handler

})

*/




/*
// multiple route handlers

app.use("/user",(req,res)=>{
    // route handler
    console.log("handling the route user!!");
    
},
(req,res)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    res.send("Route handler 2");
});

// hangs here because of no response in first one

*/





/*

app.use("/user",(req,res,next)=>{
    // route handler
    console.log("handling the route user!!");
    next();
},
(req,res)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    res.send("Route handler 2");
});


// route handler 2 in postman

*/




/*

app.use("/user",(req,res,next)=>{
    // route handler
    console.log("handling the route user!!");
    res.send("Route handler 1");
    next();
},
(req,res)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    res.send("Route handler 2");
});

// it prints route handler 1 and an error message in console

*/




/*

app.use("/user",(req,res,next)=>{
    // route handler
    console.log("handling the route user!!");
    next();
    res.send("Route handler 1");
},
(req,res)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    res.send("Route handler 2");
});

// prints in postman route handler 2 and console error


*/





/*


const express=require("express");

const app=express();

app.use("/user",(req,res,next)=>{
    // route handler
    console.log("handling the route user!!");
    next();
    res.send("Route handler 1");
},
(req,res)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    res.send("Route handler 2");
});


app.listen(3000,()=>{
    console.log("server started..");
});


*/




/*

app.use("/user",(req,res,next)=>{
    // route handler
    console.log("handling the route user!!");
    next();
    res.send("Route handler 1");
},
(req,res)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    res.send("Route handler 2");
},
(req,res)=>{
    // route handler 3
    console.log("handling the route user 3 !!");
    res.send("Route handler 3");
},
(req,res)=>{
    // route handler 4
    console.log("handling the route user 4 4!!");
    res.send("Route handler 4");
}

// route handler 2 and an error


*/




/*

app.use("/user",(req,res,next)=>{
    // route handler
    console.log("handling the route user!!");
    next();
},
(req,res,next)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    next();
},
(req,res,next)=>{
    // route handler 3
    console.log("handling the route user 3 !!");
    next();
},
(req,res,next)=>{
    // route handler 4
    console.log("handling the route user 4 4!!");
    next();
})

// error on post man CANNOT GET /USER  
 and expecting the route handler

*/




/*

app.use("/user",(req,res,next)=>{
    // route handler
    console.log("handling the route user!!");
    next();
    // res.send("Route handler 1");
},
(req,res,next)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    // res.send("Route handler 2");
    next();
},
(req,res,next)=>{
    // route handler 3
    console.log("handling the route user 3 !!");
    // res.send("Route handler 3");
    next();
},
(req,res)=>{
    // route handler 4
    console.log("handling the route user 4 4!!");
    res.send("Route handler 4");
})

// on postman route handler 4

*/





/*


const express=require("express");

const app=express();

app.use("/user",(req,res,next)=>{
    // route handler
    console.log("handling the route user!!");
    next();
    // res.send("Route handler 1");
},
(req,res,next)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    // res.send("Route handler 2");
    next();
},
(req,res,next)=>{
    // route handler 3
    console.log("handling the route user 3 !!");
    // res.send("Route handler 3");
    next();
},
(req,res)=>{
    // route handler 4
    console.log("handling the route user 4 4!!");
    res.send("Route handler 4");
}


);


app.listen(3000,()=>{
    console.log("server started..");
});



//on postman route handler 4


*/





/*

const express=require("express");

const app=express();

app.get("/user",(req,res,next)=>{
    console.log("handling the route user!!");
    next();
});
app.get("/user",(req,res,next)=>{
    console.log("handling the route user!!");
    res.send("2nd route handler");
});



app.listen(3000,()=>{
    console.log("server started..");
});

// on postman prints 2nd route handler

*/



/*

const express=require("express");

const app=express();

app.get("/user",(req,res,next)=>{
    console.log("handling the route user!!");
    next();
});
app.get("/user",(req,res,next)=>{
    console.log("handling the route user!!");
    res.send("2nd route handler");
});




app.listen(3000,()=>{
    console.log("server started..");
});

// prints the 2nd route handler

*/





/*

const express=require("express");

const app=express();

app.use("/",(req,res,next)=>{
    next();
})

app.get("/user",(req,res,next)=>{
    console.log("handling the route user!!");
    next();
});
app.get("/user",(req,res,next)=>{
    console.log("handling the route user!!");
    res.send("2nd route handler");
});




app.listen(3000,()=>{
    console.log("server started..");
});

*/



/*

const express=require("express");

const app=express();

app.get("/admin/getAllData",(req,res)=>{
    res.send("all data send")
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("all data send")
})


app.listen(3000,()=>{
    console.log("server started..");
});

*/






/*

app.js


const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);


app.get("/user", userAuth,(req,res)=>{
    res.send("All data send");
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("All data send");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Delete a user");
});

app.listen(3000,()=>{
    console.log("server started..");
});








auth.js



const adminAuth=(req,res,next)=>{
    // handle auth middleware for all
    console.log("Admin auth is getting checked");
    const token="xyz";
    const isAuthorised= token === "xyz";
    if(!isAuthorised){
        res.status(401).send("Unauthorised request");
    }
    else{
        next();
    }
};


const userAuth=(req,res,next)=>{
    // handle auth middleware for all
    console.log("Admin auth is getting checked");
    const token="xyz";
    const isAuthorised= token === "xyz";
    if(!isAuthorised){
        res.status(401).send("Unauthorised request");
    }
    else{
        next();
    }
};



module.exports={adminAuth,userAuth};



*/



/* Error handling */




































