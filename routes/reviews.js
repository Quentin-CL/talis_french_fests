import express from 'express';
// Option mergeParams permet d'avoir accés aux paramètres dans req.params du debut du path (simplifié (id))
const router = express.Router({ mergeParams: true });
import catchAsync from "../utils/catchAsync.js";
import * as reviews from "../controllers/reviews.js";
import { isLoggedIn, isReviewAuthor, isReviewLoggedIn, validateReview, validateReviewUpdate } from '../middleware.js';



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router
    .put('/:reviewId', isReviewLoggedIn, isReviewAuthor, validateReviewUpdate, reviews.updateReview)
    .delete('/:reviewId', isReviewLoggedIn, isReviewAuthor, reviews.deleteReview)

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

export default router;