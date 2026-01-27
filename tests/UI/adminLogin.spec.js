import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';

test.describe('TC-UI-SM-04: Admin user sees admin panel on Home page', () => {
  let page;
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page: browserPage }) => {
    page = browserPage;
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
  });

  test('Smoke: admin sees admin panel after login', async () => {
    await test.step('1: Open login page', async () => {
      await loginPage.open();
      await expect(loginPage.pageHeading).toBeVisible();
      await expect(page).toHaveURL(/\/login$/);
    });

    await test.step('2: Login with admin credentials', async () => {
      await loginPage.fillCredentials(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
      await loginPage.submit();

      await expect(page).toHaveURL(/\/$/);
    });

    await test.step('3: Verify admin panel is displayed in header', async () => {
      await expect(homePage.header.adminPanel).toBeVisible();
    });
  });
});
