import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/');
  }

  async expectVisible(locator) {
    await expect(locator).toBeVisible();
  }
}
