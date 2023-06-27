var express = require('express');
 const morgan=require('morgan');
var app = express();

var mysql = require('mysql');

app.set("view engine", "ejs");//template engine


  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'reservation' 
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });
  

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));//parses URL-encoded data


app.use(express.static("public"));  
 //default route

app.get("/", function(req, res){
 res.send("Test response from our web app");
}); //route format: app.method(path, callback)

app.get("/test", function(req,res)
{
var teststring="This is under /test route";
res.send(teststring);
});

app.get("/num", function(req,res)
{

var num= Math.floor((Math.random() *100)+1);
res.send(" A random number from server is "+ num);
}); 



//hello route for GET method 
app.get("/hello", function(req, res) {
    const html =
    `<h1>Response is coming from hello route using GET method</h1>
    <h2>Hello, ${req.query.res_name}!</h2>
    <p>Your ${req.query.seat_number}.</p>`;
    res.send(html);
    });
    
    //hello route for POST method 
app.post("/hello", function(req, res) {
    const html =
    `<h1>Response is coming from hello route using POST method</h1>
    <h2>Hello, ${req.body.res_name}!</h2>
    <p>Your ${req.body.seat_number}.</p>
    <p>Your ${req.body.res_date_time}.</p>`;
    res.send(html);
    });

    app.get("/home", function(req, res) {
        //res.send("Test response from our web app");
        res.render("home", { name: req.body.res_name, ticket_number: req.body.res_ticket_number, seat_number:req.body.res_seat_number });
        });
        
        app.post("/register", function(req, res) {
            //var std_GPA = (Math.random() * 4.0).toFixed(2);
            var passenger_info = { Name: req.body.res_name, seat_number: req.body.res_seat_number,date_time:req.body.res_date_time,Destination:req.body.dest}; //std info 
            var q = "insert into reservation_system set ?";
            con.query(q, passenger_info, function(error, results) {
            if (error) throw error;
            res.redirect("/db"); //redirect to root page 
           // res.send("insert");
            });
            });
            

        //responding for database related request 

        app.get("/db", function(req, res){
            var q = 'SELECT COUNT(*) as count FROM reservation_system';
            con.query(q, function (error, results) {
            if (error) throw error;
            //var msg = "Currently  " + results[0].count + " students are in Student table";
            //res.send(msg);
            let count= results[0].count;
            res.render("home.ejs",{data:count});
            });
           });


           //Display all passengers 
app.get("/display", function(req, res) {
    var q = "select * from reservation_system";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("DisplayAll", { data: results });
    });
    });

    //search get route in app.js 
app.get("/search", function(req, res) {
    res.render("search");
    });


    //search post route for a passenger 
app.post("/search", function(req, res) {
    var res_ticket_Number = req.body.res_ticket_Number;
    console.log("Searched ticket number:" + res_ticket_Number);
    var q = "select * from reservation_system where ticket_number = ?";
    con.query(q, [res_ticket_Number], function(error, results) {
    if (error) throw error;
    else {
    if (results.length == 0) //search unsuccessful
    res.send("No passenger found with ticket number: " + res_ticket_Number);
    else //search successful 
    res.render("search_result", { data: results[0] });
    }
    });
});

    
//Update operation Student table 
app.get("/update", function(req, res) {
    res.render("update");
    });

app.post("/update", function(req, res) {
    var res_ticket_Number = req.body.res_ticket_Number;
    var res_seat_number = req.body.res_seat_number;
    var dest = req.body.dest;
    var res_date_time = req.body.res_date_time;
  
    var q = "UPDATE reservation_system SET seat_number = ?, dest = ?, date_time = ? WHERE ticket_number = ?";
    con.query(q, [res_seat_number, dest,res_date_time,res_ticket_Number], function(error, results) {
      if (error) throw error;
      else {
        if (results.affectedRows === 0) {
          res.send("No passenger found with ticket number: " + res_ticket_Number);
        } else {
          res.send("Ticket updated successfully!");
        }
      }
    });
  });


  app.get("/delete", function(req, res) {
    res.render("delete");
    });

  app.post("/delete", function(req, res) {
    var res_ticket_Number = req.body.res_ticket_Number;
  
    var q = "DELETE FROM reservation_system WHERE ticket_number = ?";
    con.query(q, [res_ticket_Number], function(error, results) {
      if (error) throw error;
      else {
        if (results.affectedRows === 0) {
          res.send("No passenger found with ticket number: " + res_ticket_Number);
        } else {
          res.send("Ticket deleted successfully!");
        }
      }
    });
  });
  


    
           app.listen(8080, function () {
            console.log('App listening on port 8080!');
           });
