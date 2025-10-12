import { test } from '@playwright/test';
import { FiltersComponent } from '../components/Filters';
import { FiltersPage } from '../pages/FiltersPage';

test.describe('Filter Page Locator Tests', () => {
  let filtersPage: FiltersPage;
  let filtersComponent: FiltersComponent;

  test.beforeEach(async ({ page }) => {
    filtersPage = new FiltersPage(page);
    filtersComponent = new FiltersComponent(page);

    console.log('Navigating to Best Sellers page for filter tests...');
    await page.goto('https://shop.years.com/collections/best-sellers', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    console.log('Page loaded successfully.');
  });

  test('Check that all filter locators are visible and enabled', async ({ page }) => {
    console.log('Starting filter buttons validation...');
    const buttons = Object.values(filtersPage.filterButtons);

    for (const button of buttons) {
      console.log(`Checking visibility: ${button.name}`);
      await button.exists(); // always check visibility

      console.log(`Checking interaction: ${button.name}`);

      // Apply filter logic only for dropdowns
      
      if (button.name === 'Sort by' || button.name === 'Product Type' || button.name === 'Protein') {
        await filtersComponent.scrollAndClickDropdown(button);
      } 
      //else if (button.name === 'All Proteins' ) {
      //  
      //  await filtersPage.allProteinButton.waitFor({ state: 'attached' });
      //  console.log('Ccheck All Proteins button attached');
      //  await filtersPage.allProductsButton.waitFor({ state: "visible" });
      //  console.log('Ccheck All Proteins button visible');
      //  await filtersPage.allProductsButton.waitFor({ state: "enabled" });
      //  console.log('Ccheck All Proteins button enabled');
      //  await filtersPage.allProteinButton.scrollIntoViewIfNeeded();
      //  await filtersPage.allProteinButton.click();
      //}
      else {
        //await page.waitForTimeout(2000); // optional delay
        await button.scrollAndClick();
      }
    }

    console.log('All filter buttons validated successfully.');
  }
);
});
