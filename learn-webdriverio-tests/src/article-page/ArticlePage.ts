import { Page } from '@playwright/test';
import { BasePage } from '../home-page/HomePage';
import { ArticlePageLocators } from './ArticlePageLocators';

export class ArticlePage extends BasePage {
  readonly locators: ArticlePageLocators;
  constructor(page: Page) {
    super(page);
    this.locators = new ArticlePageLocators(page);
  }

  async deleteArticle() {
    await this.locators.deleteArticleButton.click();
  }

  async editArticle() {
    await this.locators.editArticleButton.click();
  }
  async postComment(comment: string) {
    await this.locators.commentInput.fill(comment);
    await this.locators.postCommentButton.click();
  }
  async getArticleTitle() {
    return await this.locators.articleTitle.innerText();
  }
  async getArticleBody() {
    return await this.locators.articleBody.innerText();
  }
  async getArticleTags() {
    return await this.locators.articleTags.innerText();
  }
  async getArticleAuthor() {
    return await this.locators.articleAuthor.innerText();
  }
}
