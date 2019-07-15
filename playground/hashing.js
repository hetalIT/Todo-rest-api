// const {SHA256}=require("crypto-js");
// var h=SHA256("i am hetal").toString();
// console.log(h);
const jwt=require("jsonwebtoken");

var data={
    id:10
};
var token=jwt.sign(data,'abc123');
console.log(token+'\n');
var decoded=jwt.verify(token,'abc123');
console.log(decoded);
// var tocken={
//     data,
//     hash:SHA256(JSON.stringify(data)+"somesecret").toString()
// };
// var returnHash=SHA256(JSON.stringify(tocken.data)+"somesecret").toString();
// if(returnHash===tocken.hash)
//     console.log("all good");