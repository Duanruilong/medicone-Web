import React from 'react';
import { Anchor,Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,} from 'antd';
import styles from './Usercent.less';
import {hashHistory} from 'dva/router';

const { Link } = Anchor;


const Search = Input.Search;
class Usercent extends React.Component{
	index = () => {
		hashHistory.push({pathname:'/index'})
	};
	list=() => {
	    hashHistory.push({pathname:'/list'})
	  };
	supply = () => {
		hashHistory.push({pathname:'/supply'})
	};
	managepublish=() =>{
	    hashHistory.push({pathname:'/managepublish'})
	};
	searchProduct=(e)=>{
		hashHistory.push({pathname:'/list'});
		this.props.dispatch({
			type:'product/changeSearchStr',
			payload:{
				searchStr:e
			}
		})
	}
	render(){
	return(
		<div>
            <div className="nav_content">
              <div className="nav_content_main">
                <div onClick={this.index} className="nav_left">
                    <i className="index_logo"></i>
                </div>
                <div className="nav_main">
                  <div onClick={this.index} className="nav_main_list">
                      <span className="nav_main_list_home">首页</span>
                  </div>
                  <div className="nav_main_list">
                      <span onClick={this.list} className="nav_main_list_list">设备库</span>
                  </div>
                  <div  className="main_list">
	                     <Anchor affix={false}>
	                     	 <Link href="#link" title="合作伙伴">
	                     	 </Link>
	                      </Anchor>
	              </div>
                </div>
                <div className="nav_btn">
                    <Button onClick={this.managepublish}>免费发布需求</Button>
                </div>
                <div className="nav_search">
                   <Search placeholder="输入要搜索的器械" onSearch={this.searchProduct}/>
                </div>
              </div>
            </div>
		</div>
		)
	}
}

export default Usercent;