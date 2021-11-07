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
        console.log('fillin name');
        await page.type('input.field_2', config.id);
        console.log('fillin id');
        await page.click('input[value="Ir9F"]');
        await page.click('input[value="KsBW"]');
        await page.click('input[value="srmW"]');
        console.log('check 1');
        await page.waitForSelector('div[data-api-code="field_6"] input[value="JsBh"]');
        await page.click('div[data-api-code="field_6"] input[value="JsBh"]');
        console.log('check 2');
        await page.waitForSelector('div[data-api-code="field_4"] input[value="zBCK"]');
        await page.click('div[data-api-code="field_4"] input[value="zBCK"]');
        console.log('check 3');
        await page.waitForSelector('div[data-api-code="field_7"] input[value="GaXt"]');
        await page.click('div[data-api-code="field_7"] input[value="GaXt"]');
        console.log('check 4');
        await page.setGeolocation({ latitude: 30.75233, longitude: 103.92567 });
        await page.waitForSelector('div.field_16 button');
        await page.click('div.field_16 button');
        console.log('get pos');
    
        await page.waitForSelector('div.geo-filed__header-latlng span');
        // await page.evaluate(()=>{window.alert('submmit')});
        await page.click('div.published-form__footer-buttons button');
        // console.log('submmit');

        await page.waitForSelector('div.message');
        // console.log('check success');
    }
    catch(e){
        console.log("something wrong");
        console.error(e);
    }
    finally{
        await browser.close()
    }
}

report();