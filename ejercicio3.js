const fs = require('fs')

class ProductManager {

    idAuto = 1;


    constructor() {
        this.products = [],
        this.path = './products.txt'
    }

    async addProduct(products) {

        const productCode = this.products.find(product => product.code === products.code);

        if (productCode) {
            throw new Error("No puedes agregar un producto con un code ya existente")
        }

        this.products.push({
            ...products,
            id: this.idAuto
        })

        this.idAuto++;

        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    };

    async getProducts() {
        const productsFile = await fs.promises.readFile('./products.txt', 'utf-8')
        return JSON.parse(productsFile)
    };

    async getProductById(id) {

        let productsFile = await fs.promises.readFile('./products.txt', 'utf-8')
        productsFile = JSON.parse(productsFile)

        const product = productsFile.find(product => product.id === id)

        if (!product) {
            throw new Error("Producto no encontrado")
        }
        return product;
    }

    async updateProd(id, data) {

        let productsFile = await fs.promises.readFile('./products.txt', 'utf-8')
        productsFile = JSON.parse(productsFile)

        const prodIndex = productsFile.findIndex((prod) => prod.id === id)
        
        productsFile.splice( prodIndex, 1, {...data, id} )

        await fs.promises.writeFile(this.path, JSON.stringify(productsFile))

    }

    async deleteProd(id) {

        let productsFile = await fs.promises.readFile('./products.txt', 'utf-8')
        productsFile = JSON.parse(productsFile)

        let newProducts = productsFile.filter((prod) => prod.id !== id)

        await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
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

/* productsList.forEach((product) => {
    manager.addProduct(product)
}) */

manager.getProducts();

/* manager.getProductById(3); */

/* manager.deleteProd(3) */

/* manager.updateProd(3, {name: "carlos", edad: 25}); */

/* manager.updateProd(1, {title: "producto prueba1",
description: "PRODUCTO ACTUALIZADO",
price: 200,
thumbnail: "Sin imagen",
code: 'abc123',
stock: 50}) */

/* manager.updateProd(1) */
