import { test } from '@playwright/test';
import { FiltersComponent } from '../components/Filters';
import { FiltersPage } from '../pages/FiltersPage';
import { ProductPage } from '../pages/ProductPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

test('Debug Best Sellers with filters', async ({ page }) => {
  const filters = new FiltersComponent(page);
  const filtersPage = new FiltersPage(page);
  const productPage = new ProductPage(page);

  test.setTimeout(90000);
  await filters.debugPrintProductsWithFilters('Best Sellers', filtersPage, productPage);
});
