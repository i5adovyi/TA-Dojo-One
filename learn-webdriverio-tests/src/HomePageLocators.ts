import { Locator, Page } from '@playwright/test';

export class HomePageLocators {
  private page: Page;
  signInButton: Locator;
  signUpButton: Locator;
  signInLink: Locator;
  signUpLink: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  usernameInput: Locator;
  newArticleLink: Locator;
  settingsLink: Locator;
  yourFeedTab: Locator;
  globalFeedTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = this.page.locator(
      `//ul[@data-qa-id="site-nav"]//li/a[contains(normalize-space(), 'Sign in')]`
    );
    this.signUpLink = this.page.locator(
      `//ul[@data-qa-id="site-nav"]//li/a[contains(normalize-space(), 'Sign up')]`
    );
    this.signInButton = this.page.locator(
      '//button[contains(text(), "Sign in")]'
    );
    this.signUpButton = this.page.locator(
      '//button[contains(text(), "Sign up")]'
    );
    this.emailInput = this.page.locator('//input[@placeholder="Email"]');
    this.passwordInput = this.page.locator('//input[@placeholder="Password"]');
    this.usernameInput = this.page.locator('//input[@placeholder="Username"]');
    this.newArticleLink = this.page.locator(
      `//ul[@data-qa-id="site-nav"]//li/a[contains(normalize-space(), 'New Article')]`
    );
    this.settingsLink = this.page.locator(
      `//ul[@data-qa-id="site-nav"]//li/a[contains(normalize-space(), 'Settings')]`
    );

    this.yourFeedTab = this.page.locator(
      `//*[@data-qa-type="feed-tab"][contains(normalize-space(), 'Your Feed')]`
    );
    this.globalFeedTab = this.page.locator(
      `//*[@data-qa-type="feed-tab"][contains(normalize-space(), 'Global Feed')]`
    );
  }
}
