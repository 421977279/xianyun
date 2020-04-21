// 单独导入message信息
import {Message} from "element-ui";

// plugins的所有文件都会导入到项目中，并且是全局的
// 类似于在vue项目中的main.js里面的内容，对整个项目都有效

// 拦截axios的错误，插件必须要暴露一个函数
export default nuxt=>{
    // onError在aios请求错误时会触发
    nuxt.$axios.onError(err => {
        console.log(err);
        // err.response是错误对象的详细信息
        const {statusCode, message} = err.response.data;
        
        // 还未使用
        // if(statusCode === 401 || statusCode === 403){
        //     Message.warning({message: "请先登录"});
        //     redirect("/user/login");
        // }

        if(statusCode === 400){
            Message.error(message);
        }
    })
}