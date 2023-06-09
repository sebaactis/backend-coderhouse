import { productModel } from '../../models/product.model.js';

class daoProductMongoose {

    async addProduct(product) {

        const products = await productModel.find();
        const productCode = products.find(prod => prod.code === product.code)

        if (productCode) {
            throw new Error("Product Already Exists");
        }

        await productModel.create(product);

    }

    async getProducts(sort, category, limit, page, stock) {


        if (category && (sort !== 1 && sort !== -1)) {
            return productModel.aggregate([
                { $match: { category } }
            ])
        }

        if (stock && (sort !== 1 && sort !== -1)) {
            return productModel.aggregate([
                { $match: { stock: stock } }
            ])
        }


        if (category && (sort === 1 || sort === -1)) {
            return productModel.aggregate([
                {
                    $match: { category }
                },
                {
                    $sort: { price: sort }
                }
            ])
        }

        if (stock && (sort === 1 || sort === -1)) {
            return productModel.aggregate([
                {
                    $match: { stock: stock }
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

        if (!limit || limit <= 0) {
            return productModel.paginate({}, { limit: 10, page: 1 })
        } else {
            return productModel.paginate({}, { limit: limit, page: page })
        }

    };

    async getProductById(id) {
        const product = await productModel.findOne({ _id: id })

        if (!product) {
            throw new Error('Product Not Found');
        }

        return product;
    }

    async updateProd(id, data) {

        const product = await productModel.findOne({ _id: id })

        if (!product) {
            throw new Error('Product Not Found');
        }

        const productEdit = await productModel.updateOne({ _id: id, }, data)
        return productEdit
    }

    async deleteProd(id) {

        const product = await productModel.findOne({ _id: id })

        console.log(product)

        if (!product) {
            throw new Error('Product Not Found');
        }

        const productDeleted = await productModel.deleteOne({ _id: id })
        return productDeleted
    }

}

export default daoProductMongoose;


