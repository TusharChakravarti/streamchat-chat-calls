import mongoose, { Mongoose } from "mongoose"
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
fullName:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true
}
,password:{
    type:String,
      required: function () {
      return !this.googleId;
    },
    minlength:6

},
bio:{
    type:String,
    default:""

},
profilePic:{
    type:String,
    default:""

},
nativeLanguage:{
    type:String,
    default:""

},
learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },

    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    googleId: { type: String, default: null },
 
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    verificationTokenExpiry: { type: Date, default: null },

    resetPasswordToken: { type: String, default: null },
    resetPasswordExpiry: { type: Date, default: null },
 

},{timestamps:true})

//pre hook password hashing

userSchema.pre("save",async function(next){
    if(!this.isModified('password')|| !this.password) return next()
    try{
const salt = await bcrypt.genSalt(10)
 this.password = await bcrypt.hash(this.password,salt)
next()
    }
    catch(error ){
    next(error)
    }

});


userSchema.methods.matchPassword = async function(enteredPassword){
const isPasswordCorrect = await bcrypt.compare(enteredPassword,this.password)
return isPasswordCorrect
}

const User = mongoose.model("User",userSchema)




export  default User