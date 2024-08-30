import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.getByLabel('Cart page').click();
  await page.getByRole('button', { name: 'Add one Espresso' }).click();
  await page.getByLabel('Menu page').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByLabel('Name').fill('bob');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('marley');
  await page.getByLabel('Promotion message').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').press('ArrowLeft');
  await page.getByLabel('Email').fill('bob@marley');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('bob@marley.com');
  await page.getByRole('button', { name: 'Submit' }).click();
});