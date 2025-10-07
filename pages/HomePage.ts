import { Page } from '@playwright/test';
import { Button } from '../components/Button';

export class HomePage {
  readonly page: Page;
  categoryButtons: Record<string, Button>;

  // Header categories wrapped in Button components
  readonly bestSellers: Button;
  readonly adultMeals: Button;
  readonly puppyMeals: Button;
  readonly toppers: Button;
  readonly treatsExtras: Button;

  constructor(page: Page) {
    this.categoryButtons = {
      'Best Sellers': new Button(page, 'a[href="/collections/best-sellers"]', 'Best Sellers'),
      'Adult Meals': new Button(page, 'a[href="/collections/adult-meals"]', 'Adult Meals'),
      'Snacks': new Button(page, 'a[href="/collections/snacks"]', 'Snacks'),
      'Puppy Meals': new Button(page, 'a[href="/collections/puppy-meals"]', 'Puppy Meals'),
      'Toppers': new Button(page, 'a[href="/collections/toppers"]', 'Toppers'),
      'Treats & Extras': new Button(page, 'a[href="/collections/treats-extras"]', 'Treats & Extras'),
    };
  }
}
