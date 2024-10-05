import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public async navigate(url: string) {
    await this.page.goto(url);
  }
}

export class HomePage extends BasePage {
  private signInButton: Locator;
  private signUpButton: Locator;
  private signInLink: Locator;
  private signUpLink: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private usernameInput: Locator;

  constructor(page: Page) {
    super(page);
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

  async clickSignInLink() {
    await this.signInLink.click();
  }

  async clickSignUpLink() {
    await this.signUpLink.click();
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }
}
