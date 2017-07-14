import React from 'react';
import { Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,} from 'antd';
import styles from './Usertop.less';
import auth from '../../utils/auth';
import {hashHistory} from 'dva/router';

class Usertop extends React.Component{
	componentDidMount(){
	    this.props.dispatch({
	        type:'login/getLocation',
	    });
	    this.props.dispatch({
	    	type:'login/getTellist'
	    })
  	}
	index = () => {
		hashHistory.push({pathname:'/'})
	};
	login =() => {
	    hashHistory.push({pathname:'/login'})
	};
	logup =() => {
	    hashHistory.push({pathname:'/logup'})
	};
	logfit =() => {
	    hashHistory.push({pathname:'/logfit'})
	};
	loginOut=()=>{
		this.props.dispatch({
			type:'login/loginOut'
		})
	}
	list=() => {
	    hashHistory.push({pathname:'/list'})
	};
	manage = () =>{
		hashHistory.push({pathname:'/manage'})
	}
	cityClick(city){
		this.props.dispatch({
	        type:'login/change',
	        payload:{
	        	userLocation:city
	        }
	    })
	}
	render(){


		let isLogin=auth.checkLogin();
		const content = (
		  <div >
		    <p className="header_city"  onClick={()=>this.cityClick("北京市")}>北京市</p>
		    <p className="header_city"  onClick={()=>this.cityClick("上海市")}>上海市</p>
		    <p className="header_city"  onClick={()=>this.cityClick("杭州市")}>杭州市</p>
		    <p className="header_city"  onClick={()=>this.cityClick("成都市")}>成都市</p>
		  </div>
		);
		
		return(
			<div>
				<div className="header_fixed">
	              <div className="header_mid">
	                <div className="header_left">
	                      <span>{this.props.login.userLocation === 'undefined' ?'定位失败':this.props.login.userLocation}</span>
	                      <Popover content={content} trigger="click">
						    <span  style={{paddingLeft:5}} className="city">[切换城市]</span>
						  </Popover>
	                </div>
	                <div className="header_right">
	                  {isLogin ? '':<div><span onClick={this.logup} className="logo">登录</span><i className="header_line"></i><span onClick={this.login} className="logo">注册</span>
	                  <i className="header_line"></i></div>}
	                  {isLogin?<div><span onClick={this.loginOut} className="logo" style={{color:'red'}}>退出登录</span><i className="header_line"></i></div>:''}
	                  <span onClick={this.manage} className="logo">管理中心</span>
	                  <i className="header_line"></i>
	                  <div className="header_phone"><span>客服热线：{this.props.login.Tellist.tel}</span></div>
	                </div>
	              </div>
	            </div>
			</div>
			)
	}
}

export default Usertop;