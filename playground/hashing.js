// const {SHA256}=require("crypto-js");
// var h=SHA256("i am hetal").toString();
// console.log(h);
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

var password="hetal123";
bcrypt.genSalt(10,(err,salt)=>{
    //console.log(salt);
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log("hash",hash);
    });
});
var hashed="$2a$10$k6/mUyCOb3zJFZqmdZfxLOTvJTfwSOZTpOaFcXWSjNvHgBSqDAtZq";
bcrypt.compare(password,hashed,(err,res)=>{
    console.log(res);
});
// var data={
//     id:10
// };
// var token=jwt.sign(data,'abc123');
// console.log(token+'\n');
// var decoded=jwt.verify(token,'abc123');
// console.log(decoded);
// var tocken={
//     data,
//     hash:SHA256(JSON.stringify(data)+"somesecret").toString()
// };
// var returnHash=SHA256(JSON.stringify(tocken.data)+"somesecret").toString();
// if(returnHash===tocken.hash)
//     console.log("all good");