const puppeteer = require('puppeteer');

async function report() {
    console.log("begin");
    const browser = await puppeteer.launch({
        executablePath:"chrome\\chrome78-win\\chrome.exe", // 修改为自己的chrome路径
        ignoreDefaultArgs: ["--enable-automation"],
        headless:true
    });

    const page = await browser.newPage();

    await page.evaluateOnNewDocument(() => { //在每个新页面打开前执行以下脚本
        const newProto = navigator.__proto__;
        delete newProto.webdriver;  //删除navigator.webdriver字段
        navigator.__proto__ = newProto;
        // Object.defineProperty(navigator, 'webdriver', {
        //         get: () => undefined,
        // });
        window.chrome = {};  //添加window.chrome字段，为增加真实性还需向内部填充一些值
        window.chrome.app = {"InstallState":"hehe", "RunningState":"haha", "getDetails":"xixi", "getIsInstalled":"ohno"};
        window.chrome.csi = function(){};
        window.chrome.loadTimes = function(){};
        window.chrome.runtime = function(){};
        Object.defineProperty(navigator, 'userAgent', {  //userAgent在无头模式下有headless字样，所以需覆写
                get: () => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36",
        });
        Object.defineProperty(navigator, 'plugins', {  //伪装真实的插件信息
                get: () => [{"description": "Portable Document Format",
                            "filename": "internal-pdf-viewer",
                            "length": 1,
                            "name": "Chrome PDF Plugin"}]
        });
        Object.defineProperty(navigator, 'languages', { //添加语言
                get: () => ["zh-CN", "zh", "en"],
        });
        const originalQuery = window.navigator.permissions.query; //notification伪装
            window.navigator.permissions.query = (parameters) => (
                parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );
    });
      

    await page.goto('https://idas.uestc.edu.cn/authserver/login?service=http%3A%2F%2Feportal.uestc.edu.cn%2Flogin%3Fservice%3Dhttp%3A%2F%2Feportal.uestc.edu.cn%2Fnew%2Findex.html', {
        waitUntil:"networkidle0"
    });

    await page.click('div.dlk-qq');
    await page.waitForSelector('div.lay_login_form');
    let frame = await page.frames()[1];
    await frame.waitForNavigation({waitUntil: "networkidle0"});
    await frame.waitForSelector('#switcher_plogin')
    await frame.click('#switcher_plogin');
    await frame.waitForSelector('#u');
    await frame.type('#u', 'qq'); //qq账号
    await frame.type('#p', 'pswd'); //qq密码
    await frame.click('#login_button');
    await page.waitForNavigation({waitUntil: "networkidle0"});
    // 疫情上报的url可能不同，根据自己情况填入
    await page.goto('your url', {waitUntil:"networkidle0"});
    await page.click('div[data-action="add"]');
    await page.waitForTimeout(2000);
    await page.evaluate(()=>{
        $('#save').click();
    });
    await page.waitForTimeout(2000);
    await page.evaluate(()=>{
        $('a.bh-dialog-btn.bh-bg-primary.bh-color-primary-5').click();
    });
    await page.waitForTimeout(5000);
    await browser.close();
}

report();
