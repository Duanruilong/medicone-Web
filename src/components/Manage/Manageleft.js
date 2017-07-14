import React, { Component, PropTypes } from 'react';
import { Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Layout,Menu,Breadcrumb} from 'antd';
import styles from './Manageleft.less';
import {hashHistory} from 'dva/router';

const { SubMenu } = Menu;
class Manageleft extends React.Component{
  index = () => {
    hashHistory.push({pathname:'/'})
  };
  handleClick(e){
    console.log('click',e.key);
    hashHistory.push({pathname:e.key})
  }
  render() {
    // 管理中心导航菜单
    const menus = [{
        subMenu:'我的收藏',
        iconType:'user',
        menu:[{
            item:'收藏列表',
            key:'manage',
        }]
      },{
        subMenu:'我的需求',
        iconType:'appstore',
        menu:[{
            item:'需求列表',
            key:'managelist',
        },{
            item:'发布需求',
            key:'managepublish',
        }]
      },{
        subMenu:'我的设置',
        iconType:'setting',
        menu:[{
            item:'企业资料',
            key:'managedatum',
        },{
            item:'修改密码',
            key:'managerevamp',
        }]
    }];
    return (
            <div className="manleft">
              <Menu className="manleft" 
                onClick={this.handleClick}
                style={{width:190}}
                defaultOpenKeys={['sub1','sub2','sub3']}  //展开
                mode="inline"
                >
                {menus.map(function(item,i){
                  return <SubMenu key={`sub${i+1}`} title={<span style={{fontSize:16}}><Icon type={item.iconType}/>{item.subMenu}</span>}>
                    {item.menu.map(function(item,i){
                      return <Menu.Item key={item.key} style={{fontSize:14}}>{item.item}</Menu.Item>
                    })}
                </SubMenu>
                })}
                </Menu>
            </div>
    );
  }
};

export default Manageleft;