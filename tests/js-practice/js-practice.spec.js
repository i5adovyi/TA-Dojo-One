import { expect, test } from '@playwright/test';

function isPositive(number) {
  if (typeof number === 'number') {
    if (number > 0) {
      console.log('number is positive');
      return true;
    } else if (number === 0) {
      console.log('number is negative');
      return false;
    } else {
      console.log('number is negative');
      return false;
    }
  } else {
    throw Error('pls use number to check if it positive');
  }
}

// Класи еквівалентності
// positive
// negative
// zero

// Граничні значення
// 1
// 0
// -1
// + бескінечність
// - бескінечність

test('is positive', async () => {
  const result = isPositive(1);
  expect(result).toBeTruthy();
});

test('is positive - max value', async () => {
  const result = isPositive(1.7976931348623157e308);
  expect(result).toBeTruthy();
});

test('is negative', async () => {
  const result = isPositive(-1);
  expect(result).toBeFalsy();
});

test('is negative - min value', async () => {
  const result = isPositive(-1.7976931348623157e308);
  expect(result).toBeFalsy();
});

// Вправа №1 — Перевірте парні чи непарні
// Сценарій: Напишіть програму, яка перевіряє, парне чи непарне число.
function isEven(number) {
  if (typeof number !== 'number') {
    throw Error('pls use number to check if it even');
  }

  if (number % 2 === 0) {
    console.log('number is even');
    return true;
  } else {
    console.log('number is not even');
    return false;
  }
}

test('is even', async () => {
  const result = isEven(2);
  expect(result).toBeTruthy();
});

test('is not even', async () => {
  const result = isEven(5);
  expect(result).toBeFalsy();
});

test('zero is even', async () => {
  const result = isEven(0);
  expect(result).toBeTruthy();
});

test('negative is even', async () => {
  const result = isEven(-2);
  expect(result).toBeTruthy();
});

test('float is not even', async () => {
  const result = isEven(1.5);
  expect(result).toBeFalsy();
});

test('is not a number', async () => {
  expect(() => isEven('dod')).toThrowError(
    'pls use number to check if it even'
  );
});

// Вправа №2 — Визначте більше число
// Сценарій: Напишіть програму для визначення більшого з двох чисел.

function isGreater(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Please use numbers for input');
  }

  if (a > b) {
    return true;
  } else if (a < b) {
    return false;
  } else {
    return 'equal';
  }
}

test('is greater', async () => {
  const result = isGreater(2, 1);
  expect(result).toBeTruthy();
});

test('is not greater', async () => {
  const result = isGreater(1, 2);
  expect(result).toBeFalsy();
});

test('is equal', async () => {
  const result = isGreater(1, 1);
  expect(result).toBe('equal');
});

test('is greater - negative', async () => {
  const result = isGreater(-1, -2);
  expect(result).toBeTruthy();
});

test('is not greater - negative', async () => {
  const result = isGreater(-2, -1);
  expect(result).toBeFalsy();
});

test('is equal - negative', async () => {
  const result = isGreater(-1, -1);
  expect(result).toBe('equal');
});

test('is greater - float', async () => {
  const result = isGreater(1.5, 1.4);
  expect(result).toBeTruthy();
});

test('is not greater - float', async () => {
  const result = isGreater(1.4, 1.5);
  expect(result).toBeFalsy();
});

test('is equal - float', async () => {
  const result = isGreater(1.5, 1.5);
  expect(result).toBe('equal');
});

test('a is not a number', async () => {
  expect(() => isGreater('dod', 1)).toThrowError('Please use numbers for input');
});

test('b is not a number', async () => {
  expect(() => isGreater(1, 'dod')).toThrowError('Please use numbers for input');
})


// ДЗ №9
// Цикли 
// - Виведіть в консоль числа від 1 до 345 (while)
// - Знайти суму чисел від 1 до 100 (тобто  1 + 2 + 3 + 4 + 5 + 6....)
// - Виведіть в консоль числа від 241  до 1 (do while)
// - Напишіть програму  яка відображає найбільше ціле число з двох цілих чисел. (if.. + покрийте тестами)

