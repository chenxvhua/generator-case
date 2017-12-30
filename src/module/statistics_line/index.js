/**
 * Created by chenxuhua on 2017/9/6.
 */


const path = require("path")
const fse = require('fs-extra')
const os = require('os')


let splitSymbol=os.EOL
let re = new RegExp(splitSymbol,"g");

//console.log("splitSymbol=",splitSymbol.length)

export default   async function statisticsLine({ workDic = __dirname,  filenameExtension = null, include = null,exclude = null}={}) {
    try {
        //console.log("workDic",workDic);
        const globPromise = require("glob-promise")
        //extensions: ['.js', '.vue', '.json'],
        let returnObj=[];
        let pattern="**/*.*";
        if(filenameExtension && filenameExtension.length){
            // pattern="**/*(.js|.vue)"
            pattern="**/*"+"["+filenameExtension.join(",")+"]"
        }

        //console.log("pattern",pattern)

        let files=await globPromise(pattern, {
            cwd: workDic,
            absolute: false
        })


        for(let i=0;i<files.length;i++){
            let file=files[i]
            if(include && !include.test(file)){
                continue
            }
            if(exclude && exclude.test(file)){
                continue
            }
            let tempObj={}
            //console.log("目录=",path.resolve(workDic, file))
            let codeContent=await fse.readFile(path.resolve(workDic, file),'utf8')

            let matches_array = codeContent.match(re)||[]
            let lines=matches_array.length
            let endIsExistEOL=codeContent.substring(codeContent.length-splitSymbol.length)===splitSymbol
            if(!endIsExistEOL)lines++
            //console.log(file,lines)
            tempObj["filePath"]=file
            tempObj["lines"]=lines
            returnObj.push(tempObj)
        }
        console.log("分析文件行数成功");
        return returnObj

    } catch(e) {
         console.log("分析文件行数失败",e);
    }
}







