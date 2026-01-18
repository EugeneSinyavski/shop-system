// @ts-check
import { test } from '@playwright/test';
import { LoginPage } from '../PO/pages/LoginPage';
import { HomePage } from '../PO/pages/HomePage';

test('Happy Path: authorized user can place an order', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.open();

  await loginPage.expectLoginFormVisible();
  await loginPage.fillCredentials(process.env.USER_EMAIL, process.env.USER_PASSWORD);
  await loginPage.submit();

  await homePage.notification.expectToastWithText('Вход выполнен успешно!');
  await homePage.expectCatalogHeaderVisible();

  const name = await homePage.getProductName(0);
  const price = await homePage.getProductPrice(0);
  console.log(`Adding to cart product: ${name} with price: ${price}`);

  await homePage.addProductToCart(0);
  await homePage.notification.expectToastWithText('Товар добавлен в корзину');

  await homePage.header.openCart();
  await page.pause(5000);
});
