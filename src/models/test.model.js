import mongoose from "mongoose";

let Schema = mongoose.Schema;

let TestSchema = new Schema({
    name: {
        type: String
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'question'
        }
    ],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'category'
    },
    difficuly: {
        type: Number,
        default: 1
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
        return this.find({}).populate('categoryId', { name: 'name' });
    },
    count(query = {}) {
        return this.countDocuments(query);
    },
    detail(id) {
        return this.findOne({ _id: id }).populate('categoryId', { name: 'name' }).exec();
    },
    update(id, data) {
        return this.findOneAndUpdate({ _id: id }, data).exec();
    },
    remove(id) {
        return this.findOneAndRemove({ _id: id }).exec();
    },
    push(id, data) {
        return this.findOneAndUpdate({ _id: id }, { $push: { questions: data } }).exec();
    },
    pull(id, data) {
        return this.findOneAndUpdate({ _id: id }, { $pull: { questions: data } }).exec();
    }
};

module.exports = mongoose.model('test', TestSchema);