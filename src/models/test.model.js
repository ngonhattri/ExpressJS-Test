import mongoose from "mongoose";

let Schema = mongoose.Schema;

let TestSchema = new Schema({
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'question'
        }
    ],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'category'
    },
    difficuly: {
        type: String
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

TestSchema.statics = {
    add(item) {
        return this.create(item);
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

module.exports = mongoose.model('test', TestSchema);