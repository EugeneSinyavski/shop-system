import { BasePage } from './BasePage';
import { ProductCatalog } from '../components/ProductCatalog';
import { Notification } from '../components/Notification';
import { Header } from '../components/Header';
import { parsePrice } from '../../utils/parse';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.productCatalog = new ProductCatalog(page);
    this.notification = new Notification(page);
    this.header = new Header(page);
  }

  async open() {
    await super.open('/');
  }

  async getProductName(index = 0) {
    const { name } = this.productCatalog.getProductCardLocators(index);
    return name.innerText();
  }

  async getProductPrice(index = 0) {
    const { price } = this.productCatalog.getProductCardLocators(index);
    return parsePrice(await price.innerText());
  }

  async addProductToCart(index = 0) {
    const { addToCartButton } = this.productCatalog.getProductCardLocators(index);
    await addToCartButton.click();
  }
}
