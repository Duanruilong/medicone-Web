import React, { Component, PropTypes } from 'react';
import { Alert,Row, Col,Input,Button,Radio} from 'antd';
import styles from './Logfit.less';
import {hashHistory} from 'dva/router';
import Usertop from '../User/Usertop';
import Loginabout from './Loginabout';
import img from '../../assets/logo1.png';

class Login extends React.Component{
index = () => {
  hashHistory.push({pathname:'/'})
};
logup = () => {
	hashHistory.push({pathname:'/logup'})
};
login = () => {
    hashHistory.push({pathname:'/login'})
};
logfit = () => {
    hashHistory.push({pathname:'/logfit'})
}
componentDidMount(){
    this.props.dispatch({
      type:'login/getTellist'
    })
}
  //input 获取焦点 width: 100%
    inputOnFocus=(e)=>{
        this.props.dispatch({
            type:'login/change',
                payload:{
                loginTelCheck:true,
                }
        })
    }

     //input 失去焦点
    inputOnBlur=(e)=>{
        // 判断电话
          if(!isNaN(e.target.value)){
            // console.log(e.target.value.length)
            if(e.target.value.length==11){
              this.props.dispatch({
                type:'login/change',
                payload:{
                  loginTelCheck:true,
                }
              })
            }else{
              this.props.dispatch({
                type:'login/change',
                payload:{
                  loginTelCheck:false,
                }
              })
            }
          }else{
             this.props.dispatch({
                type:'login/change',
                payload:{
                  loginTelCheck:false,
                }
              })
          }
        if (e.target.value.length==0) {
            this.props.dispatch({
               type:'login/change',
                payload:{
                  loginTelCheck:false,
                }
              })
        }
        if (e.target.value.length>11||e.target.value.length<11) {
            this.props.dispatch({
                type:'login/change',
                payload:{
                    insertUserShowAlert:0
                }
            })
        }
        this.props.dispatch({
            type:'login/userChange',
            payload:{
                key:e.target.name,
                value:e.target.value
            }
        })
    }
  render() {
    let disabled=this.props.login.loginTelCheck?'':'disabled';
    return (
       <div className="max">
       <Usertop {...this.props}/>
       	<div className="boxLogfit">
        	<div className="logoLogfit">
        		<div className="imgLogfit" onClick={this.index}>
        		<img alt="阿斯加加" src={img}/>
	        	</div>
	        	<span className="wellLogfit">忘记密码</span>
        	</div>
        	<div className="telLogfit">
        		<p className="phoneLogfit">客服热线：{this.props.login.Tellist.tel}<br/><span onClick={this.logup}>登陆</span><span onClick={this.login} style={{paddingLeft:15,paddingRight:20}}>注册</span></p>
        	</div>
        </div>

        <div className="centerLogfit">
        	<div className="rowLogfit" >
        		<div className="nameLogfit" >
        			<span>手机号：</span>
        			<Input onBlur={this.inputOnBlur} onFocus={this.inputOnFocus} className="importsLogfit" size="large" placeholder="手机号将作为您的用户名" />
        		</div>
                {!this.props.login.loginTelCheck?<Alert className="inputError" message="请输入11位正确的手机号！" type="error" />:''}
        		<div className="nameLogfit" style={{width:640}}>
        			<span>验证码：</span>
                    <Button>点击发送短信验证码</Button>
        			<Input onChange={this.userChange}  className="importsLogfit" size="large" placeholder="" />
        		</div>
        		<div className="nameLogfit">
        			<span>新密码：</span>
        			<Input onChange={this.userChange} type="password" className="importsLogfit" size="large" placeholder="" />
        		</div>
        		<div className="nameLogfit">
        			<span>确认密码：</span>
        			<Input onChange={this.userChange} type="password" className="importsLogfit" size="large" placeholder="" />
        		</div>
        	</div>
        	<div className="bottomsLogfit">
        		<Button type="primary" disabled={disabled}>确定</Button>
        	</div>
        </div>
        
       <Loginabout/>
      </div>  
    );
  }
};

export default Login;