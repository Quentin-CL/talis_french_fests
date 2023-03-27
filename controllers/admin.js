import Fest from '../models/fest.js';
import User from '../models/user.js';
import Review from '../models/review.js';


export const renderDashboardFests = async (req, res) => {
    const fests = await Fest.find({});
    res.render('admin/dashboard_fests', { fests, boostrap: true });
}

export const renderDashboardUsers = async (req, res) => {
    const users = await User.aggregate([
        { $lookup: { from: 'reviews', localField: '_id', foreignField: 'author', as: 'reviews' } },
        { $project: { username: 1, email: 1, count: { $size: '$reviews' }, _id: 0 } }]);

    res.render('admin/dashboard_users', { users, boostrap: true });
}

export const renderDashboardReviews = async (req, res) => {
    const reviews = await Review.aggregate([
        { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'user' } },
        { $lookup: { from: 'fests', localField: '_id', foreignField: 'reviews', as: 'fest' } },
        { $unwind: '$user' },
        { $unwind: '$fest' },
        { $project: { _id: 0, body: 1, rating: 1, createDate: 1, 'user.username': 1, 'user._id': 1, 'fest.title': 1, 'fest._id': 1 } }]);
    // lookup permet de joindre les tables, unwind deplit la table que l'on a join et project permet de choisir les données à afficher
    res.send(reviews)
    // res.render('admin/dashboard_reviews', { reviews, boostrap: true });
}