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
    datab.collection('Users').insertOne({
        text:"add something to do",completed:false
    },(err,res)=>{
        if(err)
            return console.log('unable to insert todo',err);
        console.log(JSON.stringify(res.ops,undefined,2));
        //console.log(JSON.stringify(res.ops[0]._id.getTimestamp()));
    });

    // datab.collection('Users').insert([{
    //     name:"hetal",age:22,location:"surat"
    // },{ item: "eraser", qty: 25 }],(err,res)=>{
    //     if(err)
    //         return console.log("unable to insert user",err);
    //     console.log(JSON.stringify(res.ops,undefined,2));
    // });
    db.close();
});