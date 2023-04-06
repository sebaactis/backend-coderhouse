import { Router } from 'express'
import ProductManager from '../ProductManager.js';

const router = new Router();
const manager = new ProductManager();


router.get('/', async (req, res) => {

    const products = await manager.getProducts();

    res.render('home', {products})
})

router.get('/realtimeproducts', async (req, res) => {

    const products = await manager.getProducts();

    res.render('realtimeproducts', {products})
})

export default router;