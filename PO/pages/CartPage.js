import { BasePage } from './BasePage';
import { CartDetails } from '../components/CartDetails';
import { Notification } from '../components/Notification';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.cartDetails = new CartDetails(page);
    this.notification = new Notification(page);
  }
}
