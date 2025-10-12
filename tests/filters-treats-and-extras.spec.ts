import { test } from '@playwright/test';
import { FiltersComponent } from '../components/Filters.js';
import { FiltersPage } from '../pages/FiltersPage.js';
import { ProductPage } from '../pages/ProductPage.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

test('Debug Treats and extras with filters', async ({ page }) => {
  const filters = new FiltersComponent(page);
  const filtersPage = new FiltersPage(page);
  const productPage = new ProductPage(page);

  test.setTimeout(90000);
  await filters.debugPrintProductsWithFilters('Treats & Extras', filtersPage, productPage);
});
