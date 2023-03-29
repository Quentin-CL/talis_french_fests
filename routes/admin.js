import express from 'express';
const router = express.Router();
import * as admin from '../controllers/admin.js';
import passport from 'passport';
import { isAdmin } from '../middleware.js'
import catchAsync from "../utils/catchAsync.js";



router.route('/fests')
    .get(isAdmin, catchAsync(admin.renderDashboardFests));

router.route('/users')
    .get(isAdmin, catchAsync(admin.renderDashboardUsers));

router.route('/reviews')
    .get(isAdmin, catchAsync(admin.renderDashboardReviews));

router.patch('/reviews/:id', isAdmin, catchAsync(admin.moderateReview))
export default router;