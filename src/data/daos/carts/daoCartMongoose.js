import { cartModel } from "../../models/carts.model.js";

class daoCartMongoose {

    async newCart() {
        const cart = await cartModel.create({})
        return cart;
    }

    async getCartPopulate(id) {

        const cart = await cartModel.findOne({ _id: id }).populate('products.product')

        if(!cart) {
            throw new Error('Cart Not Found')
        }
        return cart

    }

    async getCart(id) {
        const cart = await cartModel.findOne({ _id: id })

        if(!cart) {
            throw new Error('Cart Not Found')
        }
        
        return cart
    }

    async updateCart(cartId, cart) {
            const newCart = await cartModel.updateOne({ _id: cartId }, cart)
            return newCart
    }
}

export default daoCartMongoose;