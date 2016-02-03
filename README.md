# 使用node.js+Vue.js+webpack

用node当前端服务器和后台服务器通讯和渲染页面,使用vue,vue-server,vue-router来实现SPA应用.

解决了SPA应用的SEO缺点,访问的第一个页面,使用vue-server来服务端渲染.使用vue-router+webpack实现APP模块懒加载

这只是一个快速开发框架.

### <a href="http://182.92.99.230:3000/cookbook">一个简单的demo</a>

### 注意 vue-server 有一些小BUG,前后端目前还不能用同一个组件,已经提过Issues了,之后会修复这个BUG.

### 1.安装

    npm install

### 2.typescript依赖安装

    tsd install

### 3.启动服务

    node server