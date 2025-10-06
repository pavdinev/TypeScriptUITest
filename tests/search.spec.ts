import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

test('Search persistence across navigation', async ({ page }) => {
  const search = new SearchPage(page);
  await search.goto();                   // Will resolve to https://shop.years.com/


  // Perform search
  const q = 'vintage watch';
  await search.searchFor(q);

  const initialCount = await search.resultsCount();
  expect(initialCount).toBeGreaterThan(0); // sanity check

  // open first product
  await search.openResult(0);

  // ensure we are on a product page (URL pattern might vary)
  await expect(page).toHaveURL(/\/product\/\d+/);

  // go back to results
  await page.goBack();
  await page.waitForLoadState('networkidle');

  // assert search input preserved
  await expect(page.locator('[data-test="search-input"]')).toHaveValue(q);

  // assert result set is (roughly) the same
  const afterCount = await search.resultsCount();
  expect(afterCount).toBe(initialCount);

  // TODO: assert other persistence aspects: current page of pagination, scroll position (if required)
});
