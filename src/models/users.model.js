import mongoose, { Schema } from "mongoose";

const usersCollection = 'users';

const userSchema = new Schema({
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String },
    email: { type: Schema.Types.String, required: true, unique: true },
    age: { type: Schema.Types.Number },
    password: { type: Schema.Types.String },
    cart: { type: Schema.Types.ObjectId, ref: 'carts'},
    role: { type: Schema.Types.ObjectId, default: '64775b936c021a596c3ceafa', ref: 'roles' },
})

userSchema.pre('find', function () {
    this.populate(['role']);
});

userSchema.pre('findOne', function () {
    this.populate(['role']);
});

userSchema.pre('find', function () {
    this.populate(['cart']);
});

userSchema.pre('findOne', function () {
    this.populate(['cart']);
});

export const userModel = mongoose.model(usersCollection, userSchema);
