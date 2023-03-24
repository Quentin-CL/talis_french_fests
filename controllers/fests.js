import Fest from '../models/fest.js';
import { cloudinary } from '../cloudinary/index.js';

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
        req.flash("error", "Festival introuvable");
        return res.redirect('/fests');
    }
    res.render("fests/show", { fest });
}

export const editFest = async (req, res) => {
    const { id } = req.params;
    const fest = await Fest.findById(id);
    if (!fest) {
        req.flash("error", "Festival introuvable");
        return res.redirect('/admin/dashboard');
    }
    res.render("fests/update", { fest, boostrap: true });
}


export const updateFest = async (req, res) => {
    const { id } = req.params;
    req.body.fest.favorite = req.body.fest.favorite ? true : false;
    req.body.fest.category = req.body.fest.category.split(',');
    req.body.fest.image = req.body.deletedImage;
    const fest = await Fest.findByIdAndUpdate(id, req.body.fest);
    if (req.files.length != 0) {
        const img = req.files.map(f => (f.path));
        fest.image = img[0];
        await fest.save();
        const url = req.body.deletedImage.split(/[\/\.]/);
        const filename = url[url.length - 3] + '/' + url[url.length - 2];
        await cloudinary.uploader.destroy(filename);
    }
    req.flash("success", 'Festivals modifié avec succés!');
    res.redirect(`/admin/dashboard`);
}