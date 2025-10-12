import { test, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { FiltersPage } from '../pages/FiltersPage';
import { FiltersComponent } from '../components/Filters';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

async function debugPrintProductsWithFilters(page: Page, categoryName: string) {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const filtersPage = new FiltersPage(page);
  const filters = new FiltersComponent(page);

  // 1️⃣ Navigate to category
  const categoryButton = homePage.categoryButtons[categoryName];
  await categoryButton.scrollAndClick();

  // 2️⃣ Apply preset filters
  const productType = 'All Products';
  const proteinFilter = 'Chicken';
  const uiSort = 'Price: low to high';

  // Sort
  await filters.scrollAndClickDropdown(filtersPage.filterButtons['Sort by'], 20000);
  await filtersPage.filterButtons[uiSort].scrollAndClick(20000);

  // Product Type
  await filters.scrollAndClickDropdown(filtersPage.filterButtons['Product Type'], 20000);
  await filtersPage.filterButtons[productType].scrollAndClick(20000);

  // Protein
  await filters.scrollAndClickDropdown(filtersPage.filterButtons['Protein'], 20000);
  await filtersPage.filterButtons[proteinFilter].scrollAndClick(20000);

  // 3️⃣ Wait for product cards
  await productPage.productCardsLocator.first().waitFor({ state: 'visible', timeout: 20000 });

  const totalCount = await productPage.productCardsLocator.count();
  const sampleCount = Math.min(totalCount, 5);
  console.log(`Found ${totalCount} product cards (sampling first ${sampleCount})`);

  // 4️⃣ Iterate over first 5
  const products: { name: string; price: number; protein?: string }[] = [];
  for (let i = 0; i < sampleCount; i++) {
    const cardLoc = productPage.card(i);
    await page.waitForTimeout(150);

    const name = await cardLoc.name.innerText().catch(() => 'N/A');
    const priceText = await cardLoc.price.innerText().catch(() => 'N/A');
    const price = parseFloat(priceText.replace(/[£$]/g, '')) || 0;
    const description = await cardLoc.description.innerText().catch(() => 'N/A');
    const additionalInfo = await cardLoc.additionalInfo.allInnerTexts().catch(() => []);
    const protein = additionalInfo.length > 0 ? additionalInfo[0] : undefined;

    // Skip irrelevant cards
    const skipList = ['Hide', 'Shop now', 'Quick Buy'];
    if (!name || skipList.includes(name.trim())) {
      console.log(`\n--- Product ${i + 1} --- (skipped UI-only entry): "${name}"`);
      continue;
    }

    console.log(`\n--- Product ${i + 1} ---`);
    console.log(`Name: ${name}`);
    console.log(`Price: £${price.toFixed(2)}`);
    console.log(`Description: ${description}`);
    if (additionalInfo.length > 0) console.log(`Additional info: ${additionalInfo.join(', ')}`);

    products.push({ name, price, protein });
  }

  // 5️⃣ Check price order ascending
  let priceOrderCorrect = true;
  for (let i = 0; i < products.length - 1; i++) {
    const current = products[i];
    const next = products[i + 1];
    if (current.price > next.price) {
      console.warn(
        `⚠️ Price order mismatch: ${current.name} (£${current.price}) > ${next.name} (£${next.price})`
      );
      priceOrderCorrect = false;
    } else {
      console.log(`✅ Price order correct: ${current.name} (£${current.price}) ≤ ${next.name} (£${next.price})`);
    }
  }
  if (priceOrderCorrect) console.log('✅ Prices are in ascending order.');

  // 6️⃣ Check protein matches filter
  let proteinMatches = true;
  products.forEach(p => {
    if (
      !p.name.toLowerCase().includes(proteinFilter.toLowerCase()) &&
      (!p.protein || !p.protein.toLowerCase().includes(proteinFilter.toLowerCase()))
    ) {
      console.warn(`⚠️ Product does not match protein filter "${proteinFilter}": ${p.name}`);
      proteinMatches = false;
    } else {
      console.log(`✅ Protein matches filter: ${p.name}`);
    }
  });

  // 7️⃣ Fail test if any mismatch
  if (!priceOrderCorrect || !proteinMatches) {
    console.error('❌ There were mismatches in price order or protein filter.');
    throw new Error('Products did not pass filter/sorting checks. See console logs above.');
  }

  console.log('\n✅ First 5 products printed and checked successfully.');
}

// ✅ Single test
test('Debug Best Sellers full product info with filters', async ({ page }) => {
  test.setTimeout(60000);
  await debugPrintProductsWithFilters(page, 'Best Sellers');
});
