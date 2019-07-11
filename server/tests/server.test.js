const expect=require("expect");
const supertest=require("supertest");

const {app}=require("./../server.js");
const {Todo}=require("./../models/todo");

// beforeEach(done=>{
//     Todo.remove({}).then(()=>{done();});
// });
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
                 console.log(todos.length);
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
                done();
            }).catch(e=>done(e));
        });
    });
})