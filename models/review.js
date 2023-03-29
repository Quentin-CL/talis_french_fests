import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    createDate: Date,
    isModerated: {
        type: Boolean,
        default: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

reviewSchema.virtual('createDateFormatted').get(function () {
    const date = this.createDate.getDate();
    const month = this.createDate.getMonth() + 1;
    const hours = this.createDate.getHours();
    const minutes = this.createDate.getMinutes();
    const seconds = this.createDate.getSeconds();
    return `${date < 10 ? '0' + date : date}/${month < 10 ? '0' + month : month}/${this.createDate.getFullYear()}`
})



export default mongoose.model("Review", reviewSchema);  