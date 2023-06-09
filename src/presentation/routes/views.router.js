import { Router } from 'express'
import ProductManager from '../../domain/managers/ProductManager.js';
import { productModel } from '../../data/models/product.model.js';

const router = new Router();
const manager = new ProductManager();


router.get('/', async (req, res) => {

    let products = await productModel.find();

    res.render('home', { products })
    res.send({message: 'success', payload: products});
})

router.get('/realtimeproducts', async (req, res) => {

    const products = await manager.getProducts();

    res.render('realtimeproducts', { products })
})

router.post('/create', async (req, res) => {

    const product = req.body

    console.log(product.title)

    let result = await productModel.create(req.body)
    
    res.send({message: 'success', payload: result});
})


export default router;  