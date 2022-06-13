const express = require('express');
const fs = require('fs');
// const router = express.Router();
const sourceMap = require('source-map');
const path = require('path');
const app = express();
const port = 3000;
const resolve = (file) => path.resolve(__dirname, file);
// 定义post接口
app.get('/error/', async function (req, res) {
  // 获取前端传过来的报错对象
  let error = JSON.parse(req.query.error);
  let url = error.scriptURI; // 压缩文件路径
  if (url) {
    // console.log(
    //   '[ 🐻 ]',
    //   `${url.substring(url.lastIndexOf('/') + 1).trim()}.map`
    // );
    let fileUrl = `${url.substring(url.lastIndexOf('/') + 1).trim()}.map`; // map文件路径
    // 解析sourceMap
    let consumer = await new sourceMap.SourceMapConsumer(
      fs.readFileSync(resolve('./' + fileUrl), 'utf8')
    ); // 返回一个promise对象
    // 解析原始报错数据
    let result = consumer.originalPositionFor({
      line: error.lineNo, // 压缩后的行号
      column: error.columnNo, // 压缩后的列号
    });
    console.log(result);
    res.json(result);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
