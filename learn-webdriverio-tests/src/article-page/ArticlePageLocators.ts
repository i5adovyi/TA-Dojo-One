import { Locator, Page } from '@playwright/test';

export class ArticlePageLocators {
  readonly page: Page;
  readonly articleTitle: Locator;
  readonly articleBody: Locator;
  readonly articleTags: Locator;
  readonly articleAuthor: Locator;
  readonly editArticleButton: Locator;
  readonly deleteArticleButton: Locator;
  readonly commentInput: Locator;
  readonly postCommentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.articleTitle = this.page.locator('//h1[@data-qa-id="article-title"]');
    this.articleBody = this.page.locator('//div[@data-qa-id="article-body"]');
    this.articleTags = this.page.locator('//ul[@data-qa-id="article-tags"]');
    this.articleAuthor = this.page.locator(
      '//div[@class="container"]//div[@class = "article-meta"]//*[@data-qa-type="author-name"]'
    );
    this.editArticleButton = this.page.locator(
      '//div[@class="container"]//div[@class = "article-meta"]//*[@data-qa-id="article-edit"]'
    );
    this.deleteArticleButton = this.page.locator(
      '//div[@class="container"]//div[@class = "article-meta"]//button[@data-qa-id="article-delete"]'
    );
    this.commentInput = this.page.locator('//textarea[@class="form-control"]');
    this.postCommentButton = this.page.locator(
      '//button[@class="btn btn-sm btn-primary"]'
    );
  }
}
