const fs = require('fs')

class ProductManager {

    idAuto = 1;

    constructor() {
        this.products = [],
            this.path = './products.txt'
    }

    async addProduct(products) {

        try {
            const productCode = this.products.find(prod => prod.code === products.code);

            if (productCode) {
                throw new Error("No puedes agregar un producto con un code ya existente")
            }

            this.products.push({
                ...products,
                id: this.idAuto
            })

            this.idAuto++;

            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        }

        catch {
            throw new Error("The product could not be added. Try again later")
        }


    };

    async getProducts() {

        try {
            const productsFile = await fs.promises.readFile('./products.txt', 'utf-8')
            return JSON.parse(productsFile)
        }

        catch {
            throw new Error("We could not receive the information. Try again later")
        }

    };

    async getProductById(id) {

        try {
            let productsFile = await fs.promises.readFile('./products.txt', 'utf-8')
            productsFile = JSON.parse(productsFile)

            const product = productsFile.find(product => product.id === id)

            if (!product) {
                throw new Error("Producto no encontrado")
            }
            return product;
        }

        catch {
            throw new Error("The product could not be retrieved. Try again")
        }

    }

    async updateProd(id, data) {

        try {
            let productsFile = await fs.promises.readFile('./products.txt', 'utf-8')
            productsFile = JSON.parse(productsFile)

            const prodIndex = productsFile.findIndex((prod) => prod.id === id)

            productsFile.splice(prodIndex, 1, { ...data, id })

            await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
        }

        catch {
            throw new Error("The product could not be updated. Try again")
        }

    }

    async deleteProd(id) {


        try {
            let productsFile = await fs.promises.readFile('./products.txt', 'utf-8')
            productsFile = JSON.parse(productsFile)

            if (!productsFile.some((prod) => prod.id === id)) {
                return "The entered product does not exist, please try with another ID"
            }

            let newProducts = productsFile.filter((prod) => prod.id !== id)

            await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
        }

        catch {
            throw new Error("The product could not be deleted. Try again")
        }
    }
}

const productsList = [
    {
        title: "producto prueba1",
        description: "Este es un producto de prueba 1",
        price: 200,
        thumbnail: "Sin imagen",
        code: 'abc123',
        stock: 50
    },
    {
        title: "producto prueba2",
        description: "Este es un producto de prueba 2",
        price: 200,
        thumbnail: "Sin imagen",
        code: 'abc500',
        stock: 40
    },
    {
        title: "producto prueba3",
        description: "Este es un producto de prueba 3",
        price: 200,
        thumbnail: "Sin imagen",
        code: 'abc999',
        stock: 100
    },

]

const manager = new ProductManager()



productsList.forEach((product) => {
    manager.addProduct(product)
})

manager.getProducts();

manager.getProductById(1);

manager.deleteProd(3)

manager.updateProd(1, {
    title: "Modificacion producto1",
    description: "Probamos la modificacion del producto",
    price: 500,
    thumbnail: "Sin imagen",
    code: 'abc500',
    stock: 10
})
