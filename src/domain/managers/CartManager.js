import container from "../../container.js";
import TicketsManager from "../managers/TicketsManager.js"
import ProductManager from "../managers/ProductManager.js";

class CartManager {


    constructor() {
        this.daoCart = container.resolve('repositoryCart');
        this.daoProduct = container.resolve('repositoryProduct');
    }

    async newCart(email) {

        const cart = await this.daoCart.newCart(email);
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
        let prodInCart = products.find(prod => prodId == prod.product)

        if (prodInCart) {
            prodInCart.quantity++
            prodInCart.totalPrice = prodInCart.quantity * prodExis.price
        } else {
            const product = {
                product: prodId,
                quantity: 1,
                totalPrice: prodExis.price
            }
            products.push(product)
        }

        return await this.daoCart.updateCart(cartId, cart)
    }

    async updateCart(cartId, newCart) {

        let prodExis = await this.daoProduct.getProductById(prodId)

        if (!prodExis) {
            return 'Product Not Found'
        }

        let cart = await this.daoCart.getCart(cartId)

        if (!cart) {
            throw new Error('Cart Not Found')
        }

        cart.products = newCart

        return await this.daoCart.updateCart(cartId, cart)
    }

    async updateOneProductCart(cartId, prodId, newQuantity) {
        let prodExis = await this.daoProduct.getProductById(prodId)

        if (!prodExis) {
            return 'Product Not Found'
        }

        console.log(prodExis);

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
        prod.totalPrice = prod.quantity * prodExis.price

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

    async purchase(cartId) {

        const ticketManager = new TicketsManager();
        const productManager = new ProductManager();

        let getProducts = await this.daoProduct.getProducts()
        getProducts = getProducts.docs

        const checkStock = (prodId) => {

            getProducts = getProducts.map((product) => {
                let { id, stock } = product
                return { id, stock }
            })

            let productStock = getProducts.find(prod => prod.id === prodId)
            return productStock ? productStock.stock : 0;
        }


        let cart = await this.daoCart.getCart(cartId)
        let { products, email } = cart;

        let validProducts = await products.filter(prod => prod.quantity <= checkStock(prod.product))
        products = await products.filter(prod => prod.quantity > checkStock(prod.product))

        cart = {
            ...cart,
            products
        }

        const ticket = await ticketManager.create(validProducts, email)
        const newCart = await this.daoCart.updateCart(cartId, cart)

        const changeStock = () => {
            validProducts.forEach(async (cartProd) => {

                let getProducts = await this.daoProduct.getProducts()
                getProducts = getProducts.docs

                const product = getProducts.find(prod => prod.id === cartProd.product)

                if (product) {
                    product.stock = product.stock - cartProd.quantity
                    productManager.updateProd(product.id, product)
                }
            })
        }
        changeStock();

        return { ticket, newCart }
    }

}

export default CartManager; 