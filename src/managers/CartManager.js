/* import fs from 'fs'; */
import daoCartMongoose from '../daos/carts/daoCartMongoose.js'
import daoProductMongoose from '../daos/products/daoProductMongoose.js';

class CartManager {

    constructor() {
        this.daoCart = new daoCartMongoose();
        this.daoProduct = new daoProductMongoose();
    }

    async newCart() {

        try {
            await this.daoCart.newCart();
        }

        catch {
            throw new Error('Error trying to create Cart');
        }
    }

    async getCartProducts(id) {

        try {
            return  this.daoCart.getCart(id);
        }

        catch {
            return 'Error trying to get Cart'
        }
    }

    async addProductCart(cartId, prodId) {

        let prodExis = await this.daoProduct.getProductById(prodId)

        if(!prodExis) {
            return 'Product doesnt exists'
        }

        let cart = await this.daoCart.getCart(cartId)
        let products = cart.products

        let productInCart = products.find(prod => prod.product === prodId)


        if (productInCart) {
            products = [...products, productInCart.quantity += 1 ]
            return await this.daoCart.updateCart(cartId, cart)
        } else {
            products.push({product: prodId, quantity: 1})
            return await this.daoCart.updateCart(cartId, cart)
        }
    }
}

export default CartManager;