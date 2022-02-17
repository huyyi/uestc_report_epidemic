const puppeteer = require('puppeteer-core');
const config = require('./my_config');

async function report() {
    console.log("begin");
    const browser = await puppeteer.launch({
        executablePath: config.chrome_exepath,
        ignoreDefaultArgs: ["--enable-automation"],
        headless:config.headless
    });

    const page = await browser.newPage();

    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://jinshuju.net', ['geolocation']);

    await page.goto('https://jinshuju.net/f/kDiOo6', {waitUntil: "domcontentloaded"});
    try{
        await page.waitForSelector(".field_1 input");
        await page.type('.field_1 input', config.name);
        await page.type('input.field_2', config.id);
        await page.click('input[value="KsBW"]');
        await page.waitForSelector('input[value="JsBh"]');
        await page.click('input[value="JsBh"]');
        await page.waitForSelector('input[value="zBCK"]');
        await page.click('input[value="zBCK"]');
        await page.waitForSelector('input[value="GaXt"]');
        await page.click('input[value="GaXt"]');


        // await page.click('input[value="Ir9F"]');
        // await page.click('input[value="srmW"]');

        await page.setGeolocation({ latitude: 30.75233, longitude: 103.92567 });
        await page.waitForSelector('div.field_16 button');
        await page.click('div.field_16 button');
    
        await page.waitForSelector('div.geo-filed__header-latlng span');
        // await page.evaluate(()=>{window.alert('submmit')});
        await page.click('div.published-form__footer-buttons button');
        // console.log('submmit');

        await page.waitForSelector('div.message');
        // console.log('check success');
    }
    catch(e){
        console.error(e);
    }
    finally{
        await browser.close()
    }
}

report();