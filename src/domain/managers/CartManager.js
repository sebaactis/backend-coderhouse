import daoCartMongoose from '../../data/daos/carts/daoCartMongoose.js'
import daoProductMongoose from '../../data/daos/products/daoProductMongoose.js';

class CartManager {

    constructor() {
        this.daoCart = new daoCartMongoose();
        this.daoProduct = new daoProductMongoose();
    }

    async newCart() {

        const cart = await this.daoCart.newCart();
        return cart;

    }

    async getCartProducts(id) {
        const cart = this.daoCart.getCartPopulate(id);
        return cart;
    }

    async addProductCart(cartId, prodId) {

        let prodExis = await this.daoProduct.getProductById(prodId)

        if (!prodExis) {
            return 'Product Not Found'
        }

        let cart = await this.daoCart.getCart(cartId)

        if (!cart) {
            return "Cart Not Found";
        }

        let products = cart.products

        products.push({ product: prodId, quantity: 1 })
        return await this.daoCart.updateCart(cartId, cart)

    }

    async updateCart(cartId, newCart) {

        let cart = await this.daoCart.getCart(cartId)

        if (!cart) {
            throw new Error('Cart Not Found')
        }

        cart.products = newCart

        return await this.daoCart.updateCart(cartId, cart)
    }

    async updateOneProductCart(cartId, prodId, newQuantity) {
        let cart = await this.daoCart.getCart(cartId)

        if (!cart) {
            throw new Error('Cart Not Found')
        }

        let products = cart.products
        let prod = products.find(prod => prod.product === prodId)

        if (!prod) {
            throw new Error('Product Not Found On The Cart')
        }
        prod.quantity = newQuantity.quantity

        return await this.daoCart.updateCart(cartId, cart)
    }

    async removeFromCart(cartId, prodId) {
        let cart = await this.daoCart.getCart(cartId)

        if (!cart) {
            throw new Error('Cart Not Found')
        }

        cart.products = await cart.products.filter(prod => prod.product !== prodId)
        await this.daoCart.updateCart(cartId, cart)

    }

    async removeAllCart(cartId) {

        let cart = await this.daoCart.getCart(cartId)

        if (!cart) {
            throw new Error('Cart Not Found')
        }

        cart.products = [];

        await this.daoCart.updateCart(cartId, cart)
    }
}

export default CartManager; 