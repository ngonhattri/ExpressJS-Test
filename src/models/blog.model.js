import mongoose from "mongoose";

let Schema = mongoose.Schema;

let BlogSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    blogCategoryId: String,
    createdAt: {
        type: Number,
        default: Date.now
    },
    updatedAt: {
        type: Number,
        default: null
    }
});

BlogSchema.statics = {
    createNew(item) {
        return this.create(item);
    }
};

module.exports = mongoose.model('blog', BlogSchema);