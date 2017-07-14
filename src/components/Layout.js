import React from 'react';
import { hashHistory } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
import './Layout.css';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class AdminLayout extends React.Component {
    handleClick(e){
	    console.log('click',e.key);
	    hashHistory.push({pathname:e.key})
	}
	render(){
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
		return(
			<div className="manleft">
              <Menu className="manleft" 
                onClick={this.handleClick}
                style={{width:190}}
                defaultOpenKeys={['sub1','sub2','sub3']}
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
                <Content style={{ padding: '24px 24px', minHeight: 620 }}>
		          {this.props.children ? React.cloneElement(this.props.children,this.props) :''} 
		        </Content>
            </div>
			)
	}
}

export default AdminLayout;