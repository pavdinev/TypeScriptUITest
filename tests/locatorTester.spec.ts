//// tests/locatorTester.spec.js
//import { test, expect } from '@playwright/test';
//
//// Helper function to highlight and verify a locator
//async function highlightLocator(locator, name = '') {
//    const count = await locator.count();
//    if (count === 0) {
//        console.log(`❌ Locator "${name}" did NOT match any elements.`);
//    } else {
//        console.log(`✅ Locator "${name}" matched ${count} element(s).`);
//        for (let i = 0; i < count; i++) {
//            await locator.nth(i).evaluate(el => {
//                el.style.outline = '3px solid red';
//                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
//            });
//        }
//    }
//}
//
//test('Locator Tester', async ({ page }) => {
//    // 1️⃣ Go to your page
//    await page.goto('https://shop.years.com'); // change this to your target URL
//
//    // 2️⃣ Pause for debugging if you want to inspect manually
//    await page.pause();
//
//    // 3️⃣ Fill this array with the locators you want to test
//    const locatorsToTest = [
//        {
//            name: 'Adult Meals link',
//            locator: page.getByRole('banner').getByRole('link', { name: 'Adult Meals' })
//        },
//        {
//            name: 'Best Sellers link',
//            locator: page.getByRole('button', { name: 'Login' })
//        },
//        {
//            name: 'Header logo',
//            locator: page.getByRole('banner').getByRole('img', { name: 'Site Logo' })
//        }
//        // ✅ Add as many as you want here
//    ];
//
//    // 4️⃣ Loop through all locators and check them
//    for (const item of locatorsToTest) {
//        await highlightLocator(item.locator, item.name);
//    }
//});
// tests/locatorTester.spec.ts
import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// Helper function to highlight a locator
async function highlightLocator(locator: any, name: string) {
  const count = await locator.count();
  if (count === 0) {
    console.log(`❌ Locator "${name}" did NOT match any elements.`);
  } else {
    console.log(`✅ Locator "${name}" matched ${count} element(s).`);
    for (let i = 0; i < count; i++) {
      await locator.nth(i).evaluate((el: HTMLElement) => {
        el.style.outline = '3px solid red';
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }
}

test('Home page category locators test', async ({ page }) => {
  const homePage = new HomePage(page);

  await page.goto('https://shop.years.com/'); // replace with your actual URL
  await page.pause(); // open debug mode if desired

  // Loop through all categoryButtons
  for (const [name, button] of Object.entries(homePage.categoryButtons)) {
    await highlightLocator(button.locator, name);
  }
});
