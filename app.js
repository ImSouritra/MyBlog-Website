

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Everyone, at first I would like to introduce myself. I'm Souritra Samajdar. I am a student of B.tech Information Technology.  I am a web developer too as you can see. i developed this blog website post to display my day to blogs and to display my skills and works. I know this is little early to say that I know everything about developing a website, because I realized with time that there is so much more thing to learn about front-end and back-end. But I love to learn new things everyday so should you!.   ";
const aboutContent = "I started studying web developing exactly one year ago. At first I found out this coding thing very difficult to understand but I developed a love for this thing eventually. I used to do  coding and developing before I go to sleep for exact 1 hour, thus made it a  good practice to do it everyday. Some people get stuck and some leave coding at some point. But if you make it a practice to do it everyday and if you get stuck you do it the next day then you will never fail. Remember You fall 5 times , then you get up 6 times. So dont stop and never stop. Now I want to talk about my stacks which i use for webdesigning. I use HTML, CSS, BOOTSTRAP, & JAVASCRIPT for styling the front end and I use NODE.JS EXPRESS.JSS , EJS, SQL, NOSQL, MONGODB for designing my backend. I'm also currntly learning about REACT.JS.";
const contactContent = "No need to contact me. I will reach Out to you whenever you need . Remember I am a programmer :-) ";

const app = express();
let posts =[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){
  res.render("home", {
    homeContent : homeStartingContent,
    posts : posts
  });

});

app.get("/about", function(req, res){
  res.render("about", {
    about : aboutContent
  });
});

app.get("/contact",function(req, res){
  res.render("contact",{
    contact : contactContent
  });
});

app.get("/compose",function(req, res){
  res.render("compose")
})

app.post("/compose",function(req,res){
const post = {
  title : req.body.postTitle,
  content : req.body.postBody
};

posts.push(post);
res.redirect("/");

});

app.get("/posts/:new", function(req, res){
const requestedFile = _.lowerCase(req.params.new);

posts.forEach(function(post){
  const storedFile = _.lowerCase(post.title) ;
  if (storedFile === requestedFile) {
    res.render("post",{
      title: post.title,
      body : post.content
    });
  }
});
});





app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
