import User from "../models/user.js";
import passport from 'passport';

export const register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Bienvenue chez French Fests!');
            res.redirect('/fests')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/fests')
    }
}

export const renderLogin = (req, res) => {
    if (req.query.returnTo) {
        req.session.returnTo = req.query.returnTo;
    }
    res.render('users/login');
}

export const authenticate = (req, res, next) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const relativeUrl = req.headers.referer.substring(`${protocol}://${host}`.length);
    const failureUrl = relativeUrl.slice(0, 6) === '/login' ? relativeUrl : `/login?returnTo=${relativeUrl}`;
    const callback = passport.authenticate('local', { failureFlash: true, failureRedirect: failureUrl });
    return callback(req, res, next)
}

export const login = (req, res) => {
    req.flash("success", "Bienvenue chez French Fests!");
    // bug to fix
    const redirectUrl = res.locals.returnTo || 'back';
    res.redirect(redirectUrl);
}

export const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Aurevoir!');
        res.redirect('/fests')
    });
}

export const deleteUsers = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    req.flash('success', 'Utilisateur supprimé avec succés');
    res.redirect('/admin/users');
}