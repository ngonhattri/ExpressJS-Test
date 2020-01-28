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

module.exports = mongoose.model('blog', BlogSchema);