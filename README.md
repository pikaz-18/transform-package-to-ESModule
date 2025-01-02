## 介绍

现有部分前端依赖库仅支持通过 `<script>` 标签引入，尚未提供对 ESModule (ECMAScript 模块) 的原生支持。本项目可将这些库/代码转化为能够以 ESModule 形式被导入和使用，同时保持原有的功能性和兼容性，从而快速兼容至 vite 等现代打包器。

## [demo 打包代码配置点击这里 copy](https://github.com/pikaz-18/transform-package-to-ESModule/blob/master/example/build.js)

## [demo 使用打包产物代码点击这里查看](https://github.com/pikaz-18/transform-package-to-ESModule/blob/master/example/index.html)

npm run build 可测试打包，npm run test 可查看打包效果

## 效果示例

源 js 文件（无 ESModule 支持）

```js
const add = (a, b) => a + b;
window.exampleAdd = add;
```

打包后引入

```js
import { exampleAdd } from "./exampleAdd.js";
const result = exampleAdd(1, 2);
console.log(result);
```

## 安装

### with npm or yarn

```bash
yarn add @pikaz/transform-package-to-ESModule

npm i -S @pikaz/transform-package-to-ESModule
```

## 使用说明

### 打包 js 文件（推荐）

#### 打包配置[示例 build.js](https://github.com/pikaz-18/transform-package-to-ESModule/blob/master/example/build.js)

```js
const path = require("path");
const build = require("@pikaz/transform-package-to-ESModule");
build({
  jsPath: path.join(__dirname, "exampleAddCore.js"), //需打包的js文件路径
  keys: ["exampleAdd"], //打包的js文件挂载在window上的对象key，可传入多个，若无挂载对象则传null或不传（打包产物会自动导出这些对象）
  outPath: path.join(__dirname, "exampleAdd.js"), //打包js文件导出路径
  //也可以选择传入jsCore不打包js文件而是直接打包js代码，不推荐，js代码可能存在问题字符导致打包文件错误
  //jsCore: "const exampleAdd= (a,b)=>a+b; window.exampleAdd=exampleAdd;",
});
```

执行 node build.js 进行打包，得到打包文件 exampleAdd.js

#### 使用打包文件[示例 index.html](https://github.com/pikaz-18/transform-package-to-ESModule/blob/master/example/index.html)

```js
// 打包产物导出对象取决于打包配置的keys
import { exampleAdd } from "./exampleAdd.js";
const result = exampleAdd(1, 2);
console.log(result);
```

### 打包 js 代码并导出（不推荐）

```js
import createModule from "@pikaz/transform-package-to-ESModule/createModule";
const { exampleAdd } = createModule({
  keys: ["exampleAdd"], //打包的js文件挂载在window上的对象key，可传入多个，若无挂载对象则传null或不传（打包函数会自动导出这些对象）
  jsCore: "const exampleAdd= (a,b)=>a+b;window.exampleAdd=exampleAdd;", //js代码
});
// 使用exampleAdd函数
const result = exampleAdd(1, 2);
console.log(result);
```
