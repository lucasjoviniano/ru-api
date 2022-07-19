import axios from 'axios';
import cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

class RUService {
    public async scraping(url: string) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto(url);
            const html = await page.evaluate(() => {
                return {
                    html: document.documentElement.innerHTML
                }
            })

            const $ = cheerio.load(html.html)
            const element = $('.painel_cardapio')

            console.log(element.text())

            browser.close();
        } catch (error) {
            console.log(error)
        }
    }
}

export default RUService