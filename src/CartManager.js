import fs from 'fs';

class CartManager {

    idAuto = 1;

    constructor() {
        this.carts = [];
        this.path = './database/carts.json';
    }

    async newCart() {

        let carts = await fs.promises.readFile(this.path, 'utf-8')
        carts = JSON.parse(carts)
        this.carts = carts
        this.idAuto = this.carts.length + 1

        try {
            this.carts.push({
                id: this.idAuto,
                products: [],
            })

            this.idAuto++;

            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        }

        catch {
            throw new Error('Error trying to create Cart');
        }
    }

    async getCartProducts(id) {

        try {
            let cartFile = await fs.promises.readFile(this.path, 'utf-8')
            cartFile = JSON.parse(cartFile)

            const cart = cartFile.find(cart => cart.id === id)

            if (!cart) {
                return 'Cart not found'
            }

            const { products } = cart

            return products
        }

        catch {
            return 'Error trying to get Cart'
        }
    }

    async addProductCart(cartId, prodId) {

        let productsFile = await fs.promises.readFile('./database/products.json', 'utf-8')
        productsFile = JSON.parse(productsFile)
        console.log(productsFile)

        let cartFile = await fs.promises.readFile(this.path, 'utf-8')
        cartFile = JSON.parse(cartFile)
        let cart = cartFile.find(cart => cart.id === cartId)

        if (!cart) {
            return 'Cart not exists';
        }

        let { products } = cart

        const producInBase = productsFile.find(prod => prod.id === prodId)
        const producInCart = products.find(prod => prod.product === prodId)

        if (!producInBase) {
            return 'Product doesnt exists'
        }

        if (producInCart) {
            products = [...products, producInCart.quantity = producInCart.quantity + 1]
            await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
            return;
        }

        products.push({ product: prodId, quantity: 1 })

        await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
    }

}



export default CartManager;