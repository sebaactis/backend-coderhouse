import mongoose, { Schema } from "mongoose";

const usersCollection = 'users';

const userSchema = new Schema({
    firstName: { type: Schema.Types.String, required: true},
    lastName: { type: Schema.Types.String },
    email: { type: Schema.Types.String, required: true, unique: true},
    age: { type: Schema.Types.Number },
    password: { type: Schema.Types.String }
})

export const userModel = mongoose.model(usersCollection, userSchema);
