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
    // datab.collection("Users").deleteMany({location:"surat"}).then((res)=>{
    //     console.log(res);
    // });

    // datab.collection("Users").deleteOne({completed:false}).then(res=>{
    //     console.log(res);
    // });

    // datab.collection("Users").findOneAndDelete({completed:true}).then(res=>{
    //     console.log(res);
    // });
    datab.collection("Users").findOneAndDelete({_id:new ObjectID('5d246a0cf0a24f31acd9319e')}).then(res=>{
        console.log(res);
    });
    db.close();
});