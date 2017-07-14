import React, { Component, PropTypes } from 'react';
import { Pagination,Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Layout,Menu,Breadcrumb} from 'antd';
import styles from './Manage.less';
import {hashHistory} from 'dva/router';
import Manageleft from './Manageleft';

const ButtonGroup = Button.Group;

class Manage extends React.Component{

  componentDidMount(){
    this.props.dispatch({
            type:'banner/querybannerList',
    })
    this.props.dispatch({
            type:'product/getCollectProductList',
            payload:{
              pageNum:this.props.product.collectCurrent,
            }
    }) 
  }
  collect(id){    //收藏
    this.props.dispatch({
      type:'product/intCollectlist',
      payload:{
        id:id
      }
    })
  }
  deleteCollect(id){   //取消收藏
    this.props.dispatch({
      type:'product/deleteCollectlist',
      payload:{
        id:id
      }
    })
  }
  changeCurrent=(current)=>{
    this.props.dispatch({
      type:'product/getCollectProductList',
      payload:{
        pageNum:current
      }
    })
  }
  // 列表进详情
  listitem = (key) => {
    hashHistory.push({
      pathname:'/listitem',
      query:{
        id:Math.floor(Math.random() * 999999)+'o'+key
      }
    })
  }
  render() {
    
    return (
          <div>
          <div className="manageMan1">
            <Manageleft/>
            <div className="manrightMan1">
              <div className="centerMan1">
              <div className="titleMan1">收藏列表</div>
              <div className="listnumMan">
                {this.props.product.collectList.length > 0 ? this.props.product.collectList.map((item,int) =>{
                    let rentType = JSON.parse(item.rentType);
                    let showImages=JSON.parse(item.showImages);
                    return (
                     <ul key={int} className="listitemMan" >
                        <div className="listimgMan">
                          <img alt="阿斯加加·医疗设备一站式集成服务，牙科设备" src={showImages[0].url}/>
                        </div>
                        <div className="listmainMan_box" >
                            <span className="listmainMan_title">{item.name}</span>
                            <div className="listmainMan_item">
                              <div className="listmainMan_item_tit">
                                <span style={{marginLeft:70}}>品牌</span>
                                <span style={{marginRight:110}}>系列</span>
                              </div>
                              <div className="listmainMan_item_cent">
                                <span style={{marginLeft:70}}>{item.brandName}</span>
                                <span style={{marginRight:90}}>{item.seriesName}</span>
                              </div>
                            </div>
                        </div>
                        <div className="listaleMan_right" >
                            <div className="listaleMan_right_top">
                              <span>租赁方式及费用</span>
                               
                            </div>
                            <div className="listaleMan_right_cent">
                              {rentType[0].show==1?<p>租完即送：月租金￥{rentType[0].rent}，租期{rentType[0].tenancy}个月</p>:''}
                              {rentType[1].show==1?<p>长期租赁：月租金￥{rentType[1].rent}，租期{rentType[1].tenancy}个月</p>:''}
                              {rentType[2].show==1?<p>短期租赁：月租金￥{rentType[2].rent}，租期{rentType[2].tenancy}个月</p>:''}
                              {rentType[3].show==1?<p>零售：单价￥{rentType[3].rent}</p>:''}
                            </div>
                        </div>
                        <ButtonGroup className="listaleMan_right_btn">
                          <Button value="large" type="ghost" icon="search" onClick = {()=>this.listitem(item.id)} name="查看详情" title="查看详情"/>
                          <Button  value="large" type="ghost" icon="star" onClick = {()=>this.deleteCollect(item.id)} title="取消收藏"/>
                        </ButtonGroup>
                        
                      </ul>
                    )
                  }): ''}
              </div>
              <Pagination className="listPage" current={this.props.product.collectCurrent} total={this.props.product.collectTotal!=''?this.props.product.collectTotal:0} onChange={this.changeCurrent} pageSize={10} />
             </div>
            </div>
          </div>

          </div> 
    );
  }
};

export default Manage;

