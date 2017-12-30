/**
 * Created by chenxuhua on 2017/9/6.
 */

import statisticsLine from "./statistics_line/index.js"
const path = require("path")
const result = statisticsLine({
    workDic: path.resolve(process.cwd(), "src/testdir"),
    "filenameExtension": [".js", ".css"],
    exclude:/sub2/
}).then(function (result) {
    console.log("result=", JSON.stringify(result))
})










