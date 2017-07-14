import React, { Component, PropTypes } from 'react';
import {Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Layout,Menu,Breadcrumb} from 'antd';
import styles from './Managedatum.less';
import auth from '../../utils/auth';
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
  changeUpdateStatus=()=>{
    this.props.dispatch({
      type:'login/changeUpdateStatus'
    })
  }
  clickSave=()=>{
    this.props.dispatch({
      type:'login/userUpdate',
      payload:{
        user:this.props.login.user
      }
    })
    this.props.dispatch({
      type:'login/changeUpdateStatus'
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
  render() {
    return (
          <div>
          <div className="manage">
            <Manageleft/>
            <div className="manright">
              <div className="centerMan">
              <div className="topMan_4">企业资料
              <div className="btndatu">{!this.props.login.updateStatus?<Button className="btn1col" type="dashed" onClick={this.changeUpdateStatus}>编辑</Button>:<Button type="primary" onClick={this.clickSave}>保存</Button>}</div>
              </div>
              <div className="datumBox">
                 <div className="itemleftMan_4">
                    <span>公司名称：</span>
                    <span>公司性质：</span>
                    <span>公司规模：</span>
                    <span>联系人：</span>
                    <span>联系电话：</span>
                    <span>联系地址：</span>
                </div>
                {!this.props.login.updateStatus?<div className="itemrightMan_4">  
                    <p>{this.props.login.user.companyName}</p>
                    <p>{this.props.login.user.companyProperty}</p>
                    <p>{this.props.login.user.companyScale}</p>
                    <p>{this.props.login.user.linkman}</p>
                    <p>{this.props.login.user.tel}</p>
                    <p>{this.props.login.user.address}</p>
                </div>: <div className="itemrightMan_4">
                    <p><Input name="companyName" className="itemInput" value={this.props.login.user.companyName} onChange={this.userChange}/></p>
                    <p><Input name="companyProperty" className="itemInput" value={this.props.login.user.companyProperty} onChange={this.userChange}/></p>
                    <p><Input name="companyScale" className="itemInput" value={this.props.login.user.companyScale} onChange={this.userChange}/></p>
                    <p><Input name="linkman" className="itemInput" value={this.props.login.user.linkman} onChange={this.userChange}/></p>
                    <p><Input name="tel" className="itemInput" value={this.props.login.user.tel} onChange={this.userChange}/></p>
                    <p><Input name="address" className="itemInput" value={this.props.login.user.address} onChange={this.userChange}/></p>
                </div>}
              </div>
             </div>
            </div>
          </div>

          </div> 
    );
  }
};

export default Manage;

 