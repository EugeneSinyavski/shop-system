import { BasePage } from './BasePage';
import { ProductCatalog } from '../components/ProductCatalog';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.component = new ProductCatalog(page);
  }

  async open() {
    await super.open('/');
  }

  async expectCatalogHeaderVisible() {
    await this.expectVisible(this.component.catalogHeader);
  }
}
