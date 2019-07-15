var mongoose=require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp1"||process.env.mongodb_URI,{ useNewUrlParser: true,useFindAndModify: false },(err,db)=>{
    if(err)
        return console.log("Unable to connect to server");
    console.log("Connected to server");
});
module.exports={mongoose};