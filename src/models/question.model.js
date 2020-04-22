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
    removeByTestId(testId) {
        return this.deleteMany({ testId: testId }).exec();
    }
};

module.exports = mongoose.model('question', QuestionSchema);