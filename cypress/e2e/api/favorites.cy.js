import { workspacesFacade } from '../../api/facades/workspaces-facade';
import { favoritesFacade } from '../../api/facades/favorites-facade';

describe('Favorites: /api/favorites', () => {
  let token;

  beforeEach(() => {
    workspacesFacade.createNewWorkspace().then(({ status, body }) => {
      expect(status).to.eq(201);
      expect(body.token).to.be.a('string').and.not.be.empty;
      token = body.token;
    });
  });

  it('API-FAVORITES-001: Отримання пустого за замовчуванням списку обраного.', () => {
    favoritesFacade.getFavorites(token).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.product_ids).to.be.an('array').that.is.empty;
    });
  });

  it('API-FAVORITES-002: Додавання 2 товарів в обране', () => {
    const productIds = ['p01', 'p02'];

    favoritesFacade.getFavorites(token).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.product_ids).to.be.empty;
    });

    favoritesFacade.saveFavorites(token, productIds).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.product_ids).to.have.members(productIds);
    });

    favoritesFacade.getFavorites(token).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.product_ids).to.have.members(productIds);
    });
  });

  it('API-FAVORITES-003: Додавання невідомого товару в обране', () => {
    const unknownId = ['test001'];

    favoritesFacade.saveFavorites(token, unknownId).then(({ status, body }) => {
      expect(status).to.eq(422);
      expect(body.detail).to.eq('Невідомий товар');

    });

    favoritesFacade.getFavorites(token).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.product_ids).to.be.empty;
    });
  });
});