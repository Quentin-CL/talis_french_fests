import { } from 'dotenv/config'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
import session from 'express-session';
import flash from "connect-flash";
import MongoStore from 'connect-mongo';
import passport from "passport";
import LocalStrategy from "passport-local";
import User from './models/user.js';
import axios from 'axios';

const dbUrl = 'mongodb://localhost:27017/french-fests';
mongoose.set('strictQuery', false);
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected");
});


import festsRoutes from './routes/fests.js';
import reviewRoutes from './routes/reviews.js'
import userRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, 'public')));

const store = new MongoStore({
    mongoUrl: dbUrl,
    secret: "thisshouldbeabettersecret!",
    touchAfter: 24 * 3600
});
store.on('error', function (e) {
    console.log("Session store error", e)
})



const sessionConfig = {
    store,
    name: 'session',
    secret: "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,  // For security
        // secure: true, // Work with HTTPS not localhost
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// Method of authentication (local = mail + password)
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(User.authenticate()))

passport.use('admin-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.isAdmin) {
            return done(null, false, { message: 'Not an admin.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}
));

// Tell how to store and unstore a user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use('/fests', festsRoutes);
app.use('/fests/:id/reviews', reviewRoutes);
app.use('/', userRoutes)
app.use('/admin', adminRoutes)


app.get('/', (req, res) => {
    res.render('home')
})

// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
// })

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Something went wrong';
//     res.status(statusCode).render("error", { err });
// })




app.listen(3001, () => {
    console.log("Listening on port 3001")
})