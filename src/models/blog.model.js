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
    getListApiPaginate(resPerPage, page) {
        return this.find({ status: true })
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
    },
    getCountApiPaginate() {
        return this.countDocuments({
            status: true
        });
    },
    getDetailApiDetail(id) {
        const check = mongoose.Types.ObjectId.isValid(id);
        if (!check) return null;
        return this.findOne({ _id: id, status: true }).exec();
    },
    findBlogById(id) {
        const check = mongoose.Types.ObjectId.isValid(id);
        if (!check) return null;
        return this.findById(id).exec();
    },
    updateItem(id, data) {
        return this.findOneAndUpdate({ _id: id }, data).exec();
    },
    removeItem(id) {
        return this.findOneAndRemove({ _id: id }).exec();
    },
    changeStatus(id, statusBlog) {
        return this.findOneAndUpdate({ _id: id }, { "$set": { "status": !statusBlog } }).exec();
    }
};

module.exports = mongoose.model('blog', BlogSchema);