var http=require('http');
var MongoClient=require('mongodb').MongoClient;
var URL=require('url');

http.createServer(function(request,response){
var myurl=URL.parse(request.url,true);
var query=myurl.query;
var type1=query.type;

if(type1=="register"){

var name1=query.name;
var contact1=query.contact;
var age1=query.age;
var username1=query.username;
var password1=query.password;
var confirmpassword1=query.confirmpassword;
var email1=query.email;
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

}else if(type1=="purchase"){

var coursename1=query.coursename;
var courseid1=query.courseid;
var courseduration1=query.courseduration;
var courseprice1=query.courseprice;
var username1=query.username;
var card_num1=query.card_num;
var card_name1=query.card_name;
var card_expiry1=query.card_expiry;
var card_cvv1=query.card_cvv;
console.log(" purchase data received");


var url="mongodb://localhost:27017";
MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
if(err){throw err;}

var dbo=db.db("project");
var myobj={"coursename":coursename1,"courseid":courseid1,"courseduration":courseduration1,"courseprice":courseprice1,"card_num":card_num1,"card_name":card_name1,"card_cvv":card_cvv1,"card_expiry":card_expiry1};
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


}).listen(1026);
console.log("Server running on port:1026");
