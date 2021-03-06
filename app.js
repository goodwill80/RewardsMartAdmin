var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser  = require("body-parser");
var expressLayouts = require("express-ejs-layouts");
var request = require('request');
var ejsmate = require('ejs-mate');

var server_url = 'https://blooming-earth-11592.herokuapp.com/api/';


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
  var url = 'https://blooming-earth-11592.herokuapp.com/api/rewards/' + req.params.id;
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
  var url = "https://blooming-earth-11592.herokuapp.com/api/rewards";
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
      res.render("allrewards", {data: data, title: "All rewards page"});
    }
  });
});

// get edit one reward page
app.get("/rewards-admin/:id/edit", function(req, res){
var url = "https://blooming-earth-11592.herokuapp.com/api/rewards/" + req.params.id;
 request(url, function(error, response, body){
   if(!error && response.statusCode == 200){
     var data = JSON.parse(body);
     res.render("rewardedit", {data: data, title: "Edit" + data.name});
   }
 } );
});


//main Routing for users
//ALL USERS
app.get("/users-admin", function(req, res){
  var url = "https://blooming-earth-11592.herokuapp.com/api/users";
  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("useradmin", {data: data, title: "All rewards page"})
    }
  });
});

//USER EDIT page
app.get("/users-admin/:id/edit", function(req, res) {
  var url = "https://blooming-earth-11592.herokuapp.com/api/users/" + req.params.id;
   request(url, function(error, response, body){
     if(!error && response.statusCode == 200){
       var data = JSON.parse(body);
       res.render("useredit", {data: data, title: "Edit" + data.profile.name});
     }
   } );
  });



//Register new user
app.get("/user-registration", function(req, res){
res.render("registerusers");
});

//analytics
app.get("/analytics", function(req, res){
res.render("analytics");
});


//Category
app.get("/category", function(req, res){
  var url = "https://blooming-earth-11592.herokuapp.com/api/category";
  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("category", {data: data, title: "Categories Summary"})
    }
  });
  });


//Server
app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function() {
  console.log('My express server is running at localhost', app.get('port'));
});

module.exports = app;
