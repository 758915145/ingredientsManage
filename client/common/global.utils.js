const {remote} = require('electron');
let path= require("path");
console.log(path.join(process.cwd()));
let configDir = remote.app.getPath('userData');
let createFolder = function(to) { //文件写入
    let sep = path.sep;
    to = to.replace(/\\|\//g,sep);
    let folders = path.dirname(to).split(sep);
    let p = '';
    while (folders.length) {

        p += folders.shift() + sep;
        if (!FS.existsSync(p)) {
            FS.mkdirSync(p);
        }
    }
};

window.UTILS = {
    async readData(path){
        //优先读取用户目录
        let result = await UTILS.readJSON(configDir+path);

        //读取失败的话，八成是第一次访问，那么生成目录
        if(!result){
            createFolder(configDir+path);

            //其次读取安装目录
            result = await UTILS.readJSON(PATH+path);

            if(result){
                //保存到用户目录
                UTILS.saveJSON(result).to(configDir+path);
            }
        }

        if(result){
            return result;
        }else{
            $vue.message.error("读取本地数据时发生错误！");
            return {};
        }

    },
    /**
     * 读取JSON数据
     * @param absolutePath <String> 绝对路径
     * @returns {Promise.<Object | undefined>} JSON中的内容
     */
    async readJSON(absolutePath){
        let result;
        await new Promise((resolve)=>{
            FS.readFile(absolutePath,'utf8',(err,data)=>{
                if(err){
                    console.log(err);
                    resolve();
                    return;
                }
                try{
                    result = eval('('+data+')');
                }catch(e){
                    $vue.$message.error("本地数据格式错误！");
                    return;
                }
                resolve();
            });
        });
        return result;
    },

    saveData(obj){
        return {
            /**
             * 传入要保存的路径
             * @param path <String> 路径
             */
            to(path){
                window.UTILS.saveJSON(obj).to(PATH+path);
                window.UTILS.saveJSON(obj).to(configDir+path);
            }
        }

    },

    /**
     * 保存JSON文件
     * @param obj <Object> 要保存的对象
     * @returns {{to: (function(*))}} 返回下一步操作
     */
    saveJSON(obj){
        return {
            /**
             * 传入要保存的路径
             * @param absolutePath <String> 路径
             */
            async to(absolutePath){
                await new Promise((resolve,reject)=>{
                    FS.writeFile(absolutePath,JSON.stringify(obj),(err)=>{
                        if (err){
                            $vue.$message.error("保存本地数据失败");
                            console.log(err);
                            reject();
                        }else{
                            resolve();
                        }
                    });
                });
            }
        }
    }
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
