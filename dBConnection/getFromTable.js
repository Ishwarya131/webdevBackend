var connection = require('./../config');
var session = require('express-session');
var express= require('express')
var app=express()
var bodyParser=require('body-parser');
app.use(bodyParser);
app.use(session);
module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    session.email=email;
    session.sessionName;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.send('connection failed')
           
      }else{
       
        if(results.length >0){
  sqlPassword = results[0].password;
            if(password==sqlPassword){
              
              session.sessionName=results[0].name;
              console.log(session.sessionName);
                console.log("password matched")
                res.send('login successfull')
            }else{
                res.send("Email and password does not match")
                
            }
          
        }
        else{
          res.send("Email does not exits")
         
        }
      }
    });
}
module.exports.getProfile=function(req,res){
  var email=  session.email;
connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
        res.json({
          status:false,
          message:'there are some error with query'
          })
    }else{
     
      if(results.length >0){
        console.log(results);
var name = results[0].name;
email= results[0].email;
var followers= results[0].followers;
console.log(name)
var data={name:name, email:email,followers:followers}
console.log(data);
res.render("ViewProfile.ejs", {data:data}) 
      }
      else{
        res.json({
            status:false,    
          message:"Email does not exits"
        });
      }
    }
  });
}
module.exports.getFollowers=function(req,res){
  var email= req.body.email;
console.log(email);
connection.query('SELECT * FROM followers WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      var data="Connection problem";
    res.send(data);
    }else{
     console.log(results)
      if(results.length >0){

var data={'res':results}
console.log(data);
 res.send(data);
      }
      else{
        console.log("Not found")
        var data="Not found";
        res.send(data);
      }
    }
  });
}
module.exports.getSearch=function(req,res){
  var name= req.body.name;

connection.query('SELECT * FROM users WHERE name = ?',[name], function (error, results, fields) {
    if (error) {
      var data="Connection problem";
    res.send(data);
    }else{
     console.log(results)
      if(results.length >0){

var data={'res':results}
console.log(data);
 res.send(data);
      }
      else{
        var data="Not found";
        res.send(data);
      }
    }
  });
}

module.exports.getArticles=function(req,res){
  var email= req.body.email;
  console.log(email);
connection.query('SELECT * FROM article WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      var data="Connection problem";
    res.send(data);
    }else{
     console.log(results)
      if(results.length >0){

var data={'res':results}
console.log(data);
 res.send(data);
      }
      else{
        var data="Not found";
        res.send(data);
      }
    }
  });
}