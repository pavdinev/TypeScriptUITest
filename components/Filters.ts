// components/FiltersComponent.ts
import { Page } from '@playwright/test';
import { FiltersPage } from '../pages/FiltersPage';
import { Button } from './Button';

export class FiltersComponent {
  readonly page: Page;
  readonly locators: FiltersPage;

  constructor(page: Page) {
    this.page = page;
    this.locators = new FiltersPage(page);
  }

  /**
   * Scrolls to a parent filter button and clicks it only if it's not expanded.
   * Detects expansion via the arrow rotation class (rotate-180 = expanded).
   */
  async scrollAndClickDropdown(parentButton: Button, timeout = 10000) {
    try {
      await parentButton.locator.waitFor({ state: 'visible', timeout });
      await parentButton.locator.scrollIntoViewIfNeeded();

      // Find the arrow SVG inside the button
      const arrow = parentButton.locator.locator('svg');
      await this.page.waitForTimeout(200);
      const classValue = await arrow.getAttribute('class');
      const isExpanded = classValue.includes('rotate-0'); 

      if (!isExpanded) {
        console.log(`Expanding dropdown: ${parentButton.name}`);
        await parentButton.locator.click({ timeout });
        await this.page.waitForTimeout(300); // allow animation
      } else {
        console.log(`Dropdown already expanded: ${parentButton.name}`);
      }
    } catch (error) {
      const screenshotPath = `test-results/error-${parentButton.name.replace(/\s+/g, '_')}-scrollAndClickDropdown.png`;
      await this.page.screenshot({ path: screenshotPath });
      throw new Error(
        `Failed to scrollAndClickDropdown button "${parentButton.name}". Screenshot saved at ${screenshotPath}. Error: ${error}`
      );
    }
  }
}
