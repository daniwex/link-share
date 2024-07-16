import {model, Schema, models} from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "can't be empty"],
    },
    password: {
        type: String,
        required: [true, "can't be empty"],
        // match: /[a-zA-Z]{6,}/
    }
})

const User = models.User || model("User", userSchema)

export default User
