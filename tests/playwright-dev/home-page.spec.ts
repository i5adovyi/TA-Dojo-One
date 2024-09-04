import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

test.describe('Playwright Home page: ', () => {
  test('Menu Navigation in Header', async ({ page }) => {
    //step 1 > go to docs
    await page.locator('a.navbar__item.navbar__link[href="/docs/intro"]').click();
    await expect(
      page.getByRole('button', { name: 'Getting Started' })
    ).toBeVisible();
    await expect(page.getByLabel('Docs sidebar')).toContainText(
      'Getting Started'
    );

    //step 2 > go to API docs
    await page.getByRole('link', { name: 'API', exact: true }).click();
    await expect(
      page.getByRole('button', { name: 'API reference' })
    ).toBeVisible();
    await expect(page.getByLabel('Docs sidebar')).toContainText(
      'API reference'
    );
    await expect(page.locator('h1')).toContainText('Playwright');

    //step 3 > go to Community docs
    await page.getByRole('link', { name: 'Community' }).click();
    await expect(page.getByRole('link', { name: 'Welcome' })).toBeVisible();
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('Check the footer', async ({ page }) => {
    await expect(page.getByText('LearnGetting')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toContainText(
      'Getting started'
    );
    await expect(page.getByRole('contentinfo')).toContainText(
      'Playwright Training'
    );
    await expect(page.getByRole('contentinfo')).toContainText('Learn Videos');
    await expect(page.getByRole('contentinfo')).toContainText('Feature Videos');
    await expect(page.getByText('CommunityStack')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toContainText('Community');
    await expect(
      page.getByText('MoreGitHubYouTubeBlogAmbassadors')
    ).toBeVisible();
    await expect(page.getByRole('contentinfo')).toContainText('More');
  });

  test('Check content of Home page', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Playwright');
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect(page.getByRole('banner')).toContainText('Get started');
    await expect(page.getByLabel('GitHub repository')).toBeVisible();
    await expect(page.getByLabel('Discord server')).toBeVisible();
    await expect(
      page.getByLabel('Switch between dark and light')
    ).toBeVisible();
    await expect(page.getByLabel('Search')).toBeVisible();
  });

  test('Check Searching from Main page', async ({ page }) => {
    await expect(page.getByLabel('Search')).toBeVisible();
    await page.getByLabel('Search').click();
    await page.getByPlaceholder('Search docs').fill('api test');
    await expect(
      page.getByRole('link', { name: 'API testing', exact: true })
    ).toBeVisible();
    await expect(page.locator('#docsearch-item-0')).toContainText(
      'API testing'
    );
    await page.getByRole('link', { name: 'API testing', exact: true }).click();
    await expect(page.locator('h1')).toContainText('API testing');
  });

  test('Sidebar navigation', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('button', { name: 'Playwright Test' }).click();
    await page.getByRole('link', { name: 'Test configuration' }).click();
    await page.getByRole('link', { name: 'Expect Options', exact: true }).click();
    await page.getByRole('link', { name: 'Next Test use options »' }).click();
    await expect(page.locator('h1')).toContainText('Test use options');
  });
});
