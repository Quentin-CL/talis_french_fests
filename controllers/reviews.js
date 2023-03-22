import Review from '../models/review.js';
import Fest from '../models/fest.js'

export const createReview = async (req, res) => {
    const fest = await Fest.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    review.createDate = Date.now();
    fest.reviews.push(review);
    await review.save();
    await fest.save();
    res.redirect(`/fests/${fest._id}`)
}
