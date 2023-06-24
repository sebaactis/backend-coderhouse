import Cart from "../../../domain/entities/cart.js";
import { cartModel } from "../../models/carts.model.js";

class repositoryCartMongoose {

    async newCart(email) {
        const document = await cartModel.create({ email })

        return new Cart({
            id: document._id,
            products: document.products,
            email: email
        })
    }

    async getCartPopulate(id) {

        const document = await cartModel.findOne({ _id: id }).populate('products')

        if (!document) {
            throw new Error('Cart Not Found')
        }
        return new Cart({
            id: document._id,
            products: document.products,
            email: document.email
        })

    }

    async getCart(id) {
        const document = await cartModel.findOne({ _id: id })

        if (!document) {
            throw new Error('Cart Not Found')
        }

        return new Cart({
            id: document._id,
            products: document.products,
            email: document.email
        })
    }

    async updateCart(cartId, cart) {
        const document = await cartModel.updateOne({ _id: cartId }, cart)

        if (!document) {
            throw new Error('Cart Not Found')
        }

        return new Cart({
            id: document._id,
            products: document.products,
            email: document.email
        })
    }
}

export default repositoryCartMongoose;