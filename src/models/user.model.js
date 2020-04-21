import mongoose from "mongoose";
import bcrypt from "bcryptjs";
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        trim: true
    },
    password: String,
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/kori/image/upload/v1545012923/no_avatar.png'
    },
    done_test:[
        {
            test: {
                type: Schema.Types.ObjectId, ref: 'test'
            },
            point: {
                type: Number,
            },
            date_completed: {
                type: Date,
            },
        },
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

UserSchema.statics = {
    checkIfUserExsits() {
        return this.countDocuments().exec();
    },
    createNew(item) {
        return this.create(item);
    },
    findByEmail(email) {
        return this.findOne({ "email": email }).exec();
    },
    findUserById(id) {
        return this.findById(id).exec();
    },
    updatePassword(id, hashedPassword) {
        return this.findOneAndUpdate({ _id: id }, { "password": hashedPassword }).exec();
    }
};

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

module.exports = mongoose.model('users', UserSchema);