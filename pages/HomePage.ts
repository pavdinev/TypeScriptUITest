import { Page } from '@playwright/test';
import { Button } from '../components/Button';

export class HomePage {
  readonly page: Page;
  readonly categoryButtons: Record<string, Button>;

  constructor(page: Page) {
    this.page = page;

    // 1️⃣ Define locators as variables for readability
    const homeLocator = page.getByRole('link', { name: 'Home', exact: true });
    const bestSellersLocator = page.getByRole('link', { name: 'Best Sellers', exact: true });
    const adultMealsLocator = page.getByRole('link', { name: 'Adult Meals', exact: true });
    const puppyMealsLocator = page.getByRole('banner').getByRole('link', { name: 'Puppy Meals', exact: true }); // special case
    const toppersLocator = page.getByRole('link', { name: 'Toppers', exact: true });
    const treatsExtrasLocator = page.getByRole('link', { name: 'Treats and Extras', exact: true });

    // 2️⃣ Keep categoryButtons exactly as before, using the variables
    this.categoryButtons = {
      'Home': new Button(page, homeLocator, 'Home'),
      'Best Sellers': new Button(page, bestSellersLocator, 'Best Sellers'),
      'Adult Meals': new Button(page, adultMealsLocator, 'Adult Meals'),
      'Puppy Meals': new Button(page, puppyMealsLocator, 'Puppy Meals'),
      'Toppers': new Button(page, toppersLocator, 'Toppers'),
      'Treats & Extras': new Button(page, treatsExtrasLocator, 'Treats & Extras'),
    };
  }
}
