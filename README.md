# Vue Picker 控件

## 使用

```
git clone https://github.com/965283058/vue-picker.git // 从仓库上拉取代码
cd vue-picker                                      // 进入项目
npm i                                              // 安装依赖
npm start [port]                                   // 启动项目，参数 port 代表端口，默认是 8080
```

## 依赖

Vue

Vue-router

Vue-resource

## 前端服务器配置

### 端口配置

```
打开 webpack.dev.conf.js 文件，找到 port 字段，默认是 8080
修改为任意端口，重新 npm start 即可用新的端口访问前端服务器
```



## 目录结构

```
/xloan－h5
├── node_modules // 项目依赖包
├─┬ src
│ ├── components // 组件
│ ├── pages // 页面
│ ├── router // 路由
│ ├── App.vue // 主文件
│ └── entry.js // 启动文件，给 webpack 使用
├── index.html // 承载各页面的容器
├── package.json // 项目配置文件
├── webpack.dev.conf.js // webpack 开发时规则
└── webpack.prod.conf.js // webpack 打包时规则
```


