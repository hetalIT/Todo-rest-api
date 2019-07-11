var mongoose=require("mongoose");

var usr=mongoose.model('user',{
    email:
    {
        type:String,
        required:true,
        trim:true,
        minlength:1
    }
});
module.exports={usr};
// var {Todo}=require("./todo");
// var newTodo=new Todo({text:'neha patel'});
// newTodo.save().then((doc)=>{
//     console.log("saved todo",doc);
// },err=>{
//     console.log(err);
// });
