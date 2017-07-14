import React,{Component,PropTypes} from 'react';
import {BackTop,} from 'antd';
import styles from './Loginabout.less';

class Loginabout extends React.Component{
  render(){
    return(
      <div>
        <div className="layoutFooterLog">
            <p className="layoutFooter_tow">Copyright © 2015-2016&nbsp;Walkinga Technology  &middot; <a href="http://www.miitbeian.gov.cn/" target="_blank"> 沪ICP备15021950号-1</a>&nbsp;&nbsp;   走着网络技术(上海)有限公司</p>
        </div>
        <BackTop>
            <div className="topLog">TOP</div>
        </BackTop>
      </div>
      );
  }
};

export default Loginabout;



          