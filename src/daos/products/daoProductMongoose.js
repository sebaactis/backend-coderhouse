import { productModel } from '../../models/product.model.js';

class daoProductMongoose {

    async addProduct(product) {

        try {
            await productModel.create(product);
        }

        catch {
            throw new Error("The product could not be added. Try again later")
        }
    };

    async getProducts(sort, category) {

        if(category && (sort !== 1 && sort !== -1)) {
            return productModel.aggregate([
                { $match: { category }}
            ])
        }

        if(category && (sort === 1 || sort === -1)) {
            return productModel.aggregate([
                {
                    $match: { category }
                },
                {
                    $sort: { price: sort }
                }
            ])
        }

        if (sort === 1 || sort === -1) {
            return productModel.aggregate([
                {
                    $sort: { price: sort }
                }
            ])
        }

        return productModel.find();
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


