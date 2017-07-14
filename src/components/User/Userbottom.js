import React,{Component,PropTypes} from 'react';
import {BackTop,} from 'antd';
import styles from './Userbottom.less';

class User extends React.Component{
  componentDidMount(){  //初始化，获取数据
   this.props.dispatch({
        type:'banner/queryList'
      });
  }

  render(){
    let bottomItem=[];
    let bannerBottom=this.props.banner.bannerList;
    bannerBottom.map((item)=>{
      if (item.type==2) {
        bottomItem.push(item)
      }
    })
    let img3=bottomItem[0] ? bottomItem[0] : '';
    return(
      <div>
        <div className="bottombanner">
          <div className="bottomserve">
            <img alt="阿斯加加" src={img3.imgUrl}/>
          </div>
        </div>

        <div className="layoutFooter">
            <p className="layoutFooter_tow">Copyright © 2015-2016&nbsp;Walkinga Technology  &middot; <a href="http://www.miitbeian.gov.cn/" target="_blank"> 沪ICP备15021950号-1</a>&nbsp;&nbsp;   走着网络技术(上海)有限公司</p>
        </div>
        <BackTop>
            <div className="bottomtop">TOP</div>
        </BackTop>
      </div>
      );
  }
};

export default User;

