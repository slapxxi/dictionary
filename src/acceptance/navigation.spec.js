import puppeteer from 'puppeteer';

const URL = 'http://localhost:3000';

describe('given user is on /', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(URL);
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('when user presses right arrow', () => {
    beforeEach(async () => {
      await page.keyboard.press('ArrowRight');
      await page.waitFor(1000);
    });

    it('changes displayed index of the word', async () => {
      const index = await page.$eval(
        '.current-index',
        (e) => e.innerHTML,
      );
      await page.screenshot({ path: 'navigation.png' });
      expect(index).toEqual('2/14');
    });
  });

  describe('when users navigates between pages', () => {
    it('preserves index of the current word', async () => {
      await page.keyboard.press('ArrowRight');
      await page.click('.route-search');
      await page.click('.route-home');
      const index = await page.$eval(
        '.current-index',
        (e) => e.innerHTML,
      );
      expect(index).toEqual('2/14');
    });
  });
});
