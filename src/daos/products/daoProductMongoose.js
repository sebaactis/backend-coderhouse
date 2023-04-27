import { productModel } from '../../models/product.model.js';

class daoProductMongoose {

    async addProduct(products) {

        try {
            await productModel.create(products);
        }

        catch {
            throw new Error("The product could not be added. Try again later")
        }
    };

    async getProducts() {

        try {
            const products = await productModel.find();
            return products
        }

        catch {
            throw new Error("We could not receive the information. Try again later")
        }
    };

    async getProductById(id) {

        try {
            const product = await productModel.findOne({ _id: id })
            return product
        }

        catch {
            return "The product could not be retrieved. Try again"
        }

    }

    async updateProd(id, data) {

        try {
            const productEdit = await productModel.updateOne({ _id: id, }, data)
            return productEdit
        }

        catch {
            throw new Error("The product could not be updated. Try again")
        }

    }

    async deleteProd(id) {


        try {
            const product = await productModel.deleteOne({ _id: id })
            return product
        }

        catch {
            throw new Error("The product could not be deleted. Try again")
        }
    }
}

export default daoProductMongoose;


