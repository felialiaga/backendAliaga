import express from 'express';
import { Router } from 'express';
import {productsService} from '../manager/index.js';

const router = Router();

router.use(express.json());


router.get('/', async(req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const products = await productsService.getProducts(page, limit);

    const prevLink = () => {
        if(products.hasPrevPage) {
            return `http://localhost:8080/api/products?page=${products.prevPage}`
        }
    }

    const nextLink = () => {
        if(products.hasNextPage) {
            return `http://localhost:8080/api/products?page=${products.nextPage}`
        }
    }

    return res.send({
        status: 'success',
        payload: products.docs,
        page: products.page,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: prevLink(),
        nextLink: nextLink()
    })

});

router.get('/:pid', async (req, res) => {
    const id = req.params.pid;
    const product = await productsService.getProductsById(id);

    return res.send({status: 'success', payload: product});
});

router.post('/', async(req, res) => {
    const data = req.body;

    if(!data.title || !data.description || !data.price || !data.stock || !data.category || !data.code) {
        return res.send({status: 'error', error: 'All fields are required.'});
    };

    const newProduct = {
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category,
        code: data.code
    };

    const result = await productsService.createProduct(newProduct);

    return res.send({status: 'success', payload: 'Product created.'});
})

router.put('/:pid', async(req, res) => {

    const id = req.params.pid;
    const data = req.body;

    if(!data.title || !data.description || !data.price || !data.stock || !data.category || !data.code) {
        return res.send({status: 'error', error: 'All fields are required.'});
    };

    const updatedProduct = {
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: data.category,
        code: data.code
    };

    const result = await productsService.updateProduct(id, updatedProduct);
    
    res.send({status: 'success', message: 'Product updated.'});

})

router.delete('/:pid', async(req, res) => {

    const id = req.params.pid;
    
    const result = await productsService.deleteProduct(id);


    return res.send({status: 'success', message: 'Product deleted.'});

})







export default router;

// {
//     "title": "Coca Cola 2L",
//     "description": "Fresh adn delicious",
//     "price": 1500,
//     "stock": 5,
//     "category": "Drinks",
//     "code": "fdvhhcdu89sn"
// }