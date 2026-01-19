import { parsePrice } from '../../utils/parse';

export class CartDetails {
  constructor(page) {
    this.page = page;
    this.cartItems = page.getByRole('button', { name: 'Удалить' }).locator('..');
    this.totalValue = page.locator('div').filter({ hasText: 'Итого:' }).locator('span').last();
    this.checkoutButton = page.getByRole('button', { name: 'Оформить заказ' });
  }

  aaaaaaparsePrice(priceStr = '') {
    return parseFloat(priceStr.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
  }

  async count() {
    return await this.cartItems.count();
  }

  async getCartInfo() {
    const items = [];
    const rows = await this.cartItems.all();

    for (const row of rows) {
      const name = await row.getByRole('heading').innerText();
      const priceText = await row.locator('p').innerText();

      items.push({
        name: name.trim(),
        price: parsePrice(priceText),
      });
    }

    const totalText = await this.totalValue.innerText();

    return {
      items,
      total: parsePrice(totalText),
    };
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
