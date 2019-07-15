const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const validator=require("validator");
const _=require("lodash");

var UserSchema=new mongoose.Schema({
    email:
    {
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
            access:{
                type:String,
                required:true
            },
            token:{
                type:String,
                required:true
            },
        }
    ]
});
UserSchema.methods.generateAuthToken=function(){
    var u=this;
    var access='auth';
    var token=jwt.sign({_id:u._id.toHexString(),access},'abc123').toString();
    u.tokens.push({
        access,token
    });
    return u.save().then(()=>{
        return token;
    });
};
UserSchema.methods.toJSON=function(){
    var user=this;
    var userObject=user.toObject();
    return _.pick(userObject,['_id','email']);
};
var usr=mongoose.model('user',UserSchema);
module.exports={usr};
// var {Todo}=require("./todo");
// var newTodo=new Todo({text:'neha patel'});
// newTodo.save().then((doc)=>{
//     console.log("saved todo",doc);
// },err=>{
//     console.log(err);
// });
