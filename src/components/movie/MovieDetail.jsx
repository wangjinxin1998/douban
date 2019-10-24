import React from 'react';
import { Button, Icon } from 'antd';
import fetchJSONP from 'fetch-jsonp';
import { Spin, Alert } from 'antd';
export default class MovieDetail extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            info:{},//电影信息对象
            isloading:true
        };
    }
    UNSAFE_componentWillMount(){
        fetchJSONP('https://api.douban.com/v2/movie/subject/'+this.props.match.params.id+'?apikey=0b2bdeda43b5688921839c8ecb20399b').then(res => res.json()).then(data => {
            // console.log(data)
            // console.log(data.images.small)
            this.setState({
                info:data
            } ,function(){
                this.setState({
                    isloading:false
                })
            })
        })
    }
    render(){
        return <div>
             <Button type="primary" onClick={this.goBack}>
            <Icon type="left" />
            返回电影列表页面
          </Button>
           {this.renderInfo()}
        </div>
    }
    goBack = () => {
        this.props.history.go(-1);//实现返回按钮的功能
    }
    renderInfo = () => {
        if(this.state.isloading){
           return  <Spin tip="Loading...">
            <Alert
              message="正在请求电影详情，精彩内容马上呈现"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
        }else{
            return  <div style={{textAlign:'center' , backgroundColor:'white'}}>
            
            <h1>{this.state.info.title}</h1>
             <img src={this.state.info.images.large}/> 
            <p style={{textIndent:'2em' , lineHeight:'30px'}}>{this.state.info.summary}</p>
            </div>
        }
    }
}