
const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:25,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:" + value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password:" + value)
            }
        }

    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender Not Valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://files.reva.ac.in/uploads/faculty_images/6555dd1f7308b1700125983.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URl:" + value)
            }
        }
    },
    about:{
        type:String,
        default:"This is default about of the user!",
    },
    skills:{
        type:[String],
        validate(value){
            if(value.length>6){
                throw new Error("skills cannot be more than 6");
            }
        }
    }
},
{
    timestamps:true,
});

userSchema.methods.getJWT = async function(){

    const user=this;

    const token= await jwt.sign({_id:user._id},"DEV@Tinder2004",{
        expiresIn:"7d",
    });
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){

    const user=this;
    const passwordHash=user.password;

    const isPasswordValid= await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}

module.exports=mongoose.model("User",userSchema);