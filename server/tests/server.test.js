const expect=require("expect");
const supertest=require("supertest");
const {ObjectId}=require("mongodb");

const {app}=require("./../server.js");
const {Todo}=require("./../models/todo");
const {usr}=require("./../models/user");
const {todos,users,populateUsers,populateTodos}=require("./seed/seed");
beforeEach(populateUsers);
//beforeEach(populateTodos);
// beforeEach(done=>{
//     Todo.remove({}).then(()=>{done();});
// });
Todo.insertMany(todos);
describe("POST /Todos",()=>{
    it("should a new todo work",done=>{
        var text="coding java";
        supertest(app).
        post("/todos").
        set("x-auth",users[0].tokens[0].token).
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
        set("x-auth",users[0].tokens[0].token).
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
        set("x-auth",users[0].tokens[0].token).
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
    it("sould not return todo block created by other user",done=>{
        supertest(app)
        .get(`/todos/${todos[1]._id.toHexString()}`)
        .set({'x-auth':users[0].tokens[0].token})
        .expect(404)
        .end(done);
    });
//     it("should return specific todo item",done=>{
//         supertest(app)
//         .get(`/todos/${todos[0]._id.toHexString()}`)
//          .set({'x-auth':users[0].tokens[0].token})
//         .expect(200)
//         .expect((res)=>{
//             //console.log(res.body);
//             expect(res.body.t.text).toBe(todos[0].text);
//         })
//         .end(done);
//     });

//     it("should return 404 if todo not found",done=>{
//         supertest(app)
//         .get(`/todos/${todos[0]._id.toHexString()}`)
//         .set({'x-auth':users[0].tokens[0].token})
//         .expect(404)
//         .expect(res=>{ //this is not necessary as expected is 404
//             expect(Object.keys(res.body).length).toBe(0);
//         })
//         .end(done);
//     });

//     it("sould return 404 for non-object id",done=>{
//         supertest(app)
//         .get("/todos/123")
//         .set({'x-auth':users[0].tokens[0].token})
//         .expect(404)
//         .expect(res=>{ //this is not necessary as expected is 404
//             expect(Object.keys(res.body).length).toBe(0);
//         })
//         .end(done);
//     });
    
});

describe("DELETE /todos/:id",()=>{
    // it("should remove a todo",done=>{
    //     supertest(app)
    //     .delete(`/todos/${todos[0]._id}`)
    //     .set({'x-auth':users[0].tokens[0].token})
    //     .expect(200)
    //     .expect(res=>{
    //         //console.log(res.body.todo);console.log(todos[0]);
    //         expect(res.body.todo._id).toBe(todos[0]._id.toHexString());
    //     })
    //     .end((err,res)=>{
    //         if(err)
    //             return done(err);
    //         Todo.findById(res._id).then(doc=>{
    //             expect(doc).toBeNull();
    //             done();
    //         }).catch(e=>done(e));
    //         //expect(Todo.findById(res._id)).toNotExist();
    //     });
    // });

    it("should not remove a todo of other user",done=>{
       // console.log(`/todos/${todos[1]._id}`);
        supertest(app)
        .delete(`/todos/${todos[0]._id}`)
        .set({'x-auth':users[1].tokens[0].token})
        .expect(res=>{
           // console.log(res.body);
        })
        .expect(404)
        .end(done);
    });

    it("should return 404 if todo not found",done=>{
        supertest(app)
        .delete(`/todos/5d296953ed83ba51c0ef3a01`)
        .set({'x-auth':users[0].tokens[0].token})
        .expect(404)
        .end(done);
    });

    it("should return 404 if object id is not valid",done=>{
        supertest(app)
        .delete("/todos/5d296953ed83ba51c0ef3a01")
        .set({'x-auth':users[0].tokens[0].token})
        .expect(404)
        .end(done);
    });
});

describe("PATCH /todos/:id",()=>{
    it("should update todo",done=>{
        text="books";
        supertest(app)
        .patch(`/todos/${todos[1]._id.toHexString()}`)
        .set({'x-auth':users[1].tokens[0].token})
        .send({completed:todos[1].completed,text:text})
        .expect(200)
        .expect(res=>{
            expect(res.body.todo.text).toBe(text);
            //expect(res.body.todo.completedAt).toBeA('number');
            expect(res.body.todo.completedAt).not.toBeNaN();
            expect(res.body.todo.completed).toBe(true);
        })
        .end(done);
    });
    it("should not update other user's todo",done=>{
        text="books";
        supertest(app)
        .patch(`/todos/${todos[1]._id.toHexString()}`)
        .set({'x-auth':users[0].tokens[0].token})
        .send({completed:todos[0].completed,text:text})
        .expect(404)
        .end(done);
    });

    it("should set null to completedAt when todo is not done",done=>{
        text="demo";
        supertest(app)
        .patch(`/todos/${todos[0]._id.toHexString()}`)
        .set({'x-auth':users[0].tokens[0].token})
        .send({completed:false,text:text})
        .expect(200)
        .expect(res=>{
            //console.log(JSON.stringify(res.body.todo,undefined,2));
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBeNull();
            expect(res.body.todo.completedAt).not.toBeTruthy();
        })
        .end(done);
    });
});

describe("GET /users/me",()=>{
    it("should return user if authenticated",done=>{
        supertest(app)
        .get("/users/me")
        .set("x-auth",users[0].tokens[0].token)
        .expect(200)
        .expect(res=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it("should return 401 if not authenticated",(done)=>{
        supertest(app)
        .get('/users/me')
        .expect(401)
        .expect(res=>{
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});
describe("POST /users",()=>{
    it("should create user",done=>{
        var email="nehal@gmail.com";
        var password="nehal123";
        supertest(app)
        .post("/users")
        .send({email,password})
        .expect(200)
        .expect(res=>{
            expect(res.headers['x-auth']).toBeTruthy();
            expect(res.body.email).toBe(email);
        })
        .end(done);
    });

    it("should return validations err if request is invalid",done=>{
        var email="nehalgmail.com";
        var password="nehal123";
        supertest(app)
        .post("/users")
        .send({email,password})
        .expect(404)
        .expect(res=>{
            expect(res.body).toEqual({});
        })
        .end(done);
    });

    it("should return err if email id already exist",done=>{
        var email="nil@gmail.com";
        var password="nehal123";
        supertest(app)
        .post("/users")
        .send({email,password})
        .expect(404)
        .expect(res=>{
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});

describe("POST /users/login",()=>{
    it("should login user and return tocken",done=>{
        supertest(app)
        .post("/users/login")
        .send({email:users[1].email,password:users[1].password})
        .expect(200)
        .expect(res=>{
            expect(res.headers['x-auth']).toBeTruthy();
        })
        .end((err,res)=>{
            if(err) return done(err);
            usr.findById(users[1]._id).then(user=>{
              expect(user.tokens[0]).toInclude({
                  access:'auth',
                  token:res.headers['x-auth']
              });
              done();
            }).catch(e=>done());
        });
    });
    it("should reject invalid login",done=>{
     supertest(app)
     .post("/users/login")
     .send({email:"s",password:users[1].password})
     .expect(400)
     .expect(res=>{
         expect(res.headers['x-auth']).not.toBeTruthy();
     })
     .end(done);
    });
});

describe("DELETE /users/me/token",()=>{
      it("should delete auth token on logout",done=>{
          supertest(app)
          .delete('/users/me/token')
          .set({'x-auth':users[0].tokens[0].token})
          .expect(200)
          .end((err,res)=>{
              if(err) return done(err);
              usr.findById(users[0]._id).then(user=>{
                  expect(user.tokens.length).toBe(0);
                  done();
              });
          })
      });
});