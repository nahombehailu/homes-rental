import mongoose from "mongoose";

const userSchema=mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
       
    },
    profileImagePath:{
        type:String,
        required:true
    },
    tripList:{
        type:Array,
       default:[]
    },
    wishList:{
        type:Array,
        default:[]
    },
    propertyList:{
        type:Array,
        default:[]
    },
    reservationList:{
        type:Array,
        default:[]
    },
  


},{timestamps:true});

const User=mongoose.model("User",userSchema);
export default User;