import { Page } from '@playwright/test';
import { Button } from '../components/Button';

export class FiltersPage {
  readonly page: Page;

  // All filter buttons stored here for organized access
  readonly filterButtons: Record<string, Button>;

  constructor(page: Page) {
    this.page = page;

    // 1️⃣ Define locators (readable, one per line)
    const filterAndSortText = page.locator('div.filters-header').getByText('Filter & Sort');
    const sortByButton = page.getByRole('button', { name: 'Sort by' });
    const priceLowToHighButton = page.getByRole('button', { name: 'Price: low to high' });
    const priceHighToLowButton = page.getByRole('button', { name: 'Price: high to low' });
    const newestButton = page.getByRole('button', { name: 'Newest' });

    const productTypeButton = page.getByRole('button', { name: 'Product Type' });
    //const allProductsButton = page.getByRole('button', { name: 'All Products' }).nth(0);
    const allProductsButton = page
    .getByRole('button', { name: 'All Products', exact: true })
    .filter({ hasText: 'All Products', has: page.locator(':visible') }).nth(1);
    
    const toppersButton = page
      .getByRole('button', { name: 'Toppers', exact: true })
      .filter({ has: page.locator(':visible') }).nth(1);

    const mealsButton = page
      .getByRole('button', { name: 'Meals', exact: true })
      .filter({ has: page.locator(':visible') }).nth(1);

    const treatsButton = page
      .getByRole('button', { name: 'Treats', exact: true })
      .filter({ has: page.locator(':visible') }).nth(1);

    const wellnessButton = page
      .getByRole('button', { name: 'Wellness', exact: true })
      .filter({ has: page.locator(':visible') }).nth(1);

    const accessoriesButton = page
      .getByRole('button', { name: 'Accessories', exact: true })
      .filter({ has: page.locator(':visible') }).nth(1);

  const proteinButton = page
    .getByRole('button', { name: 'Protein', exact: true })
    .filter({ has: page.locator(':visible') });

  const allProteinButton = page.getByRole('button', { name: 'All Proteins' });

  const chickenButton = page
    .getByRole('button', { name: 'Chicken', exact: true });

  const beefButton = page
    .getByRole('button', { name: 'Beef', exact: true })
    .filter({ has: page.locator(':visible') });

  const turkeyButton = page
    .getByRole('button', { name: 'Turkey', exact: true })
    .filter({ has: page.locator(':visible') });

  const porkButton = page
    .getByRole('button', { name: 'Pork', exact: true })
    .filter({ has: page.locator(':visible') });

  const fishButton = page
    .getByRole('button', { name: 'Fish', exact: true })
    .filter({ has: page.locator(':visible') });

  const kingPrawnButton = page
    .getByRole('button', { name: 'King Prawn', exact: true })
    .filter({ has: page.locator(':visible') });

  const steakSalmonPrawnButton = page
    .getByRole('button', { name: 'Steak, Salmon & Prawn' })
    .filter({ has: page.locator(':visible') });

  const steakPorkChickenTurkeyButton = page
    .getByRole('button', { name: 'Steak, Pork, Chicken & Turkey' })
    .filter({ has: page.locator(':visible') });

  const wildBoarButton = page
    .getByRole('button', { name: 'Wild Boar' })
    .filter({ has: page.locator(':visible') });

    // 2️⃣ Wrap all locators in Button objects
    this.filterButtons = {
      //'Filter & Sort': new Button(page, filterAndSortText, 'Filter & Sort'),
      'Sort by': new Button(page, sortByButton, 'Sort by'),
      'Price: low to high': new Button(page, priceLowToHighButton, 'Price: low to high'),
      'Price: high to low': new Button(page, priceHighToLowButton, 'Price: high to low'),
      'Newest': new Button(page, newestButton, 'Newest'),

      'Product Type': new Button(page, productTypeButton, 'Product Type'),
      'All Products': new Button(page, allProductsButton, 'All Products'),
      'Toppers': new Button(page, toppersButton, 'Toppers'),
      'Meals': new Button(page, mealsButton, 'Meals'),
      'Treats': new Button(page, treatsButton, 'Treats'),
      'Wellness': new Button(page, wellnessButton, 'Wellness'),
      'Accessories': new Button(page, accessoriesButton, 'Accessories'),

      'Protein': new Button(page, proteinButton, 'Protein'),
      'All proteins': new Button(page, allProteinButton, 'All proteins'),
      'Chicken': new Button(page, chickenButton, 'Chicken'),
      'Beef': new Button(page, beefButton, 'Beef'),
      'Turkey': new Button(page, turkeyButton, 'Turkey'),
      'Pork': new Button(page, porkButton, 'Pork'),
      'Fish': new Button(page, fishButton, 'Fish'),
      'King Prawn': new Button(page, kingPrawnButton, 'King Prawn'),
      'Steak,Salmon & Prawn': new Button(page, steakSalmonPrawnButton, 'Steak,Salmon & Prawn'),
      'Steak,Pork,Chicken & Turkey': new Button(page, steakPorkChickenTurkeyButton, 'Steak,Pork,Chicken & Turkey'),
      'Wild Boar': new Button(page, wildBoarButton, 'Wild Boar'),
    };
  }
}
