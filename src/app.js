import express from 'express';
import mongoose from 'mongoose';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const PORT = process.env.PORT || 8080;
const app = express();

const connection = mongoose.connect('mongodb+srv://FeliAliaga:1234@cluster1.tdu0ptx.mongodb.net/store?retryWrites=true&w=majority&appName=cluster1');

app.use(express.json());

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);


const server = app.listen(PORT, console.log(`Listening on ${PORT}`));