//const MongoClient=require("mongodb").MongoClient;
const {MongoClient,ObjectID}=require("mongodb");
var obj=new ObjectID();
//console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp1',{ useNewUrlParser: true },(err,db)=>{
    if(err)
    {
        return console.log('Unable to connect to mongodb server.');
    }
    console.log("connected to MongoDb server.");
    datab=db.db();
    // datab.collection("Users").findOneAndUpdate({completed:false},{$set:{completed:true}},{returnOriginal:false}).then(res=>{
    //     console.log(res);
    // });
    datab.collection("Users").findOneAndUpdate({_id:new ObjectID('5d2465af561f8d48b4157913')},{$set:{item:"book"},$inc:{qty:1}},{returnOriginal:false});
    db.close();
});