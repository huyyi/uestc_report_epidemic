const config = {
    // 环境与配置
    chrome_exepath: "chrome\\chrome78-win\\chrome.exe", // chrome路径
    headless:false,
    save_screenshot: false, // 是否保存填报成功截图

    // 每日打卡信息
    user_id: "", // 学号
    passwd: "", // 统一认证密码
    

    // 晚点名信息
    name:"",
    id:"",
    lat: 30, // 模拟定位经纬度
    lon: 106
}

module.exports = config