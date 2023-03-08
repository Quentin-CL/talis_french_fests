import Fest from '../models/fest.js';

export const index = async (req, res) => {
    const fests = await Fest.find({});

    res.render('fests/index', { fests });
}

export const showFest = async (req, res) => {
    const { id } = req.params;
    const fest = await Fest.findById(id);
    if (!fest) {
        // req.flash("error", "Cannot find that festival")
        return res.redirect('/fests')
    }
    res.render("fests/show", { fest });
}