import mongoose from "mongoose";

let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'test'
        }
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

CategorySchema.statics = {
    add(item) {
        return this.create(item);
    },
    list() {
        return this.find({}).populate('tests');
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
    },
    pushTest(id, testId) {
        return this.findOneAndUpdate({ _id: id }, { $push: { tests: testId } }).exec();
    },
    pullTest(id, testId) {
        return this.findOneAndUpdate({ _id: id }, { $pull: { tests: testId } }).exec();
    }
};

module.exports = mongoose.model('category', CategorySchema);