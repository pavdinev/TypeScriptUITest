import { test, expect, Page } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { FiltersComponent } from '../components/Filters';

// Define categories from header
const categories = ['Best Sellers', 'Adult Meals', 'Snacks']; // Add all header categories

// Define sort options
const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Newest First'];

// Define random filter combinations
const randomFilters = [
  { productType: 'Meal', protein: 'Chicken', sort: 'Price: Low to High' },
  { productType: 'Snack', protein: 'Beef', sort: 'Price: High to Low' },
  { productType: 'Meal', protein: 'Vegan', sort: 'Newest First' }
];

async function getProductPrices(page: Page) {
  // Adjust selector to match product price element
  const pricesText = await page.$$eval('.product-price', nodes =>
    nodes.map(n => n.textContent?.replace(/[^0-9.]/g, ''))
  );
  return pricesText.map(p => parseFloat(p!));
}

async function applyFilters(page: Page, filters: { productType: string; protein: string; sort: string }, filtersComponent: FiltersComponent) {
  // Set product type and protein filters
  await filtersComponent.applyFilter(filters.productType);
  await filtersComponent.applyFilter(filters.protein);
  // Set sort by filter
  await filtersComponent.applyFilter(filters.sort);
}

categories.forEach(category => {
  test.describe(`Category: ${category}`, () => {
    test.beforeEach(async ({ page }) => {
      const searchPage = new SearchPage(page);
      await searchPage.navigate();
      // Click category link in header
      await page.click(`header >> text=${category}`);
    });

    // First test: all sort options with default product type and protein
    sortOptions.forEach(sort => {
      test(`Sort by "${sort}" with all products and all protein`, async ({ page }) => {
        const filters = new FiltersComponent(page);

        await applyFilters(page, { productType: 'All Products', protein: 'All Protein', sort }, filters);

        const prices = await getProductPrices(page);
        expect(prices.length).toBeGreaterThan(0);

        // Verify price sorting if applicable
        if (sort === 'Price: Low to High') {
          const sorted = [...prices].sort((a, b) => a - b);
          expect(prices).toEqual(sorted);
        } else if (sort === 'Price: High to Low') {
          const sorted = [...prices].sort((a, b) => b - a);
          expect(prices).toEqual(sorted);
        }
      });
    });

    // Random combinations tests
    randomFilters.forEach(f => {
      test(`Random filter: Product=${f.productType}, Protein=${f.protein}, Sort=${f.sort}`, async ({ page }) => {
        const filters = new FiltersComponent(page);
        await applyFilters(page, f, filters);

        const prices = await getProductPrices(page);
        expect(prices.length).toBeGreaterThan(0);

        // Optional: further assertions based on filter logic (e.g., product type text check)
      });
    });
  });
});
