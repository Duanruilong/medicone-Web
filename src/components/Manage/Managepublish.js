import React, { Component, PropTypes } from 'react';
import { Alert,Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Layout,Menu,Breadcrumb,DatePicker,message,Dropdown,Select,InputNumber,} from 'antd';
import styles from './Managepublish.less';
import {hashHistory} from 'dva/router';
import Manageleft from './Manageleft';
const { MonthPicker, RangePicker } = DatePicker;
const InputGroup = Input.Group;
const Option = Select.Option;

class Manage extends React.Component{
  list=() => {
    hashHistory.push({pathname:'/list'})
  };
  index = () => {
    hashHistory.push({pathname:'/'})
  };
  componentDidMount(){
       this.props.dispatch({
            type:'banner/querybannerList',
       }) 
  }
  onChange=(date,dateString)=>{
    this.props.dispatch({
      type:'need/needItemChange',
      payload:{
        key:'lifeTimer',
        value:dateString
      }
    })
  }
  requirementChange=(e)=>{
    if(e.target.name=='budget'){
      if(!isNaN(e.target.value)){
       this.props.dispatch({
          type:'need/querySuccess',
          payload:{
            insertNeedBudGetCheck:true,
          }
        })
      }else{
         this.props.dispatch({
            type:'need/querySuccess',
            payload:{
              insertNeedBudGetCheck:false,
            }
          })
      }
    }
    if(e.target.name=='tel'){
      if(!isNaN(e.target.value)){
        if(e.target.value.length==11){
          this.props.dispatch({
            type:'need/querySuccess',
            payload:{
              insertNeedTelCheck:true,
            }
          })
        }else{
          this.props.dispatch({
            type:'need/querySuccess',
            payload:{
              insertNeedTelCheck:false,
            }
          })
        }
      }else{
         this.props.dispatch({
            type:'need/querySuccess',
            payload:{
              insertNeedTelCheck:false,
            }
          })
      }
    }
    this.props.dispatch({
      type:'need/needItemChange',
      payload:{
        key:e.target.name,
        value:e.target.value
      }
    })
  }
  submitNeed=()=>{
    this.props.dispatch({
      type:'need/inserNeed',
      payload:{
        needItem:this.props.need.clickneedItem
      }
    })
  }

  render() {
    let disabled=this.props.need.insertNeedBudGetCheck&&this.props.need.insertNeedTelCheck?'':'disabled';
    return (
          <div>
          <div className="manage">
            <Manageleft/>
            <div className="manright">
              <div className="centerMan_3">
              <div className="topMan_3">发布需求</div>
              {!this.props.need.insertNeedBudGetCheck?<Alert message="需求预算只能输入数字！" type="error" />:''}
              {!this.props.need.insertNeedTelCheck?<Alert message="请输入11位有效电话！" type="error" />:''}
              <div className="itemleftMan_3">
                  <span>需求标题：</span>
                  <span>需求预算：</span>
                  <span>需求地址：</span>
                  <span>使用时间：</span>
                  <span>联系人：</span>
                  <span>联系电话：</span>
                  <span>需求说明：</span>
              </div>
              <div className="itemrightMan_3">
                  <p><Input type="text" size="large" placeholder="请输入标题"  name="title" style={{fontSize:14}} onChange={this.requirementChange}/></p>
                  <p><Input type="text" size="large" placeholder="请输入数字" name="budget" style={{fontSize:14}}  onChange={this.requirementChange}/></p>
                  <p style={{width:600}}>
                      <Input style={{ width: '50%' }} placeholder="请输入地址" name="address" onChange={this.requirementChange}/>
                  </p>
                  <p style={{width: 200}}><DatePicker onChange={this.onChange}/></p>
                  <p><Input size="large" placeholder="请输入联系人" style={{fontSize:14}} name="linkman" onChange={this.requirementChange}/></p>
                  <p><Input size="large" placeholder="请输入联系电话" style={{fontSize:14}} name="tel" onChange={this.requirementChange}/></p>
                  <p style={{width:420}}><Input size="large" type="textarea" placeholder="具体需求说明" autosize={{minRows:4,maxRows:8}} style={{fontSize:14,marginTop:10,width:420}} name="description" onChange={this.requirementChange}/></p>
                  <Button className="btnMan_3" type="primary" onClick={this.submitNeed} disabled={disabled}>发布</Button>
              </div>
             </div>

            </div>
          </div>

          </div> 
    );
  }
};

export default Manage;

