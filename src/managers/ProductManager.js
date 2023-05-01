import daoProductMongoose from '../daos/products/daoProductMongoose.js';

class ProductManager {

    constructor() {
        this.dao = new daoProductMongoose();
    }

    async addProduct(product) {

        try {
            await this.dao.addProduct(product);
        }

        catch {
            throw new Error("The product could not be added. Try again later")
        }

    };

    async getProducts() {

        try {
            const products = await this.dao.getProducts();
            return products
        }

        catch {
            throw new Error("We could not receive the information. Try again later")
        }
    };

    async getProductById(id) {

        try {
            const product = await this.dao.getProductById(id)
            return product
        }

        catch {
            return "The product could not be retrieved. Try again"
        }

    }

    async updateProd(id, data) {

        try {
            const productEdit = await this.dao.updateProd(id, data)
            return productEdit
        }

        catch {
            throw new Error("The product could not be updated. Try again")
        }

    }

    async deleteProd(id) {

        try {
            const product = await this.dao.deleteProd(id)
            return product
        }

        catch {
            throw new Error("The product could not be deleted. Try again")
        }
    }
}

export default ProductManager;


