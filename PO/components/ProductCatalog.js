export class ProductCatalog {
  constructor(page) {
    this.page = page;
    this.catalogHeader = page.getByRole('heading', { name: 'Каталог товаров' });
  }
}
