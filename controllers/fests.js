import Fest from '../models/fest.js';

export const index = async (req, res) => {
    const fests = await Fest.find({});
    const favoriteFests = await Fest.find({ favorite: true })

    res.render('fests/index', { fests, favoriteFests });
}

export const showFest = async (req, res) => {
    const { id } = req.params;
    const fest = await Fest.findById(id).populate({
        path: "reviews",
        options: { sort: { createDate: -1 } },
        populate: {
            path: 'author'
        }
    });
    if (!fest) {
        // req.flash("error", "Cannot find that festival")
        return res.redirect('/fests')
    }
    res.render("fests/show", { fest });
}