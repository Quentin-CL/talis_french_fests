import express from 'express';
const router = express.Router({ mergeParams: true });
import catchAsync from "../utils/catchAsync.js";

import * as users from '../controllers/users.js';
import { isAdmin, checkReturnTo } from '../middleware.js'


router.route('/register')
    .post(catchAsync(users.register));


router.route('/login')
    .get(users.renderLogin)
    .post(checkReturnTo, users.authenticate, users.login);

router.get('/logout', users.logout)

router.route('/users/:id')
    .delete(isAdmin, users.deleteUsers)

router.route('/contact')
    .get()
export default router; 