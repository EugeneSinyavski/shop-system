import { expect } from '@playwright/test';

export class Notification {
  constructor(page) {
    this.page = page;
    this.toastLocator = page.getByRole('listitem');
  }
  async expectToastWithText(expectedText) {
    const toast = this.toastLocator.filter({ hasText: expectedText }).first();
    await expect(toast).toBeVisible();
    await toast.waitFor({ state: 'hidden', timeout: 5000 });
  }
}
