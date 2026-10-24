import { apiClient } from '../client';

const FAVORITES = '/api/favorites';

export class FavoritesFacade {
    constructor(client = apiClient) {
        this.client = client;
    }

    getFavorites(token) {
        return this.client.get(FAVORITES, {
            headers: { 'x-workspace-token': token }
        });
    }

    saveFavorites(token, productIds) {
        return this.client.put(FAVORITES,
            { product_ids: productIds }, { headers: { 'x-workspace-token': token } });
    }
}

export const favoritesFacade = new FavoritesFacade();