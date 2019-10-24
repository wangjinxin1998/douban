import React from 'react';
import { Layout, Menu, Icon } from 'antd';


const {  Content, Sider } = Layout;

//导入路由相关的组件
import {Link ,Route,Switch} from 'react-router-dom';
import MovieList from './MovieList.jsx';

import MovieDetail from './MovieDetail.jsx';
export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            routeParams:props.match.params
        }
    }

    render(){
       
        //从路由规则中，提取匹配到的数据，可以使用，this.props.match.params.***
        return <Layout style={{height:'100%',width:'100%'}}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.hash.split("/")[2]]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
           
              <Menu.Item key="in_theaters">
                <Link to="/movie/in_theaters/1">正在上映</Link>
              </Menu.Item>
              <Menu.Item key="coming_soon">
              <Link to="/movie/coming_soon/1">即将上映</Link>
              </Menu.Item>
              <Menu.Item key="top250">
                <Link to="/movie/top250/1">Top250</Link>
              </Menu.Item>
             
          </Menu>
        </Sider>
        <Layout style={{ borderLeft:'1px solid #ccc' , backgroundColor:'white'}}>
          
          <Content
            style={{
              background: 'white',
              padding: 10,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* 为路由启用了精确匹配模式，也会从上到下，把所有的路由规则匹配一遍 */}
            {/* 使用路由中的Switch组件，能够指定，如果前面的路由规则有限匹配到了
              则放弃后续的路由匹配
            */}
            <Switch>
              <Route exact path="/movie/detail/:id" component={MovieDetail}></Route>
               <Route exact path="/movie/:type/:page" component={MovieList}></Route>
            
            </Switch>
            
          </Content>
        </Layout>
      </Layout>
       
    }
}