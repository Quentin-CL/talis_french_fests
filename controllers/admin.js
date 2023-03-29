import Fest from '../models/fest.js';
import User from '../models/user.js';
import Review from '../models/review.js';
import { getFullDate, getTodayAndLastWeekReviewsCount } from '../utils/utils.js';

export const renderDashboardFests = async (req, res) => {
    const fests = await Fest.find({});
    res.render('admin/dashboard_fests', { fests, boostrap: true });
}

export const renderDashboardUsers = async (req, res) => {
    const users = await User.aggregate([
        { $lookup: { from: 'reviews', localField: '_id', foreignField: 'author', as: 'reviews' } },
        {
            $project: {
                username: 1,
                email: 1,
                _id: 1,
                count: { $size: '$reviews' },
                moderatedCount: {
                    $size: {
                        $filter: {
                            input: '$reviews',
                            as: 'review',
                            cond: { $eq: ['$$review.isModerated', true] }
                        }
                    }
                }
            }
        }]);

    res.render('admin/dashboard_users', { users, boostrap: true });
}

export const renderDashboardReviews = async (req, res) => {
    const reviews = await Review.aggregate([
        { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'user' } },
        { $lookup: { from: 'fests', localField: '_id', foreignField: 'reviews', as: 'fest' } },
        { $unwind: '$user' },
        { $unwind: '$fest' },
        { $sort: { 'fest.title': 1, createDate: -1 } },
        { $project: { _id: 1, body: 1, rating: 1, createDate: 1, isModerated: 1, 'user.username': 1, 'user._id': 1, 'fest.title': 1, 'fest._id': 1 } }]);
    // lookup permet de joindre les tables, unwind deplit la table que l'on a join et project permet de choisir les données à afficher
    const countByFest = getTodayAndLastWeekReviewsCount(reviews)
    const sortedReviews = Object.keys(countByFest).sort((a, b) => {
        const countDiff = countByFest[b]['today'] - countByFest[a]['today']
        if (countDiff !== 0) {
            return countDiff
        } else {
            return countByFest[b]['week'] - countByFest[a]['week']
        }
    }).map(festId => {
        return reviews.filter(review => review.fest._id.equals(festId)).concat(countByFest[festId]);
    });
    // res.send(sortedFests);
    res.render('admin/dashboard_reviews', { sortedReviews, boostrap: true, getFullDate });
}

export const moderateReview = async (req, res) => {
    const { id } = req.params;
    await Review.findByIdAndUpdate(id, { isModerated: true })
    res.redirect(`/admin/reviews`);
}