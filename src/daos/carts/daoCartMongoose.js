import { cartModel } from "../../models/carts.model.js";

class daoCartMongoose {

    async newCart() {
        try {
            await cartModel.create({})
        } 
        catch {
            throw new Error("Can't creat a new cart, please try again later")
        }
    }

    async getCart(id) {
        try {
            let cart = await cartModel.findOne({ _id: id })
            return cart
        }

        catch (err) {
            console.log(err)
        }
    }

    async updateCart(cartId, cart) {
        try {
            await cartModel.updateOne({ _id: cartId }, cart)
        }
        catch (err) {
            console.log(err)
        }
    }
}

export default daoCartMongoose;