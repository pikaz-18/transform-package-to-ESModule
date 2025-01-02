const fs = require("fs");
const path = require("path");
const { compressToEncodedURIComponent } = require("lz-string");

/**
 * @description: 打包
 * @param {*} jsCore/js代码字符串
 * @param {*} jsPath/js文件路径
 * @param {*} keys/导出对象key数组
 * @param {*} outPath/打包文件输出路径
 * @return {*}
 */
const createModule = ({ jsCore, jsPath, keys, outPath }) => {
  let jsStr = jsCore || "";
  if (jsPath) {
    jsStr = fs.readFileSync(jsPath, "utf-8");
  }
  const compress = compressToEncodedURIComponent(jsStr);
  const fuc = fs.readFileSync(path.join(__dirname, "createModule.js"), "utf-8");
  const keysList = keys
    ? `[${keys.map((item) => `"${item}"`).join(",")}]`
    : null;
  const modultList = keys
    ? keys.map((item) => `export const ${item}=esmodule.${item}`).join(";") +
      ";"
    : "";
  const fucStr = fuc.replace(
    "export default createModule;",
    `const esmodule = createModule({ jsCore:"${compress}", keys:${keysList}, lz: true }); ${modultList}export default esmodule;`
  );
  fs.writeFileSync(
    outPath || path.join(__dirname, "output.js"),
    fucStr,
    "utf-8"
  );
};

module.exports = createModule;
