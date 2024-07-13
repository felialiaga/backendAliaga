import cartModel from './models/cart.model.js';

export default class CartsManager{

    async getCarts() {
        return cartModel.find().populate('products.product');
    }

    async getCartsById(cid) {
        return cartModel.findOne({ _id: cid }).populate('products.product');
    }

    async createCart(cart) {
        return cartModel.create(cart);
    }

    async updateProduct(cid, product) {
        return cartModel.updateOne({_id: cid}, {products: product});
    }

    async deleteProduct(cid, pid) {
        return cartModel.updateOne({_id: cid}, {$pull: {products: {product: pid}}});
    }

    async deleteCart(cid) {
        return cartModel.updateOne({_id: cid}, {$set:{products: []}});
    }

    async updateProduct(cid, product) {
        return cartModel.updateOne({_id: cid}, {$set: product});
    }

}