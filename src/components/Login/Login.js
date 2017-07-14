import React, { Component, PropTypes } from 'react';
import { Row, Col,Input,Button,Radio,Alert,Form,Tooltip, Icon, Cascader, Select, Checkbox} from 'antd';
import styles from './Login.less';
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
    }
    componentDidMount(){
        this.props.dispatch({
          type:'login/getTellist'
        })
    }   
    userChangepassword = (e) =>{
        this.props.dispatch({
            type:'login/userChange',
            payload:{
                key:e.target.name,
                value:e.target.value
            }
        })
    }
    logon=()=>{
        let user=this.props.login.user;
        if(user.password!=user.checkPassword){
            this.props.dispatch({
                type:'login/editInsertUserShowAlert',
                payload:{
                    key:1
                }
            })
        }else{
            this.props.dispatch({
                type:'login/userInsert',
                payload:{
                    username:this.props.login.user.username,
                    password:this.props.login.user.password
                }
            })
        }
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
       <div className="maxLogin">
       <Usertop {...this.props}/>
       	<div className="boxLogin">
        	<div className="logoLogin">
        		<div className="imgLogin" onClick={this.index}>
        		<img alt="阿斯加加" src={img}/>
	        	</div>
	        	<span className="wellLogin">欢迎注册</span>
        	</div>
        	<div className="telLogin">
        		<p className="phoneLogin">客服热线：{this.props.login.Tellist.tel} <br/>已有账号，<span onClick={this.logup}>马上登陆</span></p>
        	</div>
        </div>
        <div className="centerLogin">
        	<div className="rowLogin" >
        		<div className="nameLogin" >
        			<span>手机号：</span>
        			<Input onBlur={this.inputOnBlur} onFocus={this.inputOnFocus}  className="importsLogin" name="username"  size="large" placeholder="手机号将作为您的用户名" />
                </div>
                {!this.props.login.loginTelCheck?<Alert className="inputError" message="请输入有效手机号！" type="error" />:''}
                <p className="usertay">{this.props.login.insertUserShowAlert==2 ?<Alert  message="该账户已存在!" type="error" />:''}</p>
        		<div className="nameLogin" style={{width:640}}>
        			<span>验证码：</span>
                    <Button>点击发送短信验证码</Button>
        			<Input className="importsLogin" name="verification" onChange={this.userChangepassword} size="large" placeholder="" />
        		</div>
        		<div className="nameLogin">
        			<span>设置密码：</span>
        			<Input type="password" name="password" className="importsLogin" onChange={this.userChangepassword} size="large" placeholder="" />
        		</div>
                <p className="usertay">{this.props.login.insertUserShowAlert==1 ?<Alert message="两次输入到新密码不相同" type="error" />:''}</p>
        		<div className="nameLogin">
        			<span>确认密码：</span>
        			<Input type="password" name="checkPassword" className="importsLogin" onChange={this.userChangepassword} size="large" placeholder="" />
        		</div>
                <p className="usertay">{this.props.login.insertUserShowAlert==1 ?<Alert  message="两次输入到新密码不相同" type="error" /> :''}</p>
        	</div>
        	<div className="bottomsLogin">
        		<div className="agreeLogin">
        			<Radio >我已阅读并同意 <span>《阿斯加加平台服务协议》</span>
					</Radio>
        		</div>
        		<Button onClick={this.logon} type="primary" disabled={disabled}>注册</Button>
        	</div>
            
        </div>
        
       <Loginabout/>
      </div>  
    );
  }
};

export default Login;