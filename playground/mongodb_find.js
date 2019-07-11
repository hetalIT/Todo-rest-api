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
    // datab.collection("Users").find({location:"surat"}).toArray().then((doc)=>{
    //     console.log(JSON.stringify(doc,undefined,2));
    // },err=>{
    //     console.log("something went wrong",err);
    // });
    datab.collection("Users").find({location:"surat"}).count().then((doc)=>{
        console.log(`count:${doc}`);
    },err=>{
        console.log('something went wrong');
    });
    db.close();
});