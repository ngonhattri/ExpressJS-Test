let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        trim: true
    },
    password: String,
    verifyToken: String,
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/kori/image/upload/v1545012923/no_avatar.png'
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

module.exports = mongoose.model('users', UserSchema);