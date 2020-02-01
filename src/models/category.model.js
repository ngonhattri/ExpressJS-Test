import mongoose from "mongoose";

let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
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

CategorySchema.statics = {
    list() {
        return this.find({}).exec();
    },
    add(item) {
        return this.create(item);
    },
    detail(id) {
        return this.findById(id).exec();
    },
    update(id, data) {
        return this.findOneAndUpdate({ _id: id }, data).exec();
    },
    remove(id) {
        return this.findOneAndRemove({ _id: id }).exec();
    }
};

module.exports = mongoose.model('category', CategorySchema);