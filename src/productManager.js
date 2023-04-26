/* import fs from 'fs'; */
import { productModel } from '../src/models/product.model.js';

class ProductManager {

    /* idAuto = 1; */

    constructor() {
        this.products = [],
            this.path = './src/database/products.json'
    }

    async addProduct(products) {

        /* const productsRead = await fs.promises.readFile(this.path, 'utf-8')
        let productsFile = JSON.parse(productsRead)
        this.products = productsFile;
        this.idAuto = this.products.length + 1 */

        try {

            await productModel.create(products);

            /* const productCode = this.products.find(prod => prod.code === products.code);
            if (productCode) {
                return 'You cant add a product with a existing code'
            }
            this.products.push({
                id: this.idAuto,
                ...products
            })
            this.idAuto++;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products)) */
        }

        catch {
            throw new Error("The product could not be added. Try again later")
        }

    };

    async getProducts() {

        try {
            const products = await productModel.find();
            return products

            /* const productsFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(productsFile) */
        }

        catch {
            throw new Error("We could not receive the information. Try again later")
        }
    };

    async getProductById(id) {

        try {
            const product = await productModel.findOne({_id: id})
            return product


            /* let productsFile = await fs.promises.readFile(this.path, 'utf-8')
            productsFile = JSON.parse(productsFile
            const product = productsFile.find(product => product.id === id)
            if (!product) {
                return "error"
            }
            return product; */  
        }

        catch {
            return "The product could not be retrieved. Try again"
        }

    }

    async updateProd(id, data) {

        try {
            const productEdit = await productModel.updateOne({_id: id,}, data)
            return productEdit

            /* let productsFile = await fs.promises.readFile(this.path, 'utf-8')
            productsFile = JSON.parse(productsFile)
            const prodIndex = productsFile.findIndex((prod) => prod.id === id)
            productsFile.splice(prodIndex, 1, { ...data, id })
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile)) */

        }

        catch {
            throw new Error("The product could not be updated. Try again")
        }

    }

    async deleteProd(id) {


        try {
            const product = await productModel.deleteOne({_id: id})
            return product

            /* let productsFile = await fs.promises.readFile(this.path, 'utf-8')
            productsFile = JSON.parse(productsFile)
            if (!productsFile.some((prod) => prod.id === id)) {
                return "The entered product does not exist, please try with another ID"
            }
            let newProducts = productsFile.filter((prod) => prod.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts)) */
        }

        catch {
            throw new Error("The product could not be deleted. Try again")
        }
    }
}

export default ProductManager;


