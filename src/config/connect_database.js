import mongoose from "mongoose";
import bluebird from "bluebird";

let connectDB = () => {
    mongoose.Promise = bluebird;
    mongoose
        .connect('mongodb+srv://tester123:tester123@cluster0-4hioi.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then(() => {
            console.log('Database is connected');
        })
        .catch(error => {
            console.log(error.message);
            process.exit(1);
        });
};

module.exports = connectDB;