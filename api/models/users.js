import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

export default User