var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser  = require("body-parser");
var expressLayouts = require("express-ejs-layouts");
var request = require('request');
var ejsmate = require('ejs-mate');

var server_url = 'http://localhost:7000/api/';


app.use(bodyParser.urlencoded({extended: true}));

app.set('views', './app/views');
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs')

app.use(express.static('./public'));


//static page route
app.get("/", function(req, res) {
  res.render('home');
});

// get submit new reward page
app.get("/rewards-admin", function(req, res){
  res.render('rewards');
});

///get single reward based on params id
app.get("/rewards-admin/:id", function(req, res) {
  var url = 'http://localhost:7000/api/rewards/' + req.params.id;
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
      console.log(req.params.id);
      res.render("showreward", {data: data, title: data.name});
    }
  } );
})

//get all rewards page
app.get("/allrewards", function(req, res) {
  var url = "http://localhost:7000/api/rewards";
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
      res.render("allrewards", {data: data, title: "All rewards page"});
    }
  });
});

// get submit new reward page
app.get("/rewards-admin/:id/edit", function(req, res){  
var url = "http://localhost:7000/api/rewards/" + req.params.id;
 request(url, function(error, response, body){
   if(!error && response.statusCode == 200){
     var data = JSON.parse(body);
     res.render("rewardedit", {data: data, title: "Edit" + data.name});
   }
 } );
});


//main Routing for users

app.get("/users", function(req, res){
  res.render("users");
})


//Server
app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function() {
  console.log('My express server is running at localhost', app.get('port'));
});

module.exports = app;
