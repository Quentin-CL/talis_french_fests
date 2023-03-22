import express from 'express';
const router = express.Router();
import * as admin from '../controllers/admin.js';
import passport from 'passport';
import { isAdmin } from '../middleware.js'


router.route('/dashboard')
    .get(isAdmin, admin.renderDashboard)

export default router;