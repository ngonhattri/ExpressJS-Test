import mongoose from "mongoose";

let Schema = mongoose.Schema;

let QuestionSchema = new Schema({
    question: {
        type: String
    },
    answer: {
        type: String
    },
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
        return this.insertMany(item);
    },
    list() {
        return this.find({});
    },
    count(query = {}) {
        return this.countDocuments(query);
    },
    detail(id) {
        return this.findOne({ _id: id }).exec();
    },
    update(id, data) {
        return this.findOneAndUpdate({ _id: id }, data).exec();
    },
    remove(id) {
        return this.findOneAndRemove({ _id: id }).exec();
    }
};

module.exports = mongoose.model('question', QuestionSchema);