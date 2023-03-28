import mongoose from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";
import Review from './review.js';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.post('findOneAndDelete', async (user) => {
    if (user) {
        await Review.deleteMany({
            author: user._id
        })
    }
})
export default mongoose.model("User", UserSchema);