const config = {
    user_id: "", // 学号
    passwd: "", // 统一认证密码
    chrome_exepath: "chrome\\chrome78-win\\chrome.exe", // chrome路径
    headless:false,
    retry:2, // 重试次数
    save_screenshot: false, // 是否保存填报成功截图
    send_email: false,
    // 以下为晚点名相关配置
    name:"",
    id:"",
    lat: 30,
    lon: 106
}

module.exports = config