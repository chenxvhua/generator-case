/**
 * Created by chenxuhua on 2017/9/6.
 */


// 工具类库：
// 1.执行一个函数，可以统计当前项目中源代码目录下所有代码文件的行数。
// 函数需要允许使用者指定源代码目录的位置，文件后缀，排除的文件等等。
// 函数的返回值是一个数组，数组中每一项都是一个对象，对象中应包含属性为：1）文件路径（相对于项目）2）该文件统计行数


// DOS/Windows系统采用CRLF(即回车+换行)表示下一行 \r\n
// Linux/UNIX系统采用LF表示下一行 \n
// MAC系统采用CR表示下一行 \r

const path = require("path")
const fse = require('fs-extra')
const platform=process.platform
//DOS为CRLF，UNIX为LF，MAC为CR
//'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
let splitSymbol=/\n/g
if(platform==="ios"){
    splitSymbol=/\r/g
}
else if(platform.indexOf("win")>-1){
    splitSymbol=/\r\n/g
}


export default  function statisticsLine({ workDic = __dirname,  filenameExtension = null, include = null,exclude = null}={}) {
    console.log("workDic",workDic);
    const globPromise = require("glob-promise")
    //extensions: ['.js', '.vue', '.json'],
    let pattern="**/*.*";
    if(filenameExtension && filenameExtension.length){
        // pattern="**/*(.js|.vue)"
        pattern +="("+filenameExtension.join("|")+")";
    }
    globPromise(pattern, {
        cwd: workDic,
        absolute: false
    }).then(function (files) {
        files.forEach(function (file) {
            async function  statisticsFunc() {
                console.log("目录=",path.resolve(workDic, file));
                let codeContent=await fse.readFile(path.resolve(workDic, file),'utf8')

               var matches_array = codeContent.match(splitSymbol)||[];
                console.log(file,matches_array.length);
               // console.log("分析文件行数成功", codeContent);
            }
            statisticsFunc();
        })
    }).catch(function (error) {
        console.log("分析文件行数失败", error);
    })
}





