import mongoose from "mongoose";

let Schema = mongoose.Schema;

let BlogSchema = new Schema({
    name: {
        type: String,
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    },
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
    },
    getListPaginate(resPerPage, page) {
        return this.find({})
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
    },
    getCountPaginate() {
        return this.countDocuments();
    },
    findUserById(id) {
        return this.findById(id).exec();
    },
    updateItem(id, data) {
        return this.findOneAndUpdate({ id }, data).exec();
    }
};

module.exports = mongoose.model('blog', BlogSchema);