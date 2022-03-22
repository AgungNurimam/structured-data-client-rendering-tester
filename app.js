const { structuredDataTest } = require('structured-data-testing-tool');
const puppeteer = require('puppeteer');

(async () => {
    const url = 'http://localhost:4200';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const html = await page.evaluate(() => document.head.innerHTML);
    await browser.close();

    await structuredDataTest(html)
        .then(response => { console.log("All tests passed.", response.structuredData) })
        .catch(err => { console.log("Some tests failed.") })
})();
