import productModel from './models/product.model.js';

export default class ProductsManager {

    async getProducts(page, limit) {
        return productModel.paginate({}, {page: page, limit: limit});
    }

    async getProductsById(pid) {
        return productModel.findOne({ _id: pid });
    }

    async createProduct(product) {
        return productModel.create(product);
    }

    async updateProduct(pid, product) {
        return productModel.findByIdAndUpdate(pid, product);
    }

    async deleteProduct(pid) {
        return productModel.findByIdAndDelete(pid);
    }

}