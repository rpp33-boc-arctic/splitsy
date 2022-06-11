// import React from 'react';
// const { render, screen, fireEvent, cleanup } = require('@testing-library/react');
// require('@testing-library/jest-dom');
const puppeteer = require('puppeteer');
// import App from './App';

var browser, page;

// it('renders welcome message', () => {
//   render(<App />);
//   expect(screen.getByText('Payment')).toBeInTheDocument();
// });

describe('Payment', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/Payment');
    await page.screenshot({ path: 'example.png' });
  });

  describe('Render Payment', () => {
    it ('should render payment main page', async () => {
      const container = await page.evaluate(() => document.querySelector('#payment-page'));
      expect(container).toBeDefined();
    });
    it ('should render timer component', async () => {
      // const timer = await page.evaluate(() => document.querySelector('#payment-timer').innerText);
      const timer = await page.$('#payment-timer');
      expect(timer).toBeDefined();
    });
    it ('should render mainboard component', () => {

    });
    it ('should render tip component', () => {

    })
    it ('should render summary component', () => {

    })
    it ('should render profile component', async() => {
      const userList = await page.evaluate(() => document.querySelector('#payment-user-list'));
      expect(userList).toBeDefined();
    })
    it ('should render status bar component', () => {

    })
  });

  describe('Interaction on Payment', () => {
    describe('Click on mainboard', () => {
      it ('click on item should hightlight item and update user_cart', () => {
        // const firstItem = screen.getByText("20");
        // fireEvent.click(firstItem);
      });
      it ('click on item again should unhighlight item and remove item from user_cart', () => {

      });
    })


  });

  afterAll(async () => {
    await browser.close();
  })
})


// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('http://localhost:3000/Payment');
//   // await page.screenshot({ path: 'example.png' });

//   await browser.close();
// })();