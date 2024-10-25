import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart/cart-page';
import { MenuPage } from '../pages/menu/menu-page';

export const test = base.extend<{
  cartPage: CartPage;
  menuPage: MenuPage;
}>({
  // Initialize the pages
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  menuPage: async ({ page }, use) => {
    await page.goto('https://coffee-cart.app');
    const menuPage = new MenuPage(page);
    await use(menuPage);
  },
});
