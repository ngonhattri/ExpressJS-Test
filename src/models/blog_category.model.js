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

module.exports = mongoose.model('blog-category', BlogCategorySchema);