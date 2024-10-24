import { expect, test } from '@playwright/test';

// ДЗ №18

// 1. Створіть тест, який буде відкривати https://telemart.ua/  та отримувати всі cookies, встановлені на цій сторінці.
// 2. Додайте новий cookie зі значенням назва вашого улюбленого гурту : найкраща пісня.
// 3. Перевірте, що cookie було додано успішно.
// 4. Серед усіх кукі знайдіть кукі з name  = city_id і запишіть його value у змінну

// Підказка:

// page.context().cookies() для отримання cookies.
// page.context().addCookies() для додавання cookies.
// Array.find() для пошуку кукі у масиві

test('Cookies in telemart', async ({ page, context }) => {
  await page.goto('https://telemart.ua/ua/');

  // Отримати поточні кукі
  const cookies = await context.cookies();
  console.log('Current cookies:', cookies);

  // Додати нову кукі
  await context.addCookies([
    {
      name: 'favouriteBand',
      value: 'bestSong',
      url: 'https://telemart.ua',
    },
  ]);

  // Після додавання кукі, знову отримати кукі
  const updatedCookies = await context.cookies();

  // Знайти нову кукі
  const newCookie = updatedCookies.find(
    (cookie) => cookie.name === 'favouriteBand'
  );
  console.log('Newly added cookie:', newCookie);

  // Перевірити, чи кукі знайдена і має правильне значення            
  if (newCookie) {
    expect(newCookie.value).toBe('bestSong');
  } else {
    console.error('Cookie was not found!');
  }
});

test('Find my city in cookies', async ({ page, context }) => {
  await page.goto('https://telemart.ua/ua/');
  await page.waitForLoadState('load');
  await page.waitForSelector(
    '//*[@class="popover-body"]//*[@class="btn btn_primary btn_city_yes"]'
  );
    await page.click(
        '//*[@class="popover-body"]//*[@class="btn btn_primary btn_city_yes"]'
    );
    // Отримати поточні кукі
    const cookies = await context.cookies();
    console.log('Current cookies:', cookies);
    // Знайти кукі з name = city_id
    const cityCookie = cookies.find( (cookies) => cookies.value === '1360');
    console.log('City cookie:', cityCookie);

});


