import { faker } from '@faker-js/faker';
import { Page } from '@playwright/test';
import { HomePageLocators } from './HomePageLocators';

export abstract class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public async navigate(url: string) {
    await this.page.goto(url);
  }
}

export class HomePage extends BasePage {
  readonly locators: HomePageLocators;
  constructor(page: Page) {
    super(page);
    this.locators = new HomePageLocators(page);
  }

  async clickSignInLink() {
    await this.locators.signInLink.click();
  }

  async clickSignUpLink() {
    await this.locators.signUpLink.click();
  }

  async clickSignInButton() {
    await this.locators.signInButton.click();
  }

  async clickSignUpButton() {
    await this.locators.signUpButton.click();
  }

  async fillEmail(email: string) {
    await this.locators.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.locators.passwordInput.fill(password);
  }

  async fillUsername(username: string) {
    await this.locators.usernameInput.fill(username);
  }

  async clickNewArticleLink() {
    await this.locators.newArticleLink.click();
  }

  async clickSettingsLink() {
    await this.locators.settingsLink.click();
  }

  async fillInAllFields({
    email = faker.internet.email(),
    username = faker.internet.userName(),
    password = faker.internet.password(),
  }: {
    email?: string;
    username?: string;
    password?: string;
  }) {
    await this.fillEmail(email);
    await this.fillUsername(username);
    await this.fillPassword(password);
  }
}
