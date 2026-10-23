import { productsFacade } from '../../api/products-facade';

const ITEM_KEYS = ['id', 'name', 'category', 'price', 'stock'];

describe('Products: /api/products', () => {
  it('API-PRODUCTS-001: Отримати всі товари', () => {
    productsFacade.getProducts().then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.include({ page: 1, limit: 6 });
      expect(body.items[0]).to.include.all.keys(ITEM_KEYS);
    });
  });

  it('API-PRODUCTS-002: Отримати один товар', () => {
    productsFacade.getPage(1, 1).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.items).to.have.length(1);
    });
  });

  it('API-PRODUCTS-003: Отримати 20 товарів', () => {
    productsFacade.getPage(1, 20).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.items).to.have.length(Math.min(20, body.total));
    });
  });

  it('API-PRODUCTS-004: Отримати всі продукти з категорії Audio', () => {
    productsFacade.getByCategory('Audio').then(({ status, body }) => {
      expect(status).to.eq(200);
      body.items.forEach((i) => expect(i.category).to.eq('Audio'));
      expect(body.total).to.eq(body.items.length);
    });
  });

  it('API-PRODUCTS-005: знайти товар клавіатура «Студія» по назві', () => {
    productsFacade.search(' клавіатура «Студія»').then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.items.map((i) => i.id)).to.include('p03');
    });
  });

  it('API-PRODUCTS-006: знайти товари тільки в наявності', () => {
    productsFacade.getInStock().then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.items).to.not.be.empty;
      body.items.forEach((i) => expect(i.stock).to.be.greaterThan(0));
    });
  });

  it('API-PRODUCTS-007: знайти товари тільки у ціновому діапазоні від [500,00 - 2400,00] грн', () => {
    const min = 50000;
    const max = 240000;
    productsFacade.getByPriceRange(min, max).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.items).to.not.be.empty;
      body.items.forEach((i) => expect(i.price).to.be.within(min, max));
    });
  });
});