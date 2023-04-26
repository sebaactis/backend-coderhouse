import { Router } from 'express'
import { uploader } from '../multer.js';
import ProductManager from '../ProductManager.js'

const manager = new ProductManager();
const productsRouter = Router();

productsRouter.get('/', async (req, res) => {

    const limit = req.query.limit;

    const products = await manager.getProducts()

    if (limit < 0) {
        return res.status(404).json({ message: 'number invalid' });
    }

    if (limit < 1) {
        res.status(200).json(products);
    } else {
        res.status(200).json(products.slice(0, limit));
    }
})

productsRouter.get('/:pid', async (req, res) => {

    const id = req.params.pid;

    const validProd = await manager.getProductById(id)

    console.log(validProd);

    if (validProd === "error") {
        res.status(404).json({ "error": "Product doesn't exist" });
        return;
    }

    res.status(200).json(validProd)
});

productsRouter.post('/', uploader.single('file'), async (req, res) => {

    let product = req.body;
    const { title, description, code, price, status, stock, category, thumbnail } = product;

    if (title === "" || description == "" || code == "" || price === "" || status === "" || stock === "" || category === "") {
        res.status(404).json({ message: "One of the fields are empty" })
        return;
    }

    /* product.thumbnail = [req.file.path]
    product.price = Number(product.price)
    product.status = Boolean(product.status)
    product.stock = Number(product.stock) */

    let addProd = await manager.addProduct(product);

    if(addProd === 'You cant add a product with a existing code') {
        res.status(404).json({ message: "You cant add a product with a existing code"})
        return;
    }

    res.status(201).json({ completed: "The product has been added" });
});

productsRouter.put('/:pid', (req, res) => {

    let id = req.params.pid;
    let data = req.body;

    const {title, description, code, price, status, stock, category, thumbnail} = data;


    if (title === "" || description == "" || code === "" || price === "" || status === "" || stock === ""|| category === "") {
        res.status(404).json({ message: "One of the fields are empty" })
        return;
    }

    manager.updateProd(id, data)

    res.status(200).json({ "message": `product ${id} has been edited`, data})

});

productsRouter.delete('/:pid', (req, res) => {
    const id = req.params.pid;

    manager.deleteProd(id)

    res.status(200).json({ "message": `product ${id} has been deleted` })
});

export default productsRouter;