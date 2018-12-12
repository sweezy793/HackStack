const express=require('express');
const app=express();
const http=require('http');
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user');
const Campground=require('./models/campground');
const Comment=require('./models/comment');
const seedDB=require('./seeds');
const methodOverride=require('method-override');

const campgroundRoutes=require("./routes/campgrounds");
const commentRoutes=require("./routes/comments");
const indexRoutes=require("./routes/index");

//seedDB();

mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

//Passport config

app.use(require('express-session')({
    secret:"Secret",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next)
{
    res.locals.currentUser=req.user;
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

http.createServer(app).listen("3000",(req,res)=>{
    console.log("Server is running");
});