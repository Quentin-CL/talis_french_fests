import express from 'express';
const router = express.Router();
import * as fests from '../controllers/fests.js';
// import catchAsync from "../utils/catchAsync.js";
// import * as campgrounds from '../controllers/campgrounds.js';
import { isLoggedIn, isAdmin } from '../middleware.js';
import multer from 'multer';
import { storage } from "../cloudinary/index.js";
const upload = multer({ storage });

router.route('/')
    .get(fests.index);

router.route('/:id')
    .get(fests.showFest)
    .put(isAdmin, upload.array('image'), fests.updateFest);
// .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.route('/:id/edit')
    .get(fests.editFest);
export default router;