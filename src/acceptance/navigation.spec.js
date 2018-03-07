import puppeteer from 'puppeteer';

const URL = 'http://localhost:3000';
const TOTAL = 25;

const selectors = {
  index: '.current-index > button',
  indexInput: '.current-index_input',
  searchRoute: '.route-search',
  homeRoute: '.route-home',
  root: '#root',
};

describe('given user is on /', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto(URL);
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('when user presses right arrow', () => {
    beforeEach(async () => {
      await page.keyboard.press('ArrowRight');
    });

    it('changes displayed index of the word', async () => {
      const index = await page.$eval(
        selectors.index,
        (e) => e.innerHTML,
      );
      expect(index).toEqual(`2/${TOTAL}`);
    });
  });

  describe('when user clicks current index', () => {
    it('allows to enter index', async () => {
      await page.click(selectors.index);
      await page.type(selectors.indexInput, '10');
      await page.click(selectors.root);
      const index = await page.$eval(
        selectors.index,
        (e) => e.innerHTML,
      );
      expect(index).toEqual(`10/${TOTAL}`);
    });
  });

  describe('when users navigates between pages', () => {
    it('preserves index of the current word', async () => {
      await page.keyboard.press('ArrowRight');
      await page.click(selectors.searchRoute);
      await page.click(selectors.homeRoute);
      const index = await page.$eval(
        selectors.index,
        (e) => e.innerHTML,
      );
      expect(index).toEqual(`2/${TOTAL}`);
    });
  });
});
