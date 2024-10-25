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

// export const coffeeLocator = (coffeeName: string, page: Page): Locator => {
//   return page.locator(
//     `//*[@aria-label="${coffeeName}" and contains(@class, 'cup-body')]`
//   );
// };


// export const clickOnCup = async (coffeeName: string, page: Page) => {
//   const locator = coffeeLocator(coffeeName, page);
//   try {
//     await locator.click({ timeout: 200 }); // Timeout can be adjusted as needed
//     console.log(`Clicked on ${coffeeName}`);
//   } catch (error) {
//     console.error(`Failed to click on ${coffeeName}:`, error);
//   }
// };
