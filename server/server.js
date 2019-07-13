const {ObjectId}=require("mongodb");
const express=require("express");
const bodyParser=require("body-parser");

var {mongoose}=require('./db/mongoose');    
var {Todo}=require("./models/todo");
var {usr}=require("./models/user");
var app=express();
app.use(bodyParser.json());
app.post("/todos",(req,res)=>{
    var todo=new Todo({text:req.body.text});
    todo.save().then(doc=>{
        res.send(doc)},err=>{
            res.status(400).send(err);
        });
});

app.get("/todos",(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },err=>{res.status(400).send(err)});
});
app.listen(3000,()=>{
    console.log("server started on port 3000");
});

app.get("/todos/:id",(req,res)=>{
    var id=req.params.id;
    if(!ObjectId.isValid(id))
    {
        return res.status(404).send();
    }
    Todo.findById(id).then(t=>{
        if(!t)
            return res.status(404).send();
        res.send({t});
    },err=>{
        return res.status(400).send();
    });

});
module.exports={app};