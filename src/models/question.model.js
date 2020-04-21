import mongoose from "mongoose";

let Schema = mongoose.Schema;

let QuestionSchema = new Schema({
    name: {type: String},
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'answer'
        }
    ],
    testId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'test'
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

QuestionSchema.statics = {
    add(item) {
        return this.create(item);
    },
    paginate(resPerPage, customFind, selectField = null, page) {
        let query = this.find(customFind);
        if (selectField) query.select(selectField);
        return query
            .sort({ _id: -1 })
            .populate('testId', { name: 'name' })
            .skip((resPerPage * page) - resPerPage)
            .limit(resPerPage)
    },
    count(query = {}) {
        return this.countDocuments(query);
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
        return !!mongoose.Types.ObjectId.isValid(id);
    }
};

module.exports = mongoose.model('question', QuestionSchema);