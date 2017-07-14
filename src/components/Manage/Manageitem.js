
import React, { Component, PropTypes } from 'react';
import { Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Layout,Menu,Breadcrumb} from 'antd';
import styles from './Manageitem.less';
import {hashHistory} from 'dva/router';
import Manageleft from './Manageleft';
class Manage extends React.Component{
  managelist=() => {
    hashHistory.push({pathname:'/managelist'})
  };
  componentDidMount(){
      this.props.dispatch({
            type:'banner/querybannerList',
       }) 
  }
  render() {
     let lifeTimer=this.props.need.clickneedItem.lifeTimer;
     let lifeTimers=new Date(parseInt(lifeTimer)).toLocaleString().replace(/:\d{1,2}$/,' ');
    return (
          <div>
          <div className="manage">
            <Manageleft/>
            <div className="manright">
              <div className="centerMan_2">
              <div className="topMan_2">需求详情 <Button className="btn1item" type="dashed" onClick={this.managelist}>返回需求列表</Button></div>
              <div className="itemleftMan_2">
                  <span>需求编号：</span>
                  <span>需求标题：</span>
                  <span>需求预算：</span>
                  <span>需求地址：</span>
                  <span>使用时间：</span>
                  <span>联系人：</span>
                  <span>联系电话：</span>
                  <span>需求说明：</span>
              </div>
              <div className="itemrightMan_2">
                  <p>{this.props.need.clickneedItem.number}</p>
                  <p>{this.props.need.clickneedItem.title}</p>
                  <p>{this.props.need.clickneedItem.budget}</p>
                  <p>{this.props.need.clickneedItem.address}</p>
                  <p>{lifeTimers}</p>
                  <p>{this.props.need.clickneedItem.linkman}</p>
                  <p>{this.props.need.clickneedItem.username}</p>
                  <p>{this.props.need.clickneedItem.description}</p>
              </div>
             </div>
            </div>
          </div>

          </div> 
    );
  }
};

export default Manage;

