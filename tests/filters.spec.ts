import { test, expect } from '@playwright/test';
import { FiltersComponent } from '../components/Filters';
import { ProductPage } from '../pages/ProductPage';

// Utility: random item helper
function getRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// Common filter options
const productTypes = ['All Products', 'Toppers', 'Meals', 'Treats', 'Wellness', 'Accessories'];
const proteinTypes = ['All Protein', 'Chicken', 'Beef', 'Fish', 'Turkey'];
const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Newest First'];

// Base URL is taken from playwright.config.ts (use.baseURL)
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

//
// --------------- CATEGORY: BEST SELLERS ---------------
//
test.describe.parallel('Category: Best Sellers', () => {
  test('Random filter combination', async ({ page }) => {
    const filters = new FiltersComponent(page);
    const productPage = new ProductPage(page);

    const product = getRandom(productTypes);
    const protein = getRandom(proteinTypes);
    const sort = getRandom(sortOptions);

    console.log(`🧩 Testing Best Sellers: ${product}, ${protein}, ${sort}`);
    await filters.applyFilter(product, protein, sort);
    await productPage.verifyProductsFilteredCorrectly(sort);
  });
});

//
// --------------- CATEGORY: ADULT MEALS ---------------
//
test.describe.parallel('Category: Adult Meals', () => {
  test('Random filter combination', async ({ page }) => {
    const filters = new FiltersComponent(page);
    const productPage = new ProductPage(page);

    const product = getRandom(productTypes);
    const protein = getRandom(proteinTypes);
    const sort = getRandom(sortOptions);

    console.log(`🧩 Testing Adult Meals: ${product}, ${protein}, ${sort}`);
    await filters.applyFilter(product, protein, sort);
    await productPage.verifyProductsFilteredCorrectly(sort);
  });
});

//
// --------------- CATEGORY: PUPPY MEALS ---------------
//
test.describe.parallel('Category: Puppy Meals', () => {
  test('Random filter combination', async ({ page }) => {
    const filters = new FiltersComponent(page);
    const productPage = new ProductPage(page);

    const product = getRandom(productTypes);
    const protein = getRandom(proteinTypes);
    const sort = getRandom(sortOptions);

    console.log(`🧩 Testing Puppy Meals: ${product}, ${protein}, ${sort}`);
    await filters.applyFilter(product, protein, sort);
    await productPage.verifyProductsFilteredCorrectly(sort);
  });
});

//
// --------------- CATEGORY: TOPPERS ---------------
//
test.describe.parallel('Category: Toppers', () => {
  test('Random filter combination', async ({ page }) => {
    const filters = new FiltersComponent(page);
    const productPage = new ProductPage(page);

    const product = getRandom(productTypes);
    const protein = getRandom(proteinTypes);
    const sort = getRandom(sortOptions);

    console.log(`🧩 Testing Toppers: ${product}, ${protein}, ${sort}`);
    await filters.applyFilter(product, protein, sort);
    await productPage.verifyProductsFilteredCorrectly(sort);
  });
});

//
// --------------- CATEGORY: TREATS & EXTRAS ---------------
//
test.describe.parallel('Category: Treats & Extras', () => {
  test('Random filter combination', async ({ page }) => {
    const filters = new FiltersComponent(page);
    const productPage = new ProductPage(page);

    const product = getRandom(productTypes);
    const protein = getRandom(proteinTypes);
    const sort = getRandom(sortOptions);

    console.log(`🧩 Testing Treats & Extras: ${product}, ${protein}, ${sort}`);
    await filters.applyFilter(product, protein, sort);
    await productPage.verifyProductsFilteredCorrectly(sort);
  });
});
