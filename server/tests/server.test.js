const expect=require("expect");
const supertest=require("supertest");
const {ObjectId}=require("mongodb");

const {app}=require("./../server.js");
const {Todo}=require("./../models/todo");

// beforeEach(done=>{
//     Todo.remove({}).then(()=>{done();});
// });
const todos=[{
    _id:new ObjectId(),text:"first step todo"
},{
    _id:new ObjectId(),text:"second step todo"
}];
//Todo.insertMany(todos);
describe("POST /Todos",()=>{
    it("should a new todo work",done=>{
        var text="coding java";
        supertest(app).
        post("/todos").
        send({text}).
        expect(200).
        expect(res=>{
            expect(res.body.text).toBe(text);
        }).
        end((err,res)=>{
            if(err)
                return done(err);
            Todo.find().then(todos=>{
                // console.log(JSON.stringify(todos[0],undefined,2));
                 //console.log(todos.length);
                 expect(todos[todos.length-1].text).toBe(text);
                //expect(todos.length).toBe(1);
                //expect(todos[0].text).toBe(text);
                done();
            }).catch(e=>done(e));
        });

    });
    it("should not create todo with invalid body data",done=>{
        supertest(app).
        post("/todos").
        expect(400).
        end((err,res)=>{
            if(err)
                return done(err);
            Todo.find().then(doc=>{
                //expect(doc.length).toBe(0);
                //expect(doc.length).toBe(2);
                done();
            }).catch(e=>done(e));
        });
    });
});
describe("GET /todos",()=>{
    it("should return all todos",done=>{
        supertest(app).
        get("/todos").
        expect(200).
        end((err,res)=>{
            if(err)
                return done(e);
            //console.log(JSON.stringify(res.body,undefined,2));
            done();
        });
    });
});

describe("GET /todos/:id",()=>{
    it("should return specific todo item",done=>{
        supertest(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            //console.log(res.body);
            expect(res.body.t.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it("should return 404 if todo not found",done=>{
        supertest(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(404)
        .expect(res=>{ //this is not necessary as expected is 404
            expect(Object.keys(res.body).length).toBe(0);
        })
        .end(done);
    });

    it("sould return 404 for non-object id",done=>{
        supertest(app)
        .get("/todos/123")
        .expect(404)
        .expect(res=>{ //this is not necessary as expected is 404
            expect(Object.keys(res.body).length).toBe(0);
        })
        .end(done);
    });
});