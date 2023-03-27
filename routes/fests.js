import express from 'express';
const router = express.Router();
import * as fests from '../controllers/fests.js';
import catchAsync from "../utils/catchAsync.js";
// import * as campgrounds from '../controllers/campgrounds.js';
import { isLoggedIn, isAdmin } from '../middleware.js';
import multer from 'multer';
import { storage } from "../cloudinary/index.js";
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(fests.index))
    .post(isAdmin, upload.array('image'), catchAsync(fests.newFest))

router.route('/new')
    .get(fests.renderNewFest);

router.route('/:id')
    .get(catchAsync(fests.showFest))
    .put(isAdmin, upload.array('image'), catchAsync(fests.updateFest))
    .delete(isAdmin, catchAsync(fests.deleteFest));

router.route('/:id/edit')
    .get(catchAsync(fests.renderEditFest));
export default router;