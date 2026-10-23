import { apiClient } from './client';

const PRODUCTS = '/api/products';

export class ProductsFacade {
    constructor(client = apiClient) {
        this.client = client;
    }

    getProducts(qs = {}) {
        return this.client.get(PRODUCTS, { qs });
    }

    getPage(page, limit) {
        return this.getProducts(limit === undefined ? { page } : { page, limit });
    }

    getByCategory(category) {
        return this.getProducts({ category });
    }

    search(q, limit = 20) {
        return this.getProducts({ q, limit });
    }

    getInStock(limit = 20) {
        return this.getProducts({ in_stock: true, limit });
    }

    getByPriceRange(min_price, max_price) {
        return this.getProducts({ min_price, max_price });
    }
}

export const productsFacade = new ProductsFacade();