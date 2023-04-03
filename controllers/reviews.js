import Review from '../models/review.js';
import Fest from '../models/fest.js'

export const createReview = async (req, res) => {
    const fest = await Fest.findById(req.params.id);
    const review = new Review(req.body.review);
    review.isModerated = false;
    review.author = req.user._id;
    review.createDate = Date.now();
    fest.reviews.push(review);
    await review.save();
    await fest.save();
    res.redirect(`/fests/${fest._id}`)
}

export const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const newCommentBody = req.body.body;
    Review.findByIdAndUpdate(reviewId, { body: newCommentBody, updateDate: Date.now() }, { new: true })
        .then(updatedComment => {
            if (!updatedComment) {
                // si le commentaire n'existe pas, retourner une erreur 404
                return res.status(404).send('Commentaire non trouvé');
            }
            // retourner le nouveau commentaire mis à jour en réponse
            res.status(200).json(updatedComment);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Erreur serveur');
        });
};

export const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    Review.findByIdAndDelete(reviewId)
        .then(deletedComment => {
            if (!deletedComment) {
                // si le commentaire n'existe pas, retourner une erreur 404
                return res.status(404).send('Commentaire non trouvé');
            }
            // retourner le nouveau commentaire mis à jour en réponse
            res.status(200).json({});
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Erreur serveur');
        });
};