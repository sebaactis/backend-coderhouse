import express from 'express';
import ProductManager from './productManager.js';


const app = express();

const manager = new ProductManager;

app.use(express.urlencoded({ extended: true }));

app.get('/products', (req, res) => {

    const limit = req.query.limit;

    const main = async () => {

        if (limit < 1) {
            res.send(await manager.getProducts());
        } else {
            const products = await manager.getProducts();

            res.send(products.slice(0, limit));
        }
    }
    main();

})

app.get('/products/:id', (req, res) => {

    const id = +req.params.id;

    const main = async () => {
        const products = await manager.getProducts();

        const validProd = products.find(product => product.id === id);

        if(!validProd) {
            res.send({"error": "Product doesn't exist"});
        }

        res.send(validProd)
        
    }

    main();
})

app.listen(8080, () => {
    console.log('Listening on port 8080');
})