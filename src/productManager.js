import fs from 'fs';

class ProductManager {

    idAuto = 1;

    constructor() {
        this.products = [],
        this.path = '../products.json'
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
            const productsFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(productsFile)
        }

        catch {
            throw new Error("We could not receive the information. Try again later")
        }

    };

    async getProductById(id) {

        try {
            let productsFile = await fs.promises.readFile(this.path, 'utf-8')
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
            let productsFile = await fs.promises.readFile(this.path, 'utf-8')
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
            let productsFile = await fs.promises.readFile(this.path, 'utf-8')
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
        price: 350,
        thumbnail: "Sin imagen",
        code: 'abc500',
        stock: 40
    },
    {
        title: "producto prueba3",
        description: "Este es un producto de prueba 3",
        price: 154,
        thumbnail: "Sin imagen",
        code: 'abc999',
        stock: 100
    },
    {
        title: "producto prueba4",
        description: "Este es un producto de prueba 4",
        price: 1587,
        thumbnail: "Sin imagen",
        code: 'abc91',
        stock: 100
    },
    {
        title: "producto prueba5",
        description: "Este es un producto de prueba 5",
        price: 55,
        thumbnail: "Sin imagen",
        code: 'zzz999',
        stock: 100
    },
    {
        title: "producto prueba6",
        description: "Este es un producto de prueba 6",
        price: 899,
        thumbnail: "Sin imagen",
        code: 'fgff999',
        stock: 100
    },
    {
        title: "producto prueba7",
        description: "Este es un producto de prueba 7",
        price: 13,
        thumbnail: "Sin imagen",
        code: 'abc543',
        stock: 100
    },
    {
        title: "producto prueba8",
        description: "Este es un producto de prueba 8",
        price: 1543,
        thumbnail: "Sin imagen",
        code: '150dcd',
        stock: 100
    },
    {
        title: "producto prueba9",
        description: "Este es un producto de prueba 9",
        price: 200,
        thumbnail: "Sin imagen",
        code: '112asd',
        stock: 100
    },
    {
        title: "producto prueba10",
        description: "Este es un producto de prueba 10",
        price: 200,
        thumbnail: "Sin imagen",
        code: 'zhg100',
        stock: 100
    }

]

export default ProductManager;


