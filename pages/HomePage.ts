import { Page } from '@playwright/test';
import { Button } from '../components/Button';

export class HomePage {
  readonly page: Page;

  // Header categories wrapped in Button components
  readonly bestSellers: Button;
  readonly adultMeals: Button;
  readonly puppyMeals: Button;
  readonly toppers: Button;
  readonly treatsExtras: Button;

  constructor(page: Page) {
    this.page = page;

    this.bestSellers = new Button(page, 'a[href="/collections/best-sellers"]', 'Best Sellers');
    this.adultMeals = new Button(page, 'a[href="/collections/adult-meals"]', 'Adult Meals');
    this.puppyMeals = new Button(page, 'a[href="/collections/puppy-meals"]', 'Puppy Meals');
    this.toppers = new Button(page, 'a[href="/collections/toppers"]', 'Toppers');
    this.treatsExtras = new Button(page, 'a[href="/collections/treats-extras"]', 'Treats & Extras');
  }
}
