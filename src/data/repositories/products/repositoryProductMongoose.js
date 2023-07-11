import Product from '../../../domain/entities/product.js';
import { productModel } from '../../models/product.model.js';

class repositoryProductMongoose {

    async addProduct(product) {

        const products = await productModel.find();
        const productCode = products.find(prod => prod.code === product.code)

        if (productCode) {
            throw new Error("Product Already Exists");
        }

        const document = await productModel.create(product);

        return new Product({
            id: document._id,
            title: document.title,
            description: document.description,
            code: document.code,
            price: document.price,
            status: document.status,
            stock: document.stock,
            category: document.category
        })

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
        const document = await productModel.findOne({ _id: id })

        if (!document) {
            throw new Error('Product Not Found');
        }

        return new Product({
            id: document.id,
            title: document.title,
            description: document.description,
            code: document.code,
            price: document.price,
            status: document.status,
            stock: document.stock,
            category: document.category
        })
    }

    async updateProd(id, data) {

        const productFind = await productModel.findOne({ _id: id })

        if (!productFind) {
            throw new Error('Product Not Found');
        }

        const document = await productModel.updateOne({ _id: id, }, data)

        return new Product({
            id: document.id,
            title: document.title,
            description: document.description,
            code: document.code,
            price: document.price,
            status: document.status,
            stock: document.stock,
            category: document.category
        })
    }

    async deleteProd(id) {

        const productFind = await productModel.findOne({ _id: id })


        if (!productFind) {
            throw new Error('Product Not Found');
        }

        const document = await productModel.deleteOne({ _id: id })

        return new Product({
            id: document.id,
            title: document.title,
            description: document.description,
            code: document.code,
            price: document.price,
            status: document.status,
            stock: document.stock,
            category: document.category
        })
    }

}

export default repositoryProductMongoose;


