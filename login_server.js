const express=require('express');
const app=express();
var opn = require('opn');
var open = require('open');
const bodyParser=require('body-parser');
const router = express.Router();
var MongoClient=require('mongodb').MongoClient;
app.use("/",router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/', (req, response) => {  
response.setHeader("Content-Type", "application/json");
response.setHeader("type", "object");
  var username1 = req.query.username;
  var password1 = req.query.password;
  console.log("data received");
  console.log(`Username: ${username1} Password: ${password1}`);

var url="mongodb://localhost:27017";
MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
if(err){throw err;}

var dbo=db.db("project");
var myobj={"username":username1};
dbo.collection("projectTable").find(myobj).toArray(function(err,res){
if(err){throw err;}

if(res.length==0){
console.log("user isn't registered..");
opn("C:\\Users\\Asus\\Desktop\\WEB tech project\\login_copy2.html",{target:'_self'});
response.sendStatus(402);
}else{
var found=0;
for(var i=0;i<res.length;i++){
if(res[i].password==password1){
found=1;
}
}

if(found==0){
console.log("Incorrect Password..");
opn("C:\\Users\\Asus\\Desktop\\WEB tech project\\login_copy3.html",{target:'_self'});
response.sendStatus(401);
response.end();
}else{

console.log("Login successfull..");
response.sendStatus(200);
opn("C:\\Users\\Asus\\Desktop\\WEB tech project\\home2.html",{target:'_self'});
}
}
});

});








  
});


app.listen(1027, () => console.log("This app is listening on port 1027"));

