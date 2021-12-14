var express=require('express');
var app=express();

app.listen('1026',function(request,response){


var type1=request.query.type;
console.log(type1);
if(type1=="register"){

var name1=request.query.name;
var contact1=request.query.contact;
var age1=request.query.age;
var username1=request.query.username;
var password1=request.query.password;
var confirmpassword1=request.query.confirmpassword;
var email1=request.query.email;
console.log("data received");


var url="mongodb://localhost:27017";
MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
if(err){throw err;}

var dbo=db.db("project");
var myobj={"name":name1,"contact":contact1,"age":age1,"username":username1,"password":password1,"email":email1,"confirmpassword":confirmpassword1};
dbo.collection("projectTable").insertOne(myobj,function(err,res){
if(err){
response.writeHead(400,{'content-type':'text/html'});
response.write("Data not sent to mongodb...");
console.log(res);
response.end();

throw err;}
response.writeHead(200,{'content-type':'text/html'});
response.write("Data sent to mongodb...");
console.log(res);
return response.end("Data sent to mongodb...");
});

});

}else if(type1=="login"){

var user1=request.query.username;
var pass1=request.query.password;
console.log("data received");

var url="mongodb://localhost:27017";
MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
if(err){throw err;}

var dbo=db.db("project");
var myobj={"username":user1};
dbo.collection("projectTable").find(myobj).toArray(function(err,res){
if(err){throw err;}

if(res.length==0){
response.writeHead(402,{'content-type':'text/plain'});
response.write("You haven't registered");
console.log("user isn't registered..");
response.end();
}else{
var found=0;
for(var i=0;i<res.length;i++){
if(res[i].password==pass1){
found=1;
}
}

if(found==0){
response.writeHead(401,{'content-type':'text/plain'});
response.write("Incorrect Password...");
console.log("Incorrect Password..");
response.end();
}else{
response.writeHead("200",{'Content-Type':'text/plain'});
response.writeHead("200",{'statusCode':'200'});

response.write("Login successfull...");
console.log("Login successfull..");
response.end();
}
}
});

});

}else if(type1=="purchase"){

var coursename1=request.query.coursename;
var courseid1=request.query.courseid;
var courseduration1=request.query.courseduration;
var courseprice1=request.query.courseprice;
var username1=request.query.username;
var password1=request.query.password;
var confirmpassword1=request.query.confirmpassword;
console.log(" purchase data received");


var url="mongodb://localhost:27017";
MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
if(err){throw err;}

var dbo=db.db("project");
var myobj={"coursename":coursename1,"courseid":courseid1,"courseduration":courseduration1,"courseprice":courseprice1,"password":password1,"email":email1,"confirmpassword":confirmpassword1};
dbo.collection("projectPurchase").insertOne(myobj,function(err,res){
if(err){
response.writeHead(400,{'content-type':'text/html'});
response.write("Data not sent to mongodb...");
console.log(res);
response.end();

throw err;}
response.writeHead(200,{'content-type':'text/html'});
response.write("Data sent to mongodb...");
console.log(res);
response.end();
});

});

}






});