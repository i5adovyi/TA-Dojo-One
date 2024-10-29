import { expect, test } from '@playwright/test';
import { Page } from '@playwright/test';


test('Click every second checkbox', async ({ page }) => {
    await page.goto('https://hard.rozetka.com.ua/ua/computers/c80095/');
    // Знайти всі елементи li всередині ul з класом checkbox-filter
    const listItems = await page.locator("//ul[contains(@class, 'checkbox-filter')]/li");
  
    // Порахувати кількість знайдених елементів
    const count = await listItems.count();
  
    // Пройтися по кожному другому елементу
    for (let i = 1; i < count; i += 2) {
      // Отримати поточний li-елемент
      const currentLi = listItems.nth(i);
      
      // Знайти чекбокс всередині li і клікнути
      const checkbox = currentLi.locator('input[type="checkbox"]');
      await checkbox.click();
    }
  });