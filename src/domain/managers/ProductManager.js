import daoProductMongoose from '../../data/daos/products/daoProductMongoose.js';

class ProductManager {

    constructor() {
        this.dao = new daoProductMongoose();
    }

    async addProduct(product) {
        const prod = await this.dao.addProduct(product);
        return prod
    };

    async getProducts(sort, category, limit, page, stock) {

        const products = await this.dao.getProducts(sort, category, limit, page, stock);
        return products
    };

    async getProductById(id) {
        const product = await this.dao.getProductById(id)
        return product
    }

    async updateProd(id, data) {

        const product = await this.dao.updateProd(id, data);
        return product

    }

    async deleteProd(id) {
            const product = await this.dao.deleteProd(id)
            return product
    }
}

export default ProductManager;


