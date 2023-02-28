import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ejsMate from 'ejs-mate';
import methodOverride from 'method-override';
import session from 'express-session';
import flash from "connect-flash";

// import campgroundRoutes from './routes/campgrounds.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, 'public')));




app.use(flash());



// app.use('/campgrounds', campgroundRoutes);
// app.use('/campgrounds/:id/reviews', reviewRoutes);
// app.use('/', userRoutes)

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