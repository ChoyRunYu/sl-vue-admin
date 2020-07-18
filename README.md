## 广大华软社团联合会官网后台前端

> 这是广大华软社团联合会官网后台前端，在**[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)**的基础上进行的二次开发，只完成了部分大功能。

## 目录

```
├── build					# 构建相关
├── mock					# 项目mock 模拟数据
├── public					# 静态资源
│	├── index.html			        # html模板
│	└── favicon.ico			        # favicon图标
├── src						# 源代码
│	├── api					# 所有请求
│	├── assets				# 主题 字体等静态资源
│	├── components			        # 全局公用组件
│	├── icons				# 项目所有svg icons
│	├── layout				# 全局layout布局
│	├── router				# 路由
│	├── store				# 全局store管理
│	├── styles				# 全局样式
│	├── utils				# 全局工具类
│	├── views				# views所有页面
│	├── App.vue				# 入口页面
│	├── main.js				# 入口文件
│	├── permission.js		        # 权限管理
│	└── setting.js			        # 网站配置信息文件
├── tests					# 测试
├── .editorconfig			        # editor配置文件
├── .env.xxx				        # 环境变量配置
├── .eslintignore			        # eslint忽略配置项
├── .eslintrc.js			        # eslint配置项
├── .travis.yml				        # 自动化CI配置
├── babel.config.js			        # babel配置文件
├── jest.config.js			        # jest配置文件
├── jsconfig.json			        # js配置文件
├── postcss.config.js		                # postcss配置
├── vue.config.js			        # vue-cli相关配置文件
├── package.json			        # package.json
└── package-lock.js			        # package-lock.json
```

## 安装

```
# 需要安装node环境和npm包管理工具

# 克隆项目
git clone https://github.com/ChoyRunYu/sl-vue-admin.git

# 进入目录
cd sl-vue-admin

# 安装依赖
npm install

# 本地开发，运行项目
npm run dev
```

## 打包

```
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其他

```
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

