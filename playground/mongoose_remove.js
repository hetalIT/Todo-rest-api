const {ObjectId}=require('mongodb');
const {mongoose}=require("./../server/db/mongoose");
const {Todo}=require("./../server/models/todo");
const {usr}=require("./../server/models/user");

// usr.remove({}).then(result=>{
//     console.log("removed all");
// });
// Todo.find().then(node=>{
//     console.log(node);
// });
Todo.findOneAndRemove({_id:new ObjectId('5d270f276bc8dc3f24a735c4')}).then(res=>{
    console.log(res);
});
// Todo.findByIdAndRemove('5d258f081cf31a0c4437bca5').then(todo=>
// {
//     console.log(todo);
// });