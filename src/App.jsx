import React from 'react';

import {HashRouter , Route , Link} from 'react-router-dom';
import Home from './components/home/Home.jsx';
import Movie from './components/movie/Movie.jsx';
import About from './components/about/About.jsx';

//导入需要的 Ant Design组件
import { Layout, Menu} from 'antd';
const { Header, Content, Footer } = Layout;

//导入模块化的样式
import cssobj from './css/App.scss';
export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
      
        return <HashRouter>
             <Layout className="layout"   style={{height:'100%',width:'100%'}}>
    <Header>
      <div className={cssobj.logo} />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[window.location.hash.split("/")[1]]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="home">
          <Link to="/home">首页</Link>
        </Menu.Item>
        <Menu.Item key="movie">
        <Link to="/movie/in_theaters/1">电影</Link>
        </Menu.Item>
        <Menu.Item key="about">
        <Link to="/about">关于</Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{backgroundColor:'#fff' , flex:1}}>
     <Route path="/home" component={Home}></Route>
     <Route path="/movie" component={Movie}></Route>
     <Route path="/about" component={About}></Route>
    </Content>
    <Footer style={{ textAlign: 'center' }}>电影项目</Footer>
  </Layout>
        </HashRouter>
    }
}