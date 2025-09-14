
import puppeteer from 'puppeteer';
import fs from 'fs';

const browser = await puppeteer.launch({
    headless: true,
    args: [
        '--ignore-certificate-errors',
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ]
});
const page = await browser.newPage();

// Эмуляция браузера
await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
);

await page.setExtraHTTPHeaders({
    "Accept-Language": "uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7",
    "Referer": "https://rozetka.com.ua/"
});

const productsList = [];


for (let index = 1; index <= 76; index++) {

    const url = `https://hard.rozetka.com.ua/ua/monitors/c80089/page=${index}`;
    await page.goto(url, { waitUntil: 'networkidle2' });


    // Парсинг товаров
    const products = await page.evaluate(() => {

        const items = []
        document.querySelectorAll(".item").forEach(item => {
            const saleEl = item.querySelector(".promo-label_type_action");
            const linkEl = item.querySelector(".text-base");

            items.push({
                link: linkEl ? (linkEl.href || linkEl.innerText.trim()) : 0,
                sale: saleEl ? saleEl.innerText.replace(/\D/g, "") : 0
            });
        });

        return items

    });

    productsList.push(...products)

}


productsList.sort((a, b) => b.sale - a.sale)

// Запись в JSON
fs.writeFileSync('products.json', JSON.stringify(productsList, null, 2));
console.log('Файл products.json создан');
await browser.close()