import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: String,
                    ref: "products"
                },
                quantity: Number
            }
        ],
        default: []
    }
})

cartsSchema.pre('find', function () {
    this.populate(['products']);
});

cartsSchema.pre('findOne', function () {
    this.populate(['products']);
});


export const cartModel = mongoose.model(cartsCollection, cartsSchema);
