import mongoose from "mongoose";

let Schema = mongoose.Schema;

let CompleteSchema = new Schema({
    test: {
        type: Schema.Types.ObjectId, ref: 'test'
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    point: {
        type: Number,
    },
    date_completed: {
        type: Date,
        default: Date.now
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

CompleteSchema.statics = {
    add(item) {
        return this.create(item);
    },
};

module.exports = mongoose.model('complete', CompleteSchema);