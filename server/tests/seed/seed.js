const {ObjectId}=require("mongodb");
const {Todo}=require("./../../models/todo");
const jwt=require("jsonwebtoken");
const {usr}=require("./../../models/user");


const  userOneId=new ObjectId();
const  userTwoId=new ObjectId();
const users=[
{
    _id:userOneId,
    email:"nil@gmail.com",
    password:"nil1234",
    tokens:[
        {
            access:"auth",
            token:jwt.sign({_id:userOneId,access:'auth'},process.env.JWT_SECRET).toString()
        }
    ]
},
{
    _id:userTwoId,
    email:"het@gmail.com",
    password:"het123",
    tokens:[
        {
            access:"auth",
            token:jwt.sign({_id:userTwoId,access:'auth'},process.env.JWT_SECRET).toString()
        }
    ]
}];
const todos=[{
    _id:new ObjectId(),
    text:"first step todo",
    _creator:userOneId
},{
    _id:new ObjectId(),text:"second step todo",completed:true,completedAt:222,_creator:userTwoId
}];
const populateTodos=done=>{
  var todo1=new Todo(todos[0]).save();
  var todo2=new Todo(todos[1]).save();
  done();
};
const populateUsers=done=>{
    usr.remove({}).then(()=>{
        var user1=new usr(users[0]).save();
        var user2=new usr(users[1]).save();
        return Promise.all([user1,user2]);
    }).then(()=>{done();});

}
module.exports={todos,users,populateUsers,populateTodos};