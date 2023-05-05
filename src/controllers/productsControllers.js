import ProductManager from '../managers/ProductManager.js'

const manager = new ProductManager();

export const getAll = async (req, res) => {

    let { limit, sort, category, page, stock } = req.query
    sort = +sort
    limit = +limit
    page = +page
    stock = +stock

    const products = await manager.getProducts(sort, category, limit, page, stock)

    res.status(200).json({status: 'success', payload: products})


    /* if (limit <= 0) {
        return res.status(404).json({ message: 'number invalid' });
    }

    if (!limit) {
        res.status(200).json({status:"success", payload: products});
    } else {
        res.status(200).json({status: "success", payload: products.slice(0, limit)}); 
    } */
}

export const getOne = async (req, res) => {

    const id = req.params.pid;

    const validProd = await manager.getProductById(id)

    if (validProd === null) {
        res.status(404).json({ "error": "Product doesn't exist" });
        return;
    }

    res.status(200).json(validProd)
};

export const create = async (req, res) => {

    const products = await manager.getProducts();

    let product = req.body;
    
    const { title, description, code, price, status, stock, category, thumbnail } = product;

    if (title === "" || description == "" || code == "" || price === "" || status === "" || stock === "" || category === "") {
        res.status(404).json({ message: "One of the fields are empty" })
        return;
    }

    const productCode = products.find(prod => prod.code === product.code)

    if(productCode) {
        res.status(200).json({message: "We just have one product with this code, choose another one"})
        return;
    }

    /* product.thumbnail = [req.file.path]
    product.price = Number(product.price)
    product.status = Boolean(product.status)
    product.stock = Number(product.stock) */

    await manager.addProduct(product);

    res.status(201).json({ completed: "The product has been added", product });
};

export const update = async (req, res) => {

    const products = await manager.getProducts();

    let id = req.params.pid;
    let data = req.body;

    const { title, description, code, price, status, stock, category, thumbnail } = data;


    if (title === "" || description == "" || code === "" || price === "" || status === "" || stock === "" || category === "") {
        res.status(404).json({ message: "One of the fields are empty" })
        return;
    }

    const productId = products.find(prod => prod.id === id)

    if(!productId) {
        res.status(404).json({message: 'Product not found'})
        return;
    }

    await manager.updateProd(id, data)

    res.status(200).json({ "message": `product ${id} has been edited`, data })

};

export const deleteOne = async (req, res) => {

    const products = await manager.getProducts();

    const id = req.params.pid;

    const prodId = products.find(prod => prod.id === id)

    if(!prodId) {
        res.status(404).json({ message: 'Product not found'});
        return;
    }

    manager.deleteProd(id)

    res.status(200).json({ "message": `product ${id} has been deleted` })
};


