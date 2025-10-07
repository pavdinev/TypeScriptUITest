import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../Pages/homePage';
import { FiltersComponent } from '../components/Filters';

// Categories (header buttons)
const categories = [
  'Best Sellers',
  'Adult Meals',
  'Snacks',
  'Puppy Meals',
  'Toppers',
  'Treats & Extras'
];

// Sort options
const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Newest First'];

// Random filter combinations
const randomFilters = [
  { productType: 'Meal', protein: 'Chicken', sort: 'Price: Low to High' },
  { productType: 'Meal', protein: 'Vegan', sort: 'Newest First' },
  { productType: 'Treats', protein: 'Beef', sort: 'Price: High to Low' },
];

// 🔧 Helper: Extract prices
async function getProductPrices(page: Page) {
  const pricesText = await page.$$eval('.product-price', nodes =>
    nodes.map(n => n.textContent?.replace(/[^0-9.]/g, ''))
  );
  return pricesText.map(p => parseFloat(p!));
}

// 🔧 Helper: Apply filters via FiltersComponent
async function applyFilters(
  filtersComponent: FiltersComponent,
  filters: { productType: string; protein: string; sort: string }
) {
  await filtersComponent.applyFilter(filters.productType);
  await filtersComponent.applyFilter(filters.protein);
  await filtersComponent.applyFilter(filters.sort);
}

// ✅ Parallelized test blocks
for (const category of categories) {
  test.describe.parallel(`Category: ${category}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      const homePage = new HomePage(page);

      // Access button dynamically from the map
      const categoryButton = homePage.categoryButtons[category];
      await categoryButton.scrollAndClick();
    });

    // 🧭 Test all sort options with default filters
    for (const sort of sortOptions) {
      test(`Sort by "${sort}" with all products and all protein`, async ({ page }) => {
        const filters = new FiltersComponent(page);
        await applyFilters(filters, {
          productType: 'All Products',
          protein: 'All Proteins',
          sort,
        });

        const prices = await getProductPrices(page);
        expect(prices.length).toBeGreaterThan(0);

        if (sort === 'Price: Low to High') {
          expect(prices).toEqual([...prices].sort((a, b) => a - b));
        } else if (sort === 'Price: High to Low') {
          expect(prices).toEqual([...prices].sort((a, b) => b - a));
        }
      });
    }

    // 🧪 Random filter combinations
    for (const f of randomFilters) {
      test(`Random filter: Product=${f.productType}, Protein=${f.protein}, Sort=${f.sort}`, async ({ page }) => {
        const filters = new FiltersComponent(page);
        await applyFilters(filters, f);

        const prices = await getProductPrices(page);
        expect(prices.length).toBeGreaterThan(0);
      });
    }
  });
}
