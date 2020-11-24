import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true,
        unique:true

    },
    password: {
        type: String,
        require:true
    },
}, {
    timestamps: true
});

const User = Mongoose.model('User', UserSchema);

export default User