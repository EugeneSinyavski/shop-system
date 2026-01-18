export class ProductCatalog {
  constructor(page) {
    this.page = page;
    this.catalogHeader = page.getByRole('heading', { name: 'Каталог товаров' });
    this.productCards = page.locator('a[href^="/product/"]');
  }

  getProductCardLocators(index = 0) {
    const card = this.productCards.nth(index);
    return {
      card,
      name: card.locator('div.flex-grow > div:first-child'),
      price: card.locator('div.flex-grow span'),
      addToCartButton: card.getByRole('button', { name: /в корзину/i }),
    };
  }
}
