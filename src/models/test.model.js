import mongoose from "mongoose";

let Schema = mongoose.Schema;

let TestSchema = new Schema({
    name: {
        type: String
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    }],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    difficulty: {
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
        return this.find({}).populate('categoryId', {
            name: 'name'
        });
    },
    count(query = {}) {
        return this.countDocuments(query);
    },
    detail(id) {
        return this.findOne({
            _id: id
        })
            .populate('categoryId', {
                name: 'name'
            })
            .populate('questions')
            .exec();
    },
    update(id, data) {
        return this.findOneAndUpdate({
            _id: id
        }, data).exec();
    },
    remove(id) {
        return this.findOneAndRemove({
            _id: id
        }).exec();
    },
    pushItem(id, data) {
        return this.findOneAndUpdate({
            _id: id
        }, {
            $push: {
                questions: data
            }
        }).exec();
    },
    removeAllQuestionInItem(id) {
        return this.findOneAndUpdate({
            _id: id
        }, { $set: { questions: [] } }).exec();
    }
}
module.exports = mongoose.model('test', TestSchema);