import { BasePage } from './BasePage';
import { ProductCatalog } from '../components/ProductCatalog';
import { Notification } from '../components/Notification';
import { Header } from '../components/Header';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.component = new ProductCatalog(page);
    this.notification = new Notification(page);
    this.header = new Header(page);
  }

  async open() {
    await super.open('/');
  }

  async expectCatalogHeaderVisible() {
    await this.expectVisible(this.component.catalogHeader);
  }

  async getProductName(index = 0) {
    const { name } = this.component.getProductCardLocators(index);
    return name.innerText();
  }

  async getProductPrice(index = 0) {
    const { price } = this.component.getProductCardLocators(index);
    return price.innerText();
  }

  async addProductToCart(index = 0) {
    const { addToCartButton } = this.component.getProductCardLocators(index);
    await addToCartButton.click();
  }
}
