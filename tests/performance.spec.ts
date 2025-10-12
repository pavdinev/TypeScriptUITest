import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FiltersComponent } from '../components/Filters';

test('Category & filter performance measurement - Best Sellers only', async ({ page }) => {
  test.setTimeout(300_000); // 5 minutes safety margin

  const toSeconds = (ms: number) => (ms / 1000).toFixed(3); // helper

  // ------------------- Navigate to Home -------------------
  const homeStart = performance.now();
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const homeEnd = performance.now();
  console.log(`🏠 Navigated to home in ${toSeconds(homeEnd - homeStart)} s`);

  const categoryName = 'Best Sellers';
  console.log(`\n➡️ Measuring category: "${categoryName}"`);

  const homePage = new HomePage(page);
  const categoryButton = homePage.categoryButtons[categoryName];
  if (!categoryButton) {
    console.warn(`⚠️ Category "${categoryName}" not found, skipping`);
    return;
  }

  // ------------------- Click category -------------------
  const catStart = performance.now();
  await categoryButton.scrollAndClick();
  const catEnd = performance.now();
  console.log(`Clicked category button in ${toSeconds(catEnd - catStart)} s`);

  // ------------------- Apply preset filters -------------------
  const filters = new FiltersComponent(page);
  const sortBy = filters.locators.filterButtons['Sort by'];
  const productType = filters.locators.filterButtons['Product Type'];
  const protein = filters.locators.filterButtons['Protein'];

  const filterStart = performance.now();
  try {
    await sortBy.exists(250);
    await filters.scrollAndClickDropdown(sortBy);
    const lowToHigh = filters.locators.filterButtons['Price: low to high'];
    await lowToHigh.scrollAndClick();
  } catch {}
  await page.waitForTimeout(10);

  try {
    await productType.exists(250);
    await filters.scrollAndClickDropdown(productType);
    const allProducts = filters.locators.filterButtons['All Products'];
    await allProducts.scrollAndClick();
  } catch {}
  await page.waitForTimeout(100);

  try {
    await protein.exists(250);
    await filters.scrollAndClickDropdown(protein);
    const chickenOption = filters.locators.filterButtons['Chicken'];
    await chickenOption.scrollAndClick();
  } catch {}
  await page.waitForTimeout(200);

  const filterEnd = performance.now();
  console.log(`Applied filters in ${toSeconds(filterEnd - filterStart)} s`);

  // ------------------- Wait for first product only -------------------
  const firstProductStart = performance.now();
  const firstProductSelector = 'p.text-m.font-bold.text-neutral-900';
  const maxWait = 5000;
  const pollInterval = 100;
  let firstProductFound = false;
  const startTime = Date.now();

  while (Date.now() - startTime < maxWait) {
    const el = await page.$(firstProductSelector);
    if (el) {
      firstProductFound = true;
      break;
    }
    await page.waitForTimeout(pollInterval);
  }

  const firstProductEnd = performance.now();
  if (!firstProductFound) {
    console.warn(`⚠️ First product not loaded after ${(maxWait / 1000).toFixed(1)} s`);
  } else {
    console.log(`✅ First product loaded in ${toSeconds(firstProductEnd - firstProductStart)} s`);
  }

  // ------------------- Final summary -------------------
  const totalDuration = firstProductEnd - homeStart;
  console.log(`\n📊 Total elapsed time: ${toSeconds(totalDuration)} s`);
  console.log('🏁 Performance test completed');
});
