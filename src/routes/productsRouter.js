import { Router } from 'express'
import ProductManager from '../ProductManager.js'

const manager = new ProductManager();
const productsRouter = Router();

productsRouter.get('/', async (req, res) => {


    const limit = req.query.limit;

    const products = await manager.getProducts()

    if(limit < 0) {
        return res.status(404).json({message: 'number invalid'});
    }

    if (limit < 1) {
        res.status(200).json(products);
    } else {
        res.status(200).json(products.slice(0, limit));
    }
})

productsRouter.get('/:pid', async (req, res) => {

    const id = +req.params.pid;

    const validProd = await manager.getProductById(id)

    console.log(validProd); 

    if (validProd === "error") {
        res.status(404).json({ "error": "Product doesn't exist" });
        return;
    }

    res.status(200).json(validProd)
});

productsRouter.post('/', async (req, res) => {

    let product = req.body;

    await manager.addProduct(product);
        
    res.status(201).json({ "completed": "The product has been added" });
});

productsRouter.put('/:pid',  (req, res) => {

    const id = +req.params.pid;
    const data = req.body;

    manager.updateProd(id, data)

    res.status(200).json({"message": `product ${id} has been edited`})

});

productsRouter.delete('/:pid', (req, res) => {
    const id = +req.params.pid;

    manager.deleteProd(id)

    res.status(200).json({"message": `product ${id} has been deleted`})
});

export default productsRouter;