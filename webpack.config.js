const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//导入在内存中自动生成 index 页面的插件
//创建一个插件的实例对象
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname , 'src/index.html'), //源文件 __dirname表示项目的根目录
    filename: 'index.html'//生成的内存中首页的名称
})

//向外暴露一个打包的配置对象;因为webpack时基于Node构建的，所以webpack支持所有Node API和语法
module.exports = {
    mode: 'development', //development production
    //在webpack4.x中，有一个很大的特性，就是 约定大于配置，默认的打包入口路径是 src -> index.js
    plugins:[
        htmlPlugin
    ],
    module:{
        //所有第三方模块的匹配规则
        rules:[//第三方匹配规则
            {test:/\.js|jsx$/ , use:'babel-loader' , exclude:/node_modules/},//一定要添加exclude排除项
            //可以在css-loader 之后 ， 通过 ？ 追加参数
            //其中，有个固定的参数，叫做 modules，表示为普通的CSS样式表，启用模块化
            {test:/\.css$/ , use:[{loader:'style-loader'} , {loader:'css-loader'}]},//打包处理css样式表的第三方loader

            {test:/\.ttf|woff|woff2|eot|svg$/ , use:'url-loader'},//打包处理 字体文件的loader

            {test:/\.scss$/ , use:[{loader:'style-loader'} , {loader:'css-loader' ,
            options:{modules:{localIdentName:'[path][name]-[local]-[hash:5]'}}} , 
            {loader:'sass-loader'}]},//这是打包处理scss文件的loader
            {test:/\.(jpg|png|gif|bmp|jpeg)/ , use:["url-loader?limit=100&name=[hash:8]-[name].[ext]"]}
        ]
    },
    resolve:{
        extensions:['.js' , '.jsx' , '.json'],//表示这几个文件的后缀名可以不写
        alias:{//表示别名
            '@':path.join(__dirname , 'src')//这样@ 就表示 项目根目录中 src 的这一层路径
        }
    }
}

//目前不行
//export default {}  这是es6 中向外导出模块的API 与之对应的方式 是import ** from '标识符'
//哪些 特性 Node支持？ 如果CHROME浏览器支持哪些，则Node就支持哪些