# 使用node.js+Vue.js+webpack

用node当前端服务器和后台服务器通讯和渲染页面,使用vue,vue-server,vue-router来实现SPA应用.

解决了SPA应用的SEO缺点,访问的第一个页面,使用vue-server来服务端渲染.使用vue-router+webpack实现APP模块懒加载

这只是一个快速开发框架.

### <a href="http://182.92.99.230:3000/cookbook">一个简单的demo</a>

### 注意 vue-server 有一些小BUG,前后端目前还不能用同一个组件,已经提过Issues了,之后会修复这个BUG.

### 1.安装

    npm install

### 2.typescript依赖安装 (需全局安装tsd)

    tsd install

### 3.编译ts文件 (需全局安装tsc)
    tsc

### 4.启动服务

    node server
### 版本 V0.1.1
* 增加env文件

### 版本 V0.1.0
* 分环境webpack打包
* 新增模块化css打包
* 新增车型选择功能
* 新增城市选择功能

### 版本 V0.0.8
* 去除侧边栏 为单独一页
* 新增 搜索页面
* 新增 sui-picker指令

### 版本 V0.0.7
* 去掉vue-resource使用zepto的ajax (兼容性原因)

### 版本 V0.0.6
* 分离service层
* 兼容微信浏览器中Promise.all保错 引入Q.js


### 版本 V0.0.5
新增侧边栏,登陆页面,localStorage缓存

### 版本 V0.0.4
仿网易新闻操作方式(安卓微信中有少许BUG)


# 拿拉勾网数据
1. 先搜索关键字
2. 跳转到结果页 侧栏筛选
3. 无线滚动翻页