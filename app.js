if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express=require("express")
const app=express();
const mongoose=require("mongoose");
const path=require('path');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const ExpressError=require('./utils/ExpressError');
const session=require('express-session');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js');

const eventsRouter=require('./routes/events.js');
const reviewsRouter=require('./routes/review.js');
const userRouter=require('./routes/user.js');
const paymentRoutes = require('./routes/payment.js');


const db_url=process.env.ATLASDB_URL;
const cors=require('cors');

main().then(()=>{
    console.log('connected to DB');
})
.catch((err)=>{
   console.log(err);
})

async function main(){
    await mongoose.connect(db_url);
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'/public')));



const store = MongoStore.create({
    mongoUrl:db_url,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600,
})

store.on('error',()=>{
    console.log('ERROR IN MONGODB STORE',err);
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(session(sessionOptions));
app.use(flash());//flash used before routes

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/home',(req,res)=>{
    res.send('hi root');
});


app.use(express.json());
app.use(cors());

app.use('/api',paymentRoutes);



app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
    next();
})

app.get('/demouser',async(req,res)=>{
    let fakeUser=new User({
        email:"stud@gmail.com",
        username:"deltai-stud",
    })
    let registeredUser=await User.register(fakeUser,"helloworld");
    res.send(registeredUser);
})

app.use('/events',eventsRouter);
app.use('/events/:id/reviews',reviewsRouter);
app.use('/',userRouter);

//catch all unmatched routes
app.use("*",(re,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "Something went wrong!"}=err
    res.status(statusCode).render('error.ejs',{err});
});

app.listen(8080,()=>{
    console.log('server is listening to port 8080');
});