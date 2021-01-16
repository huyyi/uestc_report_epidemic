const puppeteer = require('puppeteer');

async function check_name() {
    const browser = await puppeteer.launch({
        // executablePath:"D:\\Downloads\\MSEdge\\chrome-win\\chrome.exe", // 修改为自己的 Chrome 路径
        ignoreDefaultArgs: ["--enable-automation"],
        devtools: true,
        defaultViewport: {
            width: 1500,
            height: 800
        }
    });

    const page = await browser.newPage();

    const context = browser.defaultBrowserContext();
    // 开启Chrome位置模拟
    await context.overridePermissions('https://jinshuju.net', ['geolocation']);

    // 填报url可能不一致，需自己修改
    await page.goto('https://jinshuju.net/f/9wGVFn/', {
        waitUntil:"networkidle0"
    });
    try{
        await page.type('input.field_6', "张三");  // 姓名
        console.log('fillin name');
        await page.type('input.field_5', '1234567'); // 学号
        console.log('fillin id');

        // 以下为信通研究生的点击规则，有不同的需自己修改
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
        await page.setGeolocation({ latitude: 30.75233, longitude: 103.92567 });
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