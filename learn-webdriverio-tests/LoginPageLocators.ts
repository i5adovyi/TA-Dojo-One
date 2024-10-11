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

  constructor(page: Page) {
    this.page = page;
    this.signInLink = this.page.locator('//ul[@data-qa-id="site-nav"]/li[2]');
    this.signUpLink = this.page.locator('//ul[@data-qa-id="site-nav"]/li[3]');
    this.signInButton = this.page.locator(
      '//button[contains(text(), "Sign in")]'
    );
    this.signUpButton = this.page.locator(
      '//button[contains(text(), "Sign up")]'
    );
    this.emailInput = this.page.locator('//input[@placeholder="Email"]');
    this.passwordInput = this.page.locator('//input[@placeholder="Password"]');
    this.usernameInput = this.page.locator('//input[@placeholder="Username"]');
  }
}
 