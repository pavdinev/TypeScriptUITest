import { test, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

async function debugPrintProductsFull(page: Page, categoryName: string) {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  // 1️⃣ Navigate to category
  const categoryButton = homePage.categoryButtons[categoryName];
  await categoryButton.scrollAndClick();

  // 2️⃣ Wait for product cards
  const cardsLocator = productPage.productCardsLocator;
  await cardsLocator.first().waitFor({ state: 'visible', timeout: 20000 });

  const totalCount = await cardsLocator.count();
  const sampleCount = Math.min(totalCount, 5);
  console.log(`Found ${totalCount} product cards (sampling first ${sampleCount}).`);

  // 3️⃣ Iterate only over first 5
  for (let i = 0; i < sampleCount; i++) {
    const card = cardsLocator.nth(i);

    const name = await card
      .locator('p.text-m.font-bold.text-neutral-900')
      .first()
      .innerText()
      .catch(() => 'N/A');

    // ✅ Correct price — only <p class="font-bold text-neutral-900">£X.XX</p>
    const price = await card
      .locator('p.font-bold.text-neutral-900:not(.text-m)')
      .first()
      .innerText()
      .catch(() => 'N/A');

    const description = await card
      .locator('div.line-clamp-5 p')
      .first()
      .innerText()
      .catch(() => 'N/A');

    const additionalInfo = await card
      .locator('div.bg-yellow-200 p.text-xs')
      .allInnerTexts()
      .catch(() => []);

    // ✅ Skip irrelevant cards
    const skipList = ['Hide', 'Shop now', 'Quick Buy'];
    if (!name || skipList.includes(name.trim())) {
      console.log(`\n--- Product ${i + 1} --- (skipped UI-only entry): "${name}"`);
      continue;
    }

    console.log(`\n--- Product ${i + 1} ---`);
    console.log(`Name: ${name}`);
    console.log(`Price: ${price}`);
    console.log(`Description: ${description}`);
    if (additionalInfo.length > 0)
      console.log(`Additional info: ${additionalInfo.join(', ')}`);
  }

  console.log('\n✅ Printed first 5 product cards successfully.');
}

// ✅ Single test
test('Debug Best Sellers full product info', async ({ page }) => {
  test.setTimeout(60000);
  await debugPrintProductsFull(page, 'Best Sellers');
});
