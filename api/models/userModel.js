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
        default:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_960_720.png&f=1&nofb=1&ipt=1a5b1b53f0cd999e61c3884ab88440c2d9acc2cd3a44462cf65e023777e4af32&ipo=images"

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