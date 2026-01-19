import { BasePage } from './BasePage';
import { OrderDetails } from '../components/OrderDetails';

export class OrderPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.orderDetails = new OrderDetails(page);
  }
}
