import React, { PropTypes } from 'react';
import { Layout,Anchor,Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover, } from 'antd';
import styles from './ProductList.less';
// 跳转
import {hashHistory } from 'dva/router';
import Usertop from './User/Usertop';
import Usercent from './User/Usercent';
import Userbottom from './User/Userbottom';

class ProductList extends React.Component{
  indexClickbtn=(e) =>{
    this.props.dispatch({
        type:'product/querySuccess',
            payload:{
              indexBtn:false,
              }
         })
  }
  indexeClickitembtn=(e) =>{
    this.props.dispatch({
        type:'product/querySuccess',
            payload:{
              indexBtn:true,
              }
         })
  }
  render(){
    return(
        <div>
          <Usertop {...this.props}/>
          <div className="indexMabox">
                  <span onClick={this.indexClickbtn}><p className="indexBtn">分享</p></span>
                  {!this.props.product.indexBtn?
                    <div className="indexMaboxitem" >
                      <span className="indexMabox_img">
                        <img alt="" />
                      </span>
                      <span className="indexMaboxitem_btn" onClick={this.indexeClickitembtn}>X</span>
                      <div className="indextxt">
                        <p>打开微信"扫一扫", </p>
                        <p>打开网页后点击屏幕</p>
                        <p>右上角"分享"按钮</p>
                      </div>
                    </div>
                            :''}
                </div>
          {this.props.location.pathname =='/login'||this.props.location.pathname =='/logfit'||this.props.location.pathname =='/logup'?'':<Usercent {...this.props}/>}
          <div>
             {this.props.children ? React.cloneElement(this.props.children,this.props) : ''}
          </div>
          {this.props.location.pathname =='/login'||this.props.location.pathname =='/logfit'||this.props.location.pathname =='/logup'?'':<Userbottom {...this.props}/>}
        </div>
      )
  }
};
export default ProductList;