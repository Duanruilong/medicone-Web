
import React, { Component, PropTypes } from 'react';
import { Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Layout,Menu,Breadcrumb,Modal} from 'antd';
import styles from './Managelist.less';
import {hashHistory} from 'dva/router';
import Manageleft from './Manageleft';

import listimg from '../../assets/list/u416.png';
function confirm(){
  message.success('删除成功')
}
function cancel(){
  message.error('删除失败')
}
const  ButtonGroup = Button.Group;

class Manage extends React.Component{
  componentDidMount(){
    this.props.dispatch({
      type:'need/queryNeed'
    })
  }
  list=() => {
    hashHistory.push({pathname:'/list'})
  };
  index = () => {
    hashHistory.push({pathname:'/'})
  };
  manageitem = (key) => { 
    this.props.dispatch({   
      type:'need/selectneedItem',
      payload:{
        key:key
      }
    })
    hashHistory.push({pathname:'/manageitem'})
  };
  deleteNeed(id){
    this.props.dispatch({
      type:'need/updateNeed',
      payload:{
        id:id,
        status:-1
      }
    })
  }
  // 弹窗
  showManage=()=> {   //ES6传参 payload
    this.props.dispatch({
      type:'need/showManage',
      payload:{
         mangvisible: true,
      }
    });
  }
  handleOk =() => {
    this.props.dispatch({
      type:'need/noshowManage',
      payload:{
        mangvisible: false,
      }
    });
  }
  handleCancel =() =>{
   this.props.dispatch({
    type:'need/noshowManage',
    payload:{
      mangvisible:false
    }
   })
  } 

  render() {
    const columns = [{
  title:'需求编号',
  dataIndex:'number',
  key:'number',
  width:90,
  },{
  title:'需求信息',
  dataIndex:'title',
  key:'title',
  width:170,
  
  },{
    title:'需求预算',
    dataIndex:'budget',
    key:'budget',
    width:100,
  },{
    title:'城市',
    dataIndex:'address',
    key:'address',
    width:90,
  },{
    title:'预计使用时间',
    dataIndex:'lifeTimer',
    key:'lifeTimer',
    width:100,
  },{
    title:'发布时间',
    dataIndex:'createTime',
    key:'createTime',
    width:120,
  },{
    title:'状态',
    dataIndex:'status',
    key:'status',
    width:80,
    render:(text)=>{
      let statusStr='';
      if(text==1){
        statusStr='审核通过';
      }else if(text==2){
        statusStr='审核不通过';
      }else if(text==0){
        statusStr='待审核';
      }else if(text==-1){
        statusStr='已删除';
      }
      return (<div>{statusStr}</div>)
    }
  },{
    title:'操作',
    dataIndex:'operate',
    key:'operate',
    width:90,
    render:(text,record) =>
      <ButtonGroup className="listbtnMan_lis">
        <Button type="primary" onClick={this.showManage} value="large" type="ghost" icon="search"  title="查看详情"/>
        {record.status==-1?'':<Popconfirm icon="star-o" title="确定要删除？" onConfirm={()=>this.deleteNeed(record.id)}><Button value="large" type="primary" title="删除" icon="delete"></Button></Popconfirm>}
      </ButtonGroup> 
  }];
  
  
    const pagination = {    //分页功能
        total:this.props.need.total,
        current:this.props.need.current,
        pageSize: 5,
        onChange: (value)=>{
          this.props.dispatch({
              type: 'need/changeCurrent',
              payload: {current:value}, 
            });
        },
      };
      
      
    return (
          <div>
            <Modal title="需求详情" visible={this.props.need.mangvisible}
              onOk={this.handleOk} onCancel={this.handleCancel}>
              <div className="centerMan_2">
                <div className="topMan_2">需求详情</div>
                <div className="itemleftMan_2">
                    <span>需求编号：</span>
                    <span>需求标题：</span>
                    <span>需求预算：</span>
                    <span>需求地址：</span>
                    <span>预计使用时间：</span>
                    <span>联系人：</span>
                    <span>联系电话：</span>
                    <span>需求说明：</span>
                </div>
                <div className="itemrightMan_2">
                    <p>{this.props.need.clickneedItem.number}</p>
                    <p>{this.props.need.clickneedItem.title}</p>
                    <p>{this.props.need.clickneedItem.budget}</p>
                    <p>{this.props.need.clickneedItem.address}</p>
                    <p>{this.props.need.clickneedItem.lifeTimer}</p>
                    <p>{this.props.need.clickneedItem.linkman}</p>
                    <p>{this.props.need.clickneedItem.username}</p>
                    <p>{this.props.need.clickneedItem.description}</p>
                </div>
             </div>
            </Modal>
          <div className="manageMan">
            <Manageleft/>
            <div className="manrightMan">
              <div className="centerManright">
              <div className="topManright">需求列表</div>
              <Table
                key={`needlists${this.props.need.recordList.id}`} 
                columns={columns} 
                dataSource={this.props.need.recordList} 
                pagination={pagination} 
                scroll={{y:580}}
                />
             </div>
            </div>

          </div>
            
          </div> 
    );
  }
};

export default Manage;

