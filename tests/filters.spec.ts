import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { FiltersComponent } from '../pages/FiltersComponent';

test('Apply price range filter', async ({ page }) => {
  const search = new SearchPage(page);
  const filters = new FiltersComponent(page);

  await search.goto();
  await search.searchFor('watch');

  // Apply price range 50..200
  await filters.applyPriceRange(50, 200);

  // get displayed product prices and assert all are within range
  const prices = await search.pricesArray();
  expect(prices.length).toBeGreaterThan(0);
  for (const p of prices) {
    expect(p).toBeGreaterThanOrEqual(50);
    expect(p).toBeLessThanOrEqual(200);
  }

  // assert filter chip / selected filter UI shows the applied range
  const filtText = await filters.getSelectedFiltersText();
  expect(filtText).toContain('50');
  expect(filtText).toContain('200');

  // TODO: assert results update when changing range; assert no backend errors
});
