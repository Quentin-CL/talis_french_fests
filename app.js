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
import ExpressError from "./utils/ExpressError.js";
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';

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
import generalRoutes from './routes/general.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, 'public')));

app.use(mongoSanitize());
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    referrerPolicy: {
        policy: ['same-origin']
    }
}));

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = ["data:"];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [""],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dnofzucxg/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

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
app.use('/', generalRoutes)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page non trouvée', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Quelque chose s\' est mal passé !';
    res.status(statusCode).render("error", { err });
})




app.listen(3000, () => {
    console.log("Listening on port 3000")
})