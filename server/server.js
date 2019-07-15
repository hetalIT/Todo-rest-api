const _=require("lodash");
const {ObjectId}=require("mongodb");
const express=require("express");
const bodyParser=require("body-parser");

var {mongoose}=require('./db/mongoose');    
var {Todo}=require("./models/todo");
var {usr}=require("./models/user");
var app=express();
const port=process.env.PORT||3000;
// console.log(JSON.stringify(port,undefined,2));
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
app.listen(port,()=>{
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

app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectId.isValid(id))
    {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then(todo=>{
            if(!todo) return res.status(404).send(); 
            res.send({todo});
     }).catch(err=>{
        res.status(400).send();
     });
});
 app.patch("/todos/:id",(req,res)=>{
    var id=req.params.id;
    var body=_.pick(req.body,['text','completed']);
    console.log(body);
    if(!ObjectId.isValid(id))
    {
        //console.log("id:",id);
        return res.status(404).send({1:'1'});
    }
    if(_.isBoolean(body.completed) && body.completed)
    {
        body.completedAt=new Date().getTime();
    }
    else
    {
        body.completed=false;
        body.completedAt=null;
    }
    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then(todo=>{
        if(!todo) return res.status(404).send({1:'2'});
        res.send({todo});
    }).catch(e=>{
        res.status(404).send({1:'3'});
    });
    // console.log(req.params);
    // res.send(req.params);
 });
module.exports={app};