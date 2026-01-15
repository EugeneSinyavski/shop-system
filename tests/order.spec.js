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

  await homePage.expectCatalogHeaderVisible();
});
