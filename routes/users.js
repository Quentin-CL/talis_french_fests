import express from 'express';
const router = express.Router({ mergeParams: true });
// import catchAsync from "../utils/catchAsync.js";
import passport from 'passport';
import * as users from '../controllers/users.js';
// import { checkReturnTo } from '../middleware.js'


router.route('/register')
    .get(users.renderRegister)
    .post(users.register);


// router.route('/login')
//     .get(users.renderLogin)
//     .post(checkReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

// router.get('/logout', users.logout)



export default router;