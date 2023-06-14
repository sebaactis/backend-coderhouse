import Cart from "../../../domain/entities/cart.js";
import { cartModel } from "../../models/carts.model.js";

class repositoryCartMongoose {

    async newCart() {
        const document = await cartModel.create({})

        return new Cart({
            id: document._id,
            products: document.products
        })
    }

    async getCartPopulate(id) {

        const document = await cartModel.findOne({ _id: id })

        if (!document) {
            throw new Error('Cart Not Found')
        }
        return new Cart({
            id: document._id,
            products: document.products
        })

    }

    async getCart(id) {
        const document = await cartModel.findOne({ _id: id })

        if (!document) {
            throw new Error('Cart Not Found')
        }

        return new Cart({
            id: document._id,
            products: document.products
        })
    }

    async updateCart(cartId, cart) {
        const document = await cartModel.updateOne({ _id: cartId }, cart)

        if (!document) {
            throw new Error('Cart Not Found')
        }

        return new Cart({
            id: document._id,
            products: document.products
        })
    }
}

export default repositoryCartMongoose;