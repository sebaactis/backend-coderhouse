import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = mongoose.Schema({
    products:{
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


export const cartModel = mongoose.model(cartsCollection, cartsSchema);
