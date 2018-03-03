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

  describe('when user types into search field', () => {
    it('displays a list of matches', async () => {
      const search = await page.$('.search');
      await search.type('ab');
      await page.screenshot({ path: 'test.png' });
      const suggestions = await page.$$eval(
        '.autosuggest li',
        (items) => items.map((i) => i.innerHTML),
      );
      expect(suggestions).toEqual(['abide', 'abysmal']);
    });
  });
});
