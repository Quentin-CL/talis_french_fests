

export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Tu dois être connecté!');
        return res.redirect('/login');
    }
    next()
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