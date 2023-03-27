import express from 'express';
const router = express.Router({ mergeParams: true });
import catchAsync from "../utils/catchAsync.js";

import * as users from '../controllers/users.js';
import { checkReturnTo } from '../middleware.js'


router.route('/register')
    .post(catchAsync(users.register));


router.route('/login')
    .get(users.renderLogin)
    .post(checkReturnTo, users.authenticate, users.login);

router.get('/logout', users.logout)



export default router;