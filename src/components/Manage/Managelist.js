
import React, { Component, PropTypes } from 'react';
import { Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Layout,Menu,Breadcrumb} from 'antd';
import styles from './Managelist.less';
import {hashHistory} from 'dva/router';
import Manageleft from './Manageleft';
function confirm(){
  message.success('删除成功');
  
}
function cancel(){
  message.error('删除失败')
}

const  ButtonGroup = Button.Group;



class Manage extends React.Component{
  componentDidMount(){
    this.props.dispatch({
      type:'need/querySelfNeed'
    });
    this.props.dispatch({
      type:'banner/querybannerList',
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
  render() {
    const columns = [{
  title:'需求编号',
  dataIndex:'number',
  key:'number',
  width:90,
  // render:text => <a href="##">{text}</a>,
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
    width:130,
    render: (text, record) => {
        return new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ');
    },
  },{
    title:'发布时间',
    dataIndex:'createTime',
    key:'createTime',
    width:130,
    render: (text, record) => {
        return new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ');
    },
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
        <Button onClick = {()=>this.manageitem(record.id)} value="large" type="ghost" icon="search"  title="查看详情"/>
        {record.status==-1?'':<Popconfirm icon="star-o" title="确定要删除？" onConfirm={()=>this.deleteNeed(record.id)}><Button value="large" type="primary" title="删除" icon="delete"></Button></Popconfirm>}
      </ButtonGroup>  
  }];
    const pagination = {
        total:this.props.need.selfTotal,
        current:this.props.need.selfCurrent,
        pageSize: 5,
        onChange: (value)=>{
          this.props.dispatch({
              type: 'need/changeSelfCurrent',
              payload: {current:value}, 
            });
        },
      };
    return (
          <div>
          <div className="manageMan">
            <Manageleft/>
            <div className="manrightMan">
              <div className="centerManright">
              <div className="topManright">需求列表</div>
              <Table
                key={`needlists${this.props.need.selfRecordList.id}`} 
                columns={columns} 
                dataSource={this.props.need.selfRecordList} 
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

