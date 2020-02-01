import mongoose from "mongoose";

let Schema = mongoose.Schema;

let BlogSchema = new Schema({
    name: {
        type: String,
    },
    content: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'category'
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
    add(item) {
        return this.create(item);
    },
    paginate(resPerPage, options = {}) {
        let query;
        let status = options.status || null;
        let select = options.select || null;
        let category = options.category || null;
        let page = Number(options.page) || 1;
        let customFind = {};
        if (status) customFind.status = true;
        if (category) customFind.categoryId = category;
        query = this.find(customFind);
        if (select) query.select(select);
        query.sort({ _id: -1 })
        query.populate('categoryId', { name: 'name' })
        return query
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
    },
    count(options = {}) {
        let status = options.status ? options.status : null;
        if (status) return this.countDocuments({ status: true });
        return this.countDocuments();
    },
    detail(id, options = {}) {
        let status = options.status ? options.status : null;
        const check = this.checkObject(id);
        if (!check) return null;
        if (status) return this.findOne({ _id: id, status: true }).exec();
        return this.findOne({ _id: id }).exec();
    },
    update(id, data) {
        return this.findOneAndUpdate({ _id: id }, data).exec();
    },
    remove(id) {
        return this.findOneAndRemove({ _id: id }).exec();
    },
    status(id, status) {
        return this.findOneAndUpdate({ _id: id }, { "$set": { "status": !status } }).exec();
    },
    checkObject(id) {
        return mongoose.Types.ObjectId.isValid(id);
    }
};

module.exports = mongoose.model('blog', BlogSchema);