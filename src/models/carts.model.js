import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products: {type: Array, ref: 'products', default: []}
})

cartsSchema.pre('findOne', function() {
    this.populate('products.product')
})

export const cartModel = mongoose.model(cartsCollection, cartsSchema);
