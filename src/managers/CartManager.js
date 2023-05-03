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
            return  this.daoCart.getCartPopulate(id);
        }

        catch {
            return 'Error trying to get Cart'
        }
    }

    async addProductCart(cartId, prodId) {

        let prodExis = await this.daoProduct.getProductById(prodId)

        if(!prodExis) {
            return 'Product not found'
        }

        let cart = await this.daoCart.getCart(cartId)

        if(!cart) {
            return "Cart not found";
        }
        let products = cart.products

        products.push({product: prodId, quantity: 1})
        return await this.daoCart.updateCart(cartId, cart)
        
    }

    async updateCart(cartId, newCart) {

        let cart = await this.daoCart.getCart(cartId)

        cart.products = newCart
        
        await this.daoCart.updateCart(cartId, cart)
    }

    async updateOneProductCart (cartId, prodId, newQuantity) {
        let cart = await this.daoCart.getCart(cartId)
        let products = cart.products
        let prod = products.find(prod => prod.product === prodId)
        prod.quantity = newQuantity.quantity

        console.log(cart)

        await this.daoCart.updateCart(cartId, cart)
        
    }

    async removeFromCart(cartId, prodId) {
        let cart = await this.daoCart.getCart(cartId)
        cart.products = await cart.products.filter(prod => prod.product !== prodId)  

        await this.daoCart.updateCart(cartId, cart)
    
    }

    async removeAllCart(cartId) {

        let cart = await this.daoCart.getCart(cartId)

        cart.products = [];

        await this.daoCart.updateCart(cartId, cart)
    }
}

export default CartManager; 