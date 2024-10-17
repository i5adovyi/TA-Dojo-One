import { Locator, Page } from '@playwright/test';

export class EditorPageLocators {
  readonly page: Page;
  readonly postTitle: Locator;
  readonly postDescription: Locator;
  readonly postBody: Locator;
  readonly postTags: Locator;
  readonly publishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postTitle = this.page.locator('//input[@data-qa-id="editor-title"]');
    this.postDescription = this.page.locator(
      '//input[@data-qa-id="editor-description"]'
    );
    this.postBody = this.page.locator('//*[@data-qa-id="editor-body"]//*[@class="auto-textarea-input no-border no-resize"]');
    this.postTags = this.page.locator('//input[@data-qa-id="editor-tags"]');
    this.publishButton = this.page.locator('//*[@data-qa-id="editor-publish"]');
  }
}
