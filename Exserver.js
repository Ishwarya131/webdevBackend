var express= require('express')
var app=express()
var ejs=require('ejs')

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); 

var updateTable=require('./dBConnection/updateTable.js')
var getFromTable=require('./dBConnection/getFromTable.js')
app.listen(9000,function(req,res){
    console.log("running....")
})
app.get('/', function (req, res) {  
    console.log("html....")
    console.log(__dirname)
    //res.sendFile( __dirname + "/" +"Login_Signup.html") 
    res.render("Login_Signup.ejs") 
 }) 
 app.get('/ViewProfile', function (req, res) {  
    console.log("View profile Page html....")
    getFromTable.getProfile(req,res)
 }) 
 app.get('/CreateArticle', function (req, res) {  
    console.log("Create Article Page html....")
    res.render("CreateArticle.ejs") 
 }) 
 app.get('/SearchProfile', function (req, res) {  
    console.log("Search profile Page html....")
    res.render("SearchProfile.ejs") 
 })  
 app.post('/register',function(req,res){
     console.log("over")
     updateTable.register(req,res)
 });
 app.post('/authenticate',function(req,res){
    console.log("over")
    getFromTable.authenticate(req,res)
});
app.post('/Search',function(req,res){
   console.log("ajax call")
     getFromTable.getSearch(req,res)
});
app.post('/update',function(req,res){
   console.log("ajax call for update")
     updateTable.update(req,res)
});
app.post('/followList',function(req,res){
   console.log("ajax call for getting followers")
     getFromTable.getFollowers(req,res)
});
app.post('/save',function(req,res){
   console.log("ajax call for save")
   updateTable.save(req,res)
});
app.post('/ArticleList',function(req,res){
   console.log("ajax call for getting Articles")
     getFromTable.getArticles(req,res)
});

