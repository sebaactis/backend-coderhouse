import express from 'express';
import ProductManager from './productManager.js';


const app = express();

const manager = new ProductManager;

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {

    const limit = req.query.limit;

    if (limit < 1) {
        res.send(await manager.getProducts());
    } else {
        const products = await manager.getProducts();

        res.send(products.slice(0, limit));
    }
}
)

app.get('/products/:id', async (req, res) => {

    const id = +req.params.id;

    const products = await manager.getProducts();

    const validProd = products.find(product => product.id === id);

    if (!validProd) {
        res.send({ "error": "Product doesn't exist" });
    }

    res.send(validProd)
})

app.listen(8080, () => {
    console.log('Listening on port 8080');
})