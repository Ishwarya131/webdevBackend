
var connection = require('./../config.js');

var express= require('express')
var session = require('express-session');
var app=express()
var bodyParser=require('body-parser');
app.use(bodyParser);
app.use(session);
module.exports.register=function(req,res){
    var today = new Date();
    var users={
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "created_at":today,
        "followers":""
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
          console.log("error")
        res.send('email may already exist')
      }else{
        console.log("success")
        res.send("successfully registered")
      }
    });
}
module.exports.update=function(req,res){
  console.log("Entered Update");
        var email=req.body.email;
        console.log(session.email)
        var name=session.sessionName;
        //var sql="update users set followers=concat(followers,' "+name+"') where email='"+email+"'";
        if(email==session.email){
          res.send('you cannot follow yourself');
        }
        else{
        var followers={
          "email": email,
          "follower":name
        }
        var sql="insert into followers SET ?";
        console.log(sql);
  connection.query(sql,followers, function (error, results, fields) {
    if (error) {
        console.log("error")
      res.send('already following')
    }else{
      console.log("success")
      res.send("following")
    }
  });
}
}

module.exports.save=function(req,res){
  console.log("Entered Update");
        var email= session.email;
        var head=req.body.head;
        var content=req.body.content;
        console.log(email);
        //var sql="update users set followers=concat(followers,' "+name+"') where email='"+email+"'";
        var article={
          "email": email,
          "head":head,
          "content": content
        }
        var sql="insert into article SET ?";
        console.log(sql);
  connection.query(sql,article, function (error, results, fields) {
    if (error) {
        console.log("error in saving");
      res.send('failed to save try again');
    }else{
      console.log("save success");
      res.send("Saved Successfully");
    }
  });
}