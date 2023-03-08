import express from 'express';
const router = express.Router();
import * as fests from '../controllers/fests.js';
// import catchAsync from "../utils/catchAsync.js";
// import * as campgrounds from '../controllers/campgrounds.js';
// import { isLoggedIn, isAuthor, validateCampground } from '../middleware.js';
// import multer from 'multer';
// import { storage } from "../cloudinary/index.js";
// const upload = multer({ storage });
router.route('/')
    .get(fests.index);

router.route('/:id')
    .get(fests.showFest);
// .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
// .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

export default router;