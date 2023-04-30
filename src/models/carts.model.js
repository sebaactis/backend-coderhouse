import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = mongoose.Schema({
    products:{
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],
        default: []
    }
})

cartsSchema.pre('findOne', function() {
    this.populate('products.product')
})

export const cartModel = mongoose.model(cartsCollection, cartsSchema);
