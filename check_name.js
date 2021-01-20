const puppeteer = require('puppeteer');
const config = require('./config');

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

    await page.goto('https://jinshuju.net/f/9wGVFn/', {
        waitUntil:"networkidle0"
    });
    try{
        await page.type('input.field_6', config.name);
        console.log('fillin name');
        await page.type('input.field_5', config.id);
        console.log('fillin id');
        await page.click('input[value="Povx"]');
        console.log('check 1');
        await page.waitForSelector('div.field_24 input[value="FRjZ"]');
        await page.click('div.field_24 input[value="FRjZ"]');
        console.log('check 2');
        await page.waitForSelector('div.field_7 input[value="FRjZ"]');
        await page.click('div.field_7 input[value="FRjZ"]');
        console.log('check 3');
        await page.waitForSelector('div.field_9 input[value="Zda4"]');
        await page.click('div.field_9 input[value="Zda4"]');
        console.log('check 4');
        await page.setGeolocation({ latitude: config.lat, longitude:  config.lon});
        await page.waitForSelector('div.field_21 button');
        await page.click('div.field_21 button');
        console.log('get pos');
    
        await page.waitForSelector('div.geo-filed__header-latlng span');
        // await page.evaluate(()=>{window.alert('submmit')});
        await page.click('div.published-form__footer-buttons');
        console.log('submmit');

        await page.waitForSelector('div.message');
        console.log('check success');
    }
    catch(e){
        console.log("something wrong");
        console.error(e);
    }
    finally{
        await browser.close()
    }
}

check_name();