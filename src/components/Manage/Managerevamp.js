import React, { Component, PropTypes } from 'react';
import { Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Layout,Menu,Breadcrumb,Alert} from 'antd';
import styles from './Managerevamp.less';
import auth from '../../utils/auth'
import {hashHistory} from 'dva/router';
import Manageleft from './Manageleft';
class Manage extends React.Component{
  componentDidMount () {
     let user=auth.getUser();
      this.props.dispatch({
         type: 'login/change',
         payload:{
          user:user
         }
      });
      this.props.dispatch({
            type:'banner/querybannerList',
       }) 
  }
  userChange = (e) =>{
        this.props.dispatch({
            type:'login/userChange',
            payload:{
                key:e.target.name,
                value:e.target.value
            }
        })
  }
  submit=()=>{
    let loginUser=auth.getUser();
    let user=this.props.login.user;
    if(loginUser.password!=user.oldPassword){
        this.props.dispatch({
            type:'login/editPasswprdShowAlert',
            payload:{
                key:1
            }
        })
    }else if(user.password!=user.checkPassword){
        this.props.dispatch({
            type:'login/editPasswprdShowAlert',
            payload:{
                key:2
            }
        })
    }else{
      let user={password:this.props.login.user.password}
        this.props.dispatch({
            type:'login/userUpdate',
            payload:{
                user:user
            }
        })
        this.props.dispatch({
            type:'login/editPasswprdShowAlert',
            payload:{
                key:3
            }
        })
        let newUser=auth.getUser();
        this.props.dispatch({
           type: 'login/change',
           payload:{
            user:newUser
           }
        });
    }
  }
  render() {
    return (
          <div>
          <div className="manage">
            <Manageleft/>
            <div className="manright">
              <div className="centerMan">
              <div className="topMan_5">修改密码</div>
              {this.props.login.editPasswprdShowAlert==3?<Alert message="保存新密码成功" type="success" />:''}
              {this.props.login.editPasswprdShowAlert==1?<Alert message="旧密码输入不正确" type="error" />:''}
              {this.props.login.editPasswprdShowAlert==2?<Alert message="两次输入到新密码不相同" type="error" />:''}
              <div className="itemleftMan_5">
                  <span>用户名：</span>
                  <span>旧密码：</span>
                  <span>新密码：</span>
                  <span>确认密码：</span>
              </div>
              <div className="itemrightMan_5">
                  <p>{this.props.login.user.username}</p>
                  <p><Input size="large" style={{fontSize:14}} name="oldPassword" onChange={this.userChange}/></p>
                  <p><Input size="large" style={{fontSize:14}} name="password" onChange={this.userChange}/></p>
                  <p><Input size="large" style={{fontSize:14}} name="checkPassword" onChange={this.userChange}/></p>
              <Button className="btnMan_5" type="primary" onClick={this.submit}>确定</Button>
              </div>
             </div>
            </div>
          </div>

          </div> 
    );
  }
};

export default Manage;

 