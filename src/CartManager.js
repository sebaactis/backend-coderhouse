import fs from 'fs';

class CartManager {

    idAuto = 1;

    constructor() {
        this.carts = [];
        this.path = '../carts.json';
    }

    async newCart() {

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
        let cartFile = await fs.promises.readFile(this.path, 'utf-8')
        cartFile = JSON.parse(cartFile)
        let cart = cartFile.find(cart => cart.id === cartId)

        if (!cart) {
            return 'Cart not exists';
        }

        let { products } = cart

        const producExist = products.find(product => product.id === prodId)

        if (producExist) {
            products = [...products, producExist.quantity = producExist.quantity + 1]
            await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
            return;
        }

        products.push({ id: prodId, quantity: 1 })

        await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
    }

}



export default CartManager;