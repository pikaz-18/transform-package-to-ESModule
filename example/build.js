const path = require("path");
const build = require("../build");
build({
  jsPath: path.join(__dirname, "exampleAddCore.js"), //需打包的js文件路径
  keys: ["exampleAdd"], //打包的js文件挂载在window上的对象key，可传入多个，若无挂载则不传
  outPath: path.join(__dirname, "exampleAdd.js"), //打包js文件导出路径
});
