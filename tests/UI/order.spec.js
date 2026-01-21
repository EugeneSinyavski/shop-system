//@ts-check
import { expect, test } from '@playwright/test';
import { LoginPage } from '../../PO/pages/LoginPage';
import { HomePage } from '../../PO/pages/HomePage';
import { CartPage } from '../../PO/pages/CartPage';
import { OrderPage } from '../../PO/pages/OrderPage';

test('Happy Path: authorized user can place an order', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const orderPage = new OrderPage(page);

  await homePage.open();
  await loginPage.open();
  await expect(loginPage.loginForm.pageHeading).toBeVisible();
  await loginPage.fillCredentials(process.env.USER_EMAIL, process.env.USER_PASSWORD);
  await loginPage.submit();

  await homePage.notification.expectLoginSuccess();
  await expect(homePage.productCatalog.catalogHeader).toBeVisible();

  const catalogProductName = await homePage.getProductName(0);
  const catalogProductPrice = await homePage.getProductPrice(0);
  await homePage.addProductToCart(0);

  await homePage.notification.expectAddedToCart();
  await homePage.header.openCart();

  const cartItemsInfo = await cartPage.cartDetails.getCartInfo();
  expect(cartItemsInfo.items[0].name).toBe(catalogProductName);
  expect(cartItemsInfo.items[0].price).toBe(catalogProductPrice);

  await cartPage.cartDetails.checkout();
  await cartPage.notification.expectOrderCreated();

  await homePage.header.openOrders();

  const lastOrderData = await orderPage.orderDetails.getLastOrderData();
  expect(lastOrderData.totalPrice).toBe(cartItemsInfo.total);
  expect(lastOrderData.products).toContain(cartItemsInfo.items[0].name);
});
