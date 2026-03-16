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