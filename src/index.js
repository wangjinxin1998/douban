//是项目js的打包入口文件
//导入包
import React from 'react';
import ReactDom from 'react-dom';


import App from './App.jsx';

ReactDom.render(
    <App></App>
 , document.getElementById("app"));