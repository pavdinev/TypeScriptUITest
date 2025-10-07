import { Locator, Page, test, expect } from '@playwright/test';

export class Button {
  readonly page: Page;
  readonly locator: Locator;
  readonly name: string;

  constructor(page: Page, selector: string, name: string) {
    this.page = page;
    this.locator = page.locator(selector);
    this.name = name;
  }

  async click() {
    await test.step(`Clicking on button: ${this.name}`, async () => {
      try {
        await this.locator.click();
      } catch (error) {
        await this.captureError('click', error);
      }
    });
  }

  async scrollAndClick() {
    await test.step(`Scrolling to and clicking button: ${this.name}`, async () => {
      try {
        await this.locator.first().scrollIntoViewIfNeeded();
        await this.locator.first().click();
      } catch (error) {
        await this.captureError('scrollAndClick', error);
      }
    });
  }

  async hover() {
    await test.step(`Hovering over button: ${this.name}`, async () => {
      try {
        await this.locator.hover();
      } catch (error) {
        await this.captureError('hover', error);
      }
    });
  }

  async doubleClick() {
    await test.step(`Double clicking button: ${this.name}`, async () => {
      try {
        await this.locator.dblclick();
      } catch (error) {
        await this.captureError('doubleClick', error);
      }
    });
  }

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  async isEnabled(): Promise<boolean> {
    return await this.locator.isEnabled();
  }

  async getText(): Promise<string> {
    return (await this.locator.textContent())?.trim() || '';
  }

  async waitForVisible(timeout: number = 5000) {
    await test.step(`Waiting for button: ${this.name} to be visible`, async () => {
      try {
        await this.locator.waitFor({ state: 'visible', timeout });
      } catch (error) {
        await this.captureError('waitForVisible', error);
      }
    });
  }

  private async captureError(action: string, error: unknown) {
    const screenshotPath = `test-results/error-${this.name.replace(/\s+/g, '_')}-${action}.png`;
    await this.page.screenshot({ path: screenshotPath });
    throw new Error(
      `Failed to ${action} button "${this.name}". Screenshot saved at ${screenshotPath}. Error: ${error}`
    );
  }
}
