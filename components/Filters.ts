// components/FiltersComponent.ts
import { Page } from '@playwright/test';
import { FiltersPage } from '../pages/FiltersPage';
import { Button } from './Button';
import { ProductPage } from '../pages/ProductPage';
import { HomePage } from '../pages/HomePage';
import { Product } from './Product';  


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

      const arrow = parentButton.locator.locator('svg');
      await this.page.waitForTimeout(200);
      const classValue = await arrow.getAttribute('class');
      const isExpanded = classValue.includes('rotate-0');

      if (!isExpanded) {
        console.log(`Expanding dropdown: ${parentButton.name}`);
        await parentButton.locator.click({ timeout });
        await this.page.waitForTimeout(300);
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

  async scrollAndClickDropdownIfExists(buttonLocator: Locator, timeout = 5000) {
  if (!buttonLocator) {
    return false; // locator not defined
  }

  const count = await buttonLocator.count();
  if (count === 0) {
    console.warn(`⚠️ Button not found, skipping.`);
    return false;
  }

  try {
    await buttonLocator.scrollIntoViewIfNeeded();
    await buttonLocator.click({ timeout });
    return true;
  } catch (err) {
    console.warn(`⚠️ Failed to click button: ${err}`);
    return false;
  }
}

 /**
   * Debug first N products in a category with filters applied.
   * Prints mismatches, warnings, and only fails test at the end.
   */
  async scrollAndClickDropdown(parentButton: Button, timeout = 10000) {
    try {
      await parentButton.locator.waitFor({ state: 'visible', timeout });
      await parentButton.locator.scrollIntoViewIfNeeded();

      const arrow = parentButton.locator.locator('svg');
      await this.page.waitForTimeout(200);
      const classValue = await arrow.getAttribute('class');
      const isExpanded = classValue?.includes('rotate-0');

      if (!isExpanded) {
        console.log(`Expanding dropdown: ${parentButton.name}`);
        await parentButton.locator.click({ timeout });
        await this.page.waitForTimeout(300);
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

  
async debugPrintProductsWithFilters(categoryName: string) {
  console.log(`\n🧩 Starting filter debug for category: "${categoryName}"`);

  const homePage = new HomePage(this.page);
  const categoryButton = homePage.categoryButtons[categoryName];
  if (!categoryButton) {
    console.warn(`⚠️ Category "${categoryName}" not found on HomePage`);
    return;
  }

  console.log(`Navigating to category: ${categoryName}`);
  await categoryButton.scrollAndClick();
  await this.page.waitForTimeout(2000);

  const filters = new FiltersComponent(this.page);

  // Filter buttons
  const sortBy = filters.locators.filterButtons['Sort by'];
  const productType = filters.locators.filterButtons['Product Type'];
  const protein = filters.locators.filterButtons['Protein'];

  // Apply Sort by filter
  try {
    await sortBy.exists(5000);
    await filters.scrollAndClickDropdown(sortBy);
    const lowToHigh = filters.locators.filterButtons['Price: low to high'];
    await lowToHigh.scrollAndClick();
  } catch {
    console.warn(`⚠️ "Sort by" button not found for category "${categoryName}", skipping sort.`);
  }

  await this.page.waitForTimeout(1500);

  // Apply Product Type filter (if exists)
  try {
    await productType.exists(5000);
    await filters.scrollAndClickDropdown(productType);
    const allProducts = filters.locators.filterButtons['All Products'];
    await allProducts.scrollAndClick();
  } catch {
    console.warn(`⚠️ "Product Type" button not found, skipping product type filter.`);
  }

  await this.page.waitForTimeout(1500);

  // Apply Protein filter
  try {
    await protein.exists(5000);
    await filters.scrollAndClickDropdown(protein);
    const chickenOption = filters.locators.filterButtons['Chicken'];
    await chickenOption.scrollAndClick();
  } catch {
    console.warn(`⚠️ "Protein" button not found, skipping protein filter.`);
  }

  await this.page.waitForTimeout(2500);

  // ✅ Extract products using ProductPage + Product class
  const productPage = new ProductPage(this.page);
  const productHelper = new Product(productPage);
  const products = await productHelper.listProducts();

  console.log(`Found ${products.length} product cards (sampling first ${Math.min(products.length, 5)}) in category: ${categoryName}`);
  products.slice(0, 5).forEach((p, idx) => {
    console.log(`\n--- Product ${idx + 1} ---`);
    console.log(`Name: ${p.name}`);
    console.log(`Price: ${p.price}`);
    console.log(`Category: ${p.category}`);
    console.log(`Protein: ${p.protein}`);
  });

  // ✅ Verify filters
  try {
    // Verify sort order
    await productHelper.verifyProductsFilteredCorrectly({
      sort: 'price',
      order: 'asc',
    }, products);

    // Verify protein using product name
    await productHelper.verifyProteinFromName(products, 'Chicken');

    console.log('✅ All filters applied correctly.');
  } catch (err) {
    console.warn(`⚠️ Filter verification failed: ${err.message}`);
  }
}

}
