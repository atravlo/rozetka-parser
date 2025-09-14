
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


const url = `${process.argv[3]}/page=${process.argv[2]}`;
await page.goto(url, { waitUntil: 'networkidle2' });
await new Promise(resolve => setTimeout(resolve, 30000));




// Парсинг товаров
const products = await page.evaluate(() => {

    const items = []
    document.querySelectorAll(".item").forEach(item => {

        const oldPrice = item.querySelector(".old-price") ? item.querySelector(".old-price").innerText.replace(/\D/g, "") : 0;
        const price = item.querySelector(".price") ? item.querySelector(".price").innerText.replace(/\D/g, "") : 0;
        const sale = (oldPrice - price) / (oldPrice / 100);
        const linkEl = item.querySelector(".text-base") + "%";

        items.push({
            link: linkEl ? (linkEl.href || linkEl.innerText.trim()) : 0,
            sale: sale,
            oldPrice,
            price
        });


    });

    return items

});






// 1. Читаем существующий файл
let productsListJson = [];
if (fs.existsSync('products.json')) {
    const data = fs.readFileSync('products.json', 'utf-8');
    productsListJson = JSON.parse(data);
}

// 2. Добавляем новые строки
productsListJson.push(...products);

productsListJson.sort((a, b) => b.sale - a.sale)

// 3. Сохраняем обратно в JSON
fs.writeFileSync('products.json', JSON.stringify(productsListJson, null, 2));

console.log('Новые элементы добавлены в products.json');
await browser.close()