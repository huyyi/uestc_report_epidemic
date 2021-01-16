# 每日疫情上报和晚点名脚本

使用`Puppetree`控制Chrome实现自动每日疫情上报和晚点名，仅测试信通研究生的，其他的请自己修改，都是简单的JQuery选择器语法

## 介绍

check_name.js：晚点名，仅测试信通研究生，需修改为自己的姓名与学号

report_demic.js：每日疫情上报，使用QQ登陆服务大厅，因此需先绑定QQ号


## 使用方法
1. 安装`Node.js`
2. `npm install`
3. 在[此处](https://npm.taobao.org/mirrors/chromium-browser-snapshots/Win_x64/)下载 Chrome，要求版本低于87.*,放到 `./Chrome/`
4. 修改脚本中个人的相关信息
5. 运行`node filename.js`
