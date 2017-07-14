import React,{Component,PropTypes} from 'react';
import {BackTop,} from 'antd';
import styles from './Logintop.less';
import img from '../../assets/logo1.png';

class Loginabout extends React.Component{
  render(){
    return(
      <div>
        <div className={styles.box}>
        	<div className={styles.img}>
        		<img alt="阿斯加加" src={img}/>
        	</div>
        	<span></span>
        </div>
      </div>
      );
  }
};

export default Loginabout;