var http=require('http');
var MongoClient=require('mongodb').MongoClient;
var URL=require('url');
const fetch=(...args)=>import('node-fetch').then(({default:fetch})=>fetch(...args));

http.createServer(function(request,response){
  var myurl=URL.parse(request.url,true);
  var query=myurl.query;
  var type1=query.type;
  console.log("Server running.");
  if(type1=="findCollege"){
    var stream_d=query.stream;
    var course_d=query.course;
    var exam_d=query.exam;
    var rank_d=query.rank;
    console.log("Data received.");
    var url="mongodb://localhost:27017";
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
      if(err){throw err;}
      var dbo=db.db("Ranklist");
      var collectionName=stream_d+"_"+course_d;
      dbo.collection(collectionName).find({"Exam":exam_d}).toArray(function(err,res){
        if(err){throw err;}
        var results=res.filter((obj)=>{var n=parseInt(obj.Rank);return (n > rank_d);});
        if(results.length==0){
          response.writeHead(402,{'content-type':'text/plain'});
          response.write("College not found.");
          console.log("Sorry, no college found for your rank.");
          response.end();
        }
        else{
            response.writeHead(200,{'content-type':'application/json', 'Access-Control-Allow-Origin': '*'});
            response.write(JSON.stringify(results));
            console.log("Congrats! Colleges found.");
            response.end();
        }
      });
    });
  }
}).listen(3000);
console.log("Server running on port 3000");
