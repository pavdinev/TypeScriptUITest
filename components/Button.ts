import { expect, Page, Locator } from '@playwright/test';

export class Button {
  page: Page;
  selector: string;
  name: string;
  locator: Locator;

 constructor(page: Page, selectorOrLocator: string | Locator, name?: string) {
    this.page = page;
    this.name = name || (typeof selectorOrLocator === 'string' ? selectorOrLocator : 'unnamed');
    this.locator =
      typeof selectorOrLocator === 'string'
        ? page.locator(selectorOrLocator)
        : selectorOrLocator;
  }

 async exists(timeout = 5000) {
  try {
    // Scroll element into view first
    await this.locator.scrollIntoViewIfNeeded();
    // Then check visibility
    await expect(this.locator).toBeVisible({ timeout });
  } catch (error) {
    await this.captureError('exists', error);
  }
}

  async scrollAndClick(timeout = 10000) {
    try {
      await this.locator.waitFor({ state: 'visible', timeout });
      await this.locator.scrollIntoViewIfNeeded();
      await this.locator.click({ timeout });
    } catch (error) {
      const screenshotPath = `test-results/error-${this.name.replace(/\s+/g, '_')}-scrollAndClick.png`;
      await this.page.screenshot({ path: screenshotPath });
      throw new Error(
        `Failed to scrollAndClick button "${this.name}". Screenshot saved at ${screenshotPath}. Error: ${error}`
      );
    }
  }
  async checkText(expectedText: string) {
    await expect(this.locator).toHaveText(expectedText);
  }

  private async captureError(action: string, error: any) {
    const screenshotPath = `test-results/error-${this.name.replace(/\s+/g, '_')}-${action}.png`;
    await this.page.screenshot({ path: screenshotPath });
    throw new Error(
      `Failed to ${action} button "${this.name}". Screenshot saved at ${screenshotPath}. Error: ${error}`
    );
  }
}
