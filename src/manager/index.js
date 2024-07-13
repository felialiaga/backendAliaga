import productsManager from './mongo/ProductsManager.js';
import cartsManager from './mongo/CartsManager.js';

export const productsService = new productsManager();
export const cartsService = new cartsManager();