import pkg from 'joi';
const { ref } = pkg;
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// import Review from './review.js';


// const ImageSchema = new Schema({
//     url: String,
//     filename: String
// });



// Par defaut, la conversion des données Mongoose en JSON n'inclut pas les virtuals => Option par defaut à changer
const opts = { toJSON: { virtuals: true } }
const FestSchema = new Schema({
    title: String,
    // images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    // geometry: String,
    category: [String],
    description: String,
    attendance: Number,
    image: String,
    mailing_adress: String,
    municipality: String,
    zip_code: Number,
    creation_year: Number,
    website: String,
    mail: String,
    period: String,
    favorite: Boolean,
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],

}, opts);

FestSchema.virtual('thumbnail').get(function () {
    return this.image.replace('/upload', '/upload/w_600')
})
FestSchema.virtual('carousel').get(function () {
    return this.image.replace('/upload', '/upload/c_crop,ar_1')
})
// CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
//     return `<strong><a href='/campgrounds/${this._id}'>${this.title}</a></strong>
//     <p>${this.description.substring(0, 20)}...</p>`
// })

// CampgroundSchema.post('findOneAndDelete', async (doc) => {
//     if (doc) {
//         await Review.deleteMany({
//             _id: {
//                 $in: doc.reviews
//             }
//         })
//     }
// })
export default mongoose.model('Fest', FestSchema)