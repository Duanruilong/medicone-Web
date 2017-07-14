import React, { Component, PropTypes } from 'react';
import { Row, Col,Input,Button,Radio,Alert} from 'antd';
import styles from './Logup.less';
import {hashHistory} from 'dva/router';
import Usertop from '../User/Usertop';
import Loginabout from './Loginabout';
import img from '../../assets/logo1.png';

class Login extends React.Component{

  index = () => {
    hashHistory.push({pathname:'/'})
  };
  tologin=()=>{
    hashHistory.push({pathname:'/login'})
  }

  componentDidMount(){
        this.props.dispatch({
          type:'login/getTellist'
        })
    }  

  login = () => {
  	this.props.dispatch({
         type: 'login/login',
         payload:{
            username:this.props.login.user.username,
            password:this.props.login.user.password
         }
    });
  }
   userChange=(e)=>{
    if (!isNaN(e.target.value)) {
      if (e.target.value.length>11||e.target.value.length<11) {
        this.props.dispatch({
          type:'login/change',
          payload:{
            showMessage:false
          }
        })
      }
    }
    this.props.dispatch({
         type: 'login/userChange',
         payload:{

            key:e.target.name,
            value:e.target.value
         }
    });
  }

  logfit = () => {
    hashHistory.push({pathname:'/logfit'})
  }

  //input 获取焦点 width: 100%
    inputOnFocus=(e)=>{
       // console.log('获取焦点')
    }

     //input 失去焦点
    inputOnBlur=(e)=>{

    }
  render() {
    // let disabled=this.props.login.showMessage?'':'disabled';

    return (
       <div className="max">
       <Usertop {...this.props}/>
       	<div className="boxLogup">
        	<div className="logoLogup">
        		<div className="imgLogup" onClick={this.index}>
        		<img alt="阿斯加加" src={img}/>
	        	</div>
	        	<span className="wellLogup">欢迎登录</span>
        	</div>
        	<div className="telLogup">
        		<p className="phoneLogup">客服热线：{this.props.login.Tellist.tel} <br/><span onClick={this.tologin}>注册</span></p>
        	</div>
        </div>
        <div className="centerLogup">
        	<div className="rowLogup" >
        		<div className="nameLogup" >
        			<span>用户名：</span>
        			<Input onBlur={this.inputOnBlur} onFocus={this.inputOnFocus} className="importsLogup" name="username" size="large" placeholder="手机号码" onChange={this.userChange}/>
        		</div>
            <p className="usertay">{this.props.login.showMessage ? <Alert message="用户名或密码错误" type="error"  /> :'' }</p>
        		<div className="nameLogup">
        			<span>密码：</span>
        			<Input onBlur={this.inputOnBlur} onFocus={this.inputOnFocus} type="password" className="importsLogup" name="password" size="large" placeholder="" onChange={this.userChange}/>
        		</div>
        	</div>
        	<div className="bottomsLogup">
        		<div className="agreeLogup">
        			<Radio>记住密码</Radio>
              <span onClick={this.logfit}>忘记密码</span>
        		</div>
        		<Button type="primary"  onClick={this.login}>登录</Button>
        	</div>
        </div>
        
       <Loginabout/>
      </div>  
    );
  }
};

export default Login;