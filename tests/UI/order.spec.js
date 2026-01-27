import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';
import { CartPage } from '../../src/pages/CartPage';
import { OrderPage } from '../../src/pages/OrderPage';

import { AuthAPI } from '../../src/apiClients/AuthAPI';
import { generateTestUser } from '../../src/utils/testData';

test.describe('TC-UI-01: Authorized user can place an order', () => {
  let page;
  let loginPage;
  let homePage;
  let cartPage;
  let orderPage;

  let testUser;

  test.beforeEach(async ({ page: browserPage, request }) => {
    page = browserPage;
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    orderPage = new OrderPage(page);

    const authApi = new AuthAPI(request);
    testUser = generateTestUser();
    await authApi.registerUser(testUser);

    test.info().annotations.push({
      type: 'testUser',
      description: testUser.email,
    });
  });

  test.afterEach(async () => {
    await test.step('Post-condition: simulate deletion of test user', async () => {
      // API does not support DELETE; simulation only
      if (testUser) {
        // placeholder for future cleanup if API adds DELETE endpoint
      }
    });
  });

  test('Happy Path: registered user can place an order', async () => {
    let productName;
    let productPrice;

    await test.step('1: Open login page', async () => {
      await loginPage.open();
      await expect(loginPage.pageHeading).toBeVisible();
      await expect(page).toHaveURL(/\/login$/);
    });

    await test.step('2: Login with valid credentials', async () => {
      await loginPage.fillCredentials(testUser.email, testUser.password);
      await loginPage.submit();

      await expect(page).toHaveURL(/\/$/);
      await homePage.notification.expectLoginSuccess();
    });

    //vs
    await test.step('3: Add first available product to the cart', async () => {
      productName = await homePage.getProductName();
      productPrice = await homePage.getProductPrice();

      await homePage.addProductToCart();
      await homePage.notification.expectAddedToCart();
    });

    await test.step('4: Open the cart', async () => {
      await homePage.header.openCart();
      await expect(page).toHaveURL(/\/cart$/);
      await cartPage.verifyItemInCart(productName, productPrice);
    });

    await test.step('5: Place the order', async () => {
      await cartPage.checkout();
      await cartPage.notification.expectOrderCreated();
      await expect(page).toHaveURL(/\/$/);
    });

    await test.step('6: Open Order History', async () => {
      await homePage.header.openOrders();
      await expect(page).toHaveURL(/\/orders$/);
    });

    await test.step('7: Verify latest order details', async () => {
      const lastOrderData = await orderPage.getLastOrderData();

      expect(lastOrderData.totalPrice).toBe(productPrice);
      expect(lastOrderData.products).toContain(productName);
    });
  });
});
