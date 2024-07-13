import express from 'express';
import { Router } from 'express';

import { cartsService, productsService } from '../manager/index.js';

const router = Router();

router.use(express.json());


router.get('/', async(req, res) => {

    const carts = await cartsService.getCarts();

    if(carts.length === 0) {
        return res.send({status: 'error', error: 'There are not carts.'});
    };

    return res.send({status: 'success', payload: carts});

});

router.get('/:cid', async(req, res) => {

    const id = req.params.cid;

    const cart = await cartsService.getCartsById(id);

    if(!cart) {
        return res.send({status: 'error', error: 'Not found.'});
    }

    return res.send({status: 'success', payload: cart});

});

router.post('/', async(req, res) => {

    const newCart = {
        products: []
    };

    const result = await cartsService.createCart(newCart);

    return res.send({status: 'success', message: 'Cart created.'});

});

router.post('/:cid/products/:pid', async(req, res) => {

    const cid = req.params.cid;
    const pid = req.params.pid;

    const cart = await cartsService.getCartsById(cid);
    const product = await productsService.getProductsById(pid);

    if(!cart) {
        return res.status(404).send({status: 'error', error: "The cart doesn't exist"})
    }

    if(!product) {
        return res.status(404).send({status: 'error', error: "The product doesn't exist"})
    }

    const productIndex = cart.products.findIndex(prod => {
        return prod.product._id == pid;
    });

    if(productIndex === -1) {
        cart.products.push({
            product: pid,
            quantity: 1
        });
    }else {
        cart.products[productIndex].quantity++;
    };

    const result = await cartsService.updateProduct(cid, cart);

    return res.send({status: 'success', message: "Product modified."});

});

router.put('/:cid', async(req, res) => {

    const id = req.params.cid;
    const data = req.body;

    const cart = await cartsService.getCartsById(id);
    if(!cart) {
        return res.send({status: 'error', error: 'Couldnt get the cart.'})
    }

    cart.products = data;

    const result = await cartsService.updateProduct(id, cart);

    return res.send({status: 'success', message: 'Cart updated'});

});

router.put('/:cid/products/:pid', async (req, res) => {

    const cid = req.params.cid;
    const pid = req.params.pid;
    const data = req.body;

    const quantity = data.quantity;
    const cart = await cartsService.getCartsById(cid);

    if(!cart) {
        return res.send({status: 'error', error: 'The cart doesnt exist.'});
    };

    const productIndex = cart.products.findIndex(prod => {
        return prod.product._id == pid;
    });

    if(productIndex === -1) {
        return res.send({status: 'error', error: 'The product doesnt existe in the cart'});
    }else {
        cart.products[productIndex].quantity = quantity;
        const result = await cartsService.updateProduct(cid, cart);
    };

    return res.send({status: 'success', message: 'Product updated.'});

});

router.delete('/:cid/products/', async(req, res) => {

    const {cid, pid} = req.params;
    const cart = await cartsService.getCartsById(cid);
    
    if(!cart) {
        return res.send({status: 'error', error: 'The cart doesnt exist.'});
    };

    const productIndex = cart.products.findIndex(prod => {
        return prod.product._id == pid;
    });

    if(productIndex === -1) {
        return res.send({status: 'error', error: "The product doesn't exist in the cart."});
    } else {
        if(cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity--;
            const result = await cartsService.updateProduct(cid, cart);
            return res.send({status: 'success', message: 'Product updated.'});
        } else {
            const result = await cartsService.deleteProduct(cid, pid);
            return req.send({status: 'success', message: 'Product deleted.'});
        };
    };

});

router.delete('/:cid', async(req, res) => {
    const id = req.params.cid;

    const cart = await cartsService.getCartsById(cid);

    if(!cart) {
        return res.send({status: 'error', error: "Cart not found."})
    } else {
        const result = await cartsService.deleteCart(id);

        return res.send({status: 'success', message: 'Cart removed succesfully.'});
    }

});


export default router;