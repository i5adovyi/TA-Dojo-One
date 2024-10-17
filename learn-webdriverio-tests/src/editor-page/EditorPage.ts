import { Page } from '@playwright/test';
import { BasePage } from '../home-page/HomePage';
import { EditorPageLocators } from './EditorPageLocators';

export class EditorPage extends BasePage {
  readonly locators: EditorPageLocators;
  constructor(page: Page) {
    super(page);
    this.locators = new EditorPageLocators(page);
  }

  async fillTitle(title: string) {
    await this.locators.postTitle.fill(title);
  }

  async fillDescription(description: string) {
    await this.locators.postDescription.fill(description);
  }

  async fillPostBody(text: string) {
    await this.locators.postBody.fill(text);
  }

  async addTags(tags: Array<string>) {
    for (const tag of tags) {
      await this.locators.postTags.fill(tag);
      await this.locators.postTags.press('Enter');
    }
  }

  async submitPost() {
    await this.locators.publishButton.click();
  }
}
