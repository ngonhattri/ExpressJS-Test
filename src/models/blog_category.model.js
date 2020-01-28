import mongoose from "mongoose";

let Schema = mongoose.Schema;

let BlogCategorySchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    blogs: [
        { blogId: String }
    ],
    createdAt: {
        type: Number,
        default: Date.now
    },
    updatedAt: {
        type: Number,
        default: null
    }
});

BlogCategorySchema.statics = {
    createNew(item) {
        return this.create(item);
    }
};

module.exports = mongoose.model('blog-category', BlogCategorySchema);