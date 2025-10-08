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
    const allProductsButton = page.getByRole('button', { name: 'All Products' }).nth(1);
    const toppersButton = page.getByRole('button', { name: 'Toppers' }).nth(1);
    const mealsButton = page.getByRole('button', { name: 'Meals' }).nth(1);
    const treatsButton = page.getByRole('button', { name: 'Treats' }).nth(1);
    const wellnessButton = page.getByRole('button', { name: 'Wellness' }).nth(1);
    const accessoriesButton = page.getByRole('button', { name: 'Accesories' }).nth(1);

    const proteinButton = page.getByRole('button', { name: 'Protein', exact: true });
    const allProteinButton = page.getByRole('button', { name: 'All protein' });
    const chickenButton = page.getByRole('button', { name: 'Chicken' });
    const beefButton = page.getByRole('button', { name: 'Beef' });
    const turkeyButton = page.getByRole('button', { name: 'Turkey' });
    const porkButton = page.getByRole('button', { name: 'Pork' });
    const fishButton = page.getByRole('button', { name: 'Fish' });
    const kingPrawnButton = page.getByRole('button', { name: 'King Prawn' });
    const steakSalmonPrawnButton = page.getByRole('button', { name: 'Steak,Salmon & Prawn' });
    const steakPorkChickenTurkeyButton = page.getByRole('button', { name: 'Steak,Pork,Chicken  & Turkey' });
    const wildBoarButton = page.getByRole('button', { name: 'Wild Boar' });

    // 2️⃣ Wrap all locators in Button objects
    this.filterButtons = {
      'Filter & Sort': new Button(page, filterAndSortText, 'Filter & Sort'),
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
      'Accesories': new Button(page, accessoriesButton, 'Accesories'),

      'Protein': new Button(page, proteinButton, 'Protein'),
      'All protein': new Button(page, allProteinButton, 'All protein'),
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
