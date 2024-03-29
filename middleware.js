import { festSchema, reviewSchema, reviewSchemaUpdate } from "./schemas.js";
import ExpressError from "./utils/ExpressError.js";
import Review from './models/review.js';

export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Tu dois être connecté!');
        return res.redirect('/login');
    }
    next()
}


export const validateFest = (req, res, next) => {
    req.body.fest.category = req.body.fest.category.split(',');
    const { error } = festSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

// middleware d'autorisation pour vérifier si l'utilisateur est un administrateur
export function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    req.flash('error', 'Vous n\'êtes pas autorisé à accéder à cette page');
    return res.redirect('/login');
}


export const checkReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo
    }
    next()
}

// export const isAuthor = async (req, res, next) => {
//     const { id } = req.params;
//     const campground = await Campground.findById(id);
//     if (!campground.author.equals(req.user._id)) {
//         req.flash('error', "Vous n\'êtes pas autorisé à le faire");
//         return res.redirect(`/ fests / ${ campground._id } `)
//     }
//     next();
// }

export const isReviewLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send("Tu doit être connecté !")
    }
    next()
}

export const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        return res.status(401).send("Vous n\'êtes pas autorisé à le faire")
    }
    next();
}

export const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

export const validateReviewUpdate = (req, res, next) => {
    const { error } = reviewSchemaUpdate.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}