import React from 'react';
import { Spin, Alert } from 'antd';
import fetchJSONP from 'fetch-jsonp';
import MovieItem from './MovieItem.jsx';
import { Pagination } from 'antd';


export default class MovieList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
                movies:[], //电影列表
                nowPage:parseInt(props.match.params.page)||1 ,//当前展示第几页的数据
                pageSize:12, //每页显示多少条数据
                total:0,//当前电影分类下，共有多少条数据 
                isloading:true, //数据是否正在加载，如果为true表示正在加载数据
                movieType:props.match.params.type //保存一下 要获取的电影类型
        }
    }

    componentWillMount(){
        // fetch('').then(response => {//当使用fetch API来获取数据的时候，第一个 then中，获取不到数据
        //     //第一个.then 中拿到的是一个response对象，我们可以调用response.json()得到一个新的promise
        //     // console.log(response)
        //     return response.json()

        // })
        // .then(data => {
        //     console.log(data);
        // })
        this.loadMovieListByTypeAndPage();
        // setTimeout(() => {
        //     this.setState({
        //         isloading:false
        //     })
        // } , 2000)
    }
    render(){
        return <div>
           {this.renderList()}
        </div>
    }

    loadMovieListByTypeAndPage = () => {
        //注意：默认的window.fetch受到跨域限制，无法直接使用，这时候，我们 使用第三方包
        //fetch-jsonp 来发送 JSONP请求，它的用法和浏览器内置的fetch 完全兼容
        // fetch('https://douban.uieee.com/v2/movie/in_theaters')
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        // })
        //开始获取 数据的索引
        const start = this.state.pageSize*(this.state.nowPage -1);
        const url = 
        `https://api.douban.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}&apikey=0b2bdeda43b5688921839c8ecb20399b`;
        fetchJSONP(url)
        .then(response => response.json())
        .then(data => {
           this.setState({
               isloading:false, //将loading效果隐藏
               movies:data.subjects, //为电影列表赋值
               total:data.total //把总条数，保存到state上

           })
        })

        // const data = require('../test_data/in_theaters.json');
        // setTimeout(() => {
        //     this.setState({
        //         isloading:false, //将loading效果隐藏
        //         movies:data.subjects, //为电影列表赋值
        //         total:data.total //把总条数，保存到state上
        
        //     })
        // } , 2000)
    }
    //组件将要接收新属性
    componentWillReceiveProps(nextProps){
        //每当地址栏变化的时候，重置state中的参数项，重置完毕之后，可以重新发起请求
        this.setState({
            nowPage:parseInt(nextProps.match.params.page)||1 ,//当前展示第几页的数据
            isloading:true, //表示又要重新加载电影数据
            movieType:nextProps.match.params.type //保存一下 要获取的电影类型
        } , function(){
            this.loadMovieListByTypeAndPage();
        })
        
    }
    renderList = () => {
        if(this.state.isloading){//正在加载中
            return  <Spin tip="Loading...">
            <Alert
              message="正在请求电影列表，精彩内容马上呈现"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
        }else{
            //加载完成
            return <div style={{backgroundColor:'white'}}>
                <div style={{display:'flex' , flexWrap:'wrap'}}>
            {
                this.state.movies.map(item => <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>)
            }

            </div>
            {/* 分页 */}
          <Pagination onChange={this.pageChanged} defaultCurrent={this.state.nowPage} pageSize={this.state.pageSize} total={this.state.total}/>
            </div>
        }
    }

    //当页码改变的时候，加载新一页的数据
    pageChanged = (page) => {
        //由于我们手动使用BOM对象，实现了跳转，最好使用路由的方法，进行编程式的导航
        // window.location.href = '/#/movie/' + this.state.movieType+'/' + page;
        //使用 react-router-dom进行编程式的导航
        this.props.history.push('/movie/' + this.state.movieType + '/' + page);
    }
}

//在React 中，我们可以使用 fetch API 来获取数据，fetch API是基于 Promise封装的
