import ProductManager from '../../domain/managers/ProductManager.js'
import productValidation from '../../domain/validations/productValidation.js'

const manager = new ProductManager();

export const getAll = async (req, res, next) => {

    try {
        let { limit, sort, category, page, stock } = req.query
        sort = +sort
        limit = +limit
        page = +page
        stock = +stock

        const products = await manager.getProducts(sort, category, limit, page, stock)

        res.status(200).json({ status: 'success', payload: products })
    }

    catch (e) {
        next(e);
    }

}

export const getOne = async (req, res, next) => {

    try {
        const id = req.params.pid;
        const product = await manager.getProductById(id)
        res.status(200).json({ message: 'success', payload: product })
    }
    catch (e) {
        next(e);
    }

};

export const create = async (req, res, next) => {

    try {
        await productValidation.parseAsync(req.body);
        const product = req.body;
        const newProduct = await manager.addProduct(product)

        res.status(201).json({ completed: "The product has been added", newProduct });
    }

    catch (e) {
        next(e);
    }
};

export const update = async (req, res, next) => {

    try {
        await productValidation.parseAsync(req.body);
        let id = req.params.pid;
        let data = req.body;

        await manager.updateProd(id, data)

        res.status(200).json({ "message": `product ${id} has been edited`, data })
    }

    catch (e) {
        next(e);
    }

};

export const deleteOne = async (req, res, next) => {

    try {
        const id = req.params.pid;
        await manager.deleteProd(id)    
        res.status(200).json({ "message": `product ${id} has been deleted` })
    }

    catch (e) {
        next(e);
    }

};


