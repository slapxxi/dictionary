import puppeteer from 'puppeteer';

describe('given user is on /search', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/search');
  });

  afterAll(async () => {
    await browser.close();
  });

  it('works', async () => {
    const url = await page.evaluate(() => document.URL);
    expect(url).toEqual('http://localhost:3000/search');
  });
});
