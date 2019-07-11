const {ObjectId}=require('mongodb');
const {mongoose}=require("./../server/db/mongoose");
const {Todo}=require("./../server/models/todo");
const {usr}=require("./../server/models/user");
var id="5d270f1c54f61f516c9196cb";
if(!ObjectId.isValid(id))
{
    console.log("id not valid");
}
// Todo.find({_id:id}).then(doc=>{
//     console.log("Todos:",doc);
// });

// Todo.findOne({_id:id}).then(doc=>{
//     console.log("Todo:",doc);
// });

// Todo.findById(id).then(todo=>{
//     if(!todo){
//         return console.log('id not found');
//     }
//     console.log('Todo by id',todo);
// }).catch((e)=>console.log(e));

usr.findById("5d25a550012ecd2348cb0135").then(user=>{
    if(!user)
        return console.log("user not found");
    console.log(JSON.stringify(user,undefined,2));
},e=>{
    console.log(e);
});