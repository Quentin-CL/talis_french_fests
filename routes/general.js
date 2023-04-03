import express from 'express';
const router = express.Router();
import * as gen from '../controllers/general.js';
import catchAsync from "../utils/catchAsync.js";


router.get('/', (req, res) => {
    res.render('home')
})
router.get('/contact', (req, res) => {
    res.render('contact', { header: "Contact" })
})
// router.post('/send-email', gen.sendEmail)

export default router