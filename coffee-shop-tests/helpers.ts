import { Locator, Page } from '@playwright/test';

export const clickFewTimes = async (
  locator: Locator,

  count: number,
  page: Page
) => {
  for (let i = 0; i < count; i++) {
    await locator.click({ delay: 100 });
    await page.waitForTimeout(500);
  }
};

const getCoffeeLocator = (coffeeName: string, page: Page): Locator => {
  return page.locator(
    `//*[@aria-label="${coffeeName}" and contains(@class, 'cup-body')]`
  );
};

export const clickOnCup = (coffeeName: string, page: Page) => {
  return getCoffeeLocator(coffeeName, page).click();
};
