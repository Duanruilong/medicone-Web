import React, { Component, PropTypes } from 'react';
import { Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Tabs} from 'antd';
import styles from './Home.less';
import {hashHistory} from 'dva/router';
const TabPane = Tabs.TabPane;
class Home extends React.Component{
  componentDidMount(){  //初始化一下数据
      this.props.dispatch({
        type:'need/queryNeed',  //需求列表
      });
      this.props.dispatch({     //品牌
        type:'banner/queryBrandList',  
      });
      this.props.dispatch({       //banner
        type:'banner/querybannerList',
      });
      this.props.dispatch({       //合作伙伴
          type:'companion/querycomList',
      });
      this.props.dispatch({        //首页产品列表
          type:'product/queryMainList',    
      });
      this.props.dispatch({
        type:'product/queryFaclist'    //热门管理
      });
      this.props.dispatch({
        type:'product/listitemQuery',
        payload:{
              searchStr:this.props.product.searchStr,
              pageNum:this.props.product.current,
            }
      })
  }
  list=() => {
    hashHistory.push({pathname:'/list'})
  };
  index = () => {
    hashHistory.push({pathname:'/'})
  };
  login=()=>{
    hashHistory.push({pathname:'/index'});
  };
  managepublish=() =>{
    hashHistory.push({pathname:'/managepublish'})
  };
  // 列表进详情
  listitem = (key) => {
    hashHistory.push({
      pathname:'/listitem',
      query:{
        id:Math.floor(Math.random() * 999999)+'o'+key
      }
    })
  };
  render() {
    const columns = [{
        title:'需求信息',
        dataIndex:'title',
        key:'title',
        width:300,
        },{
          title:'需求预算',
          dataIndex:'budget',
          key:'budget',
          width:220,
        },{
          title:'城市',
          dataIndex:'address',
          key:'address',
          width:220,
        },{
          title:'预计使用时间',
          dataIndex:'lifeTimer',
          key:'lifeTimer',
          width:250,
          render: (text, record) => {
           return new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ');
          },
        },{
          title:'发布时间',
          dataIndex:'createTime',
          key:'createTime',
          width:270,
          render: (text, record) => {
            return new Date(parseInt(text)).toLocaleString().replace(/:\d{1,2}$/,' ');
          },
        }];

    // banner图
    let bannerItem=[];
    let bannerImg=this.props.banner.bannerList;
      bannerImg.map((item)=>{
        if(item.type==1){
          bannerItem.push(item)
        }
      })
      // console.log(bannerItem)
    let img=bannerItem[0] ? bannerItem[0] : '';
    let img1=bannerItem[1] ? bannerItem[1] : '';
    let img2=bannerItem[2] ? bannerItem[2] : '';
    function callback(key) {
      console.log(key);
    }
    // 热门管理
    let hot  = this.props.product.facilitylist.length>0 ? this.props.product.facilitylist[0].children[0] : {};
    let hot1 = this.props.product.facilitylist.length>0 ? this.props.product.facilitylist[0].children[1] : {};
    let hot2 = this.props.product.facilitylist.length>0 ? this.props.product.facilitylist[0].children[2] : {};
    let hot3 = this.props.product.facilitylist.length>0 ? this.props.product.facilitylist[0].children[3] : {};
    let hot4 = this.props.product.facilitylist.length>0 ? this.props.product.facilitylist[0].children[4] : {};
    let hot5 = this.props.product.facilitylist.length>0 ? this.props.product.facilitylist[0].children[5] : {};
    let hot6 = this.props.product.facilitylist.length>0 ? this.props.product.facilitylist[0].children[6] : {};
    
    // 需求列表
    let needList=this.props.need.recordList;
    let needLists=[];
    return (
          <div>
            <Carousel arrows="false" autoplay className="banner">
               <div  className="banner_item">
                  <div className="banner_item_bg">
                    <span><a href={img.linkUrl}><img alt="阿斯加加·医疗设备一站式集成服务，牙科设备"  src={img.imgUrl}/></a></span>        
                  </div>
                </div>
                <div  className="banner_item">
                  <div className="banner_item_bg">
                    <span><a href={img1.linkUrl}><img alt="阿斯加加·医疗设备一站式集成服务，牙科设备"  src={img1.imgUrl}/></a></span>       
                  </div>
                </div>
                <div  className="banner_item">
                  <div className="banner_item_bg">
                    <span><a href={img2.linkUrl}><img alt="阿斯加加·医疗设备一站式集成服务，牙科设备"  src={img2.imgUrl}/></a></span>       
                  </div>
                </div>
            </Carousel>
             <div className="content_title">
                  <h2>热门产品</h2>
                  <h4>海量精品设备，即用即租</h4>
              </div>
                <div className="kind">
                    <div className="kind_item">
                       <Tabs animated={false} defaultActiveKey="1" onChange={callback}>
                        <TabPane tab={
                            <div className="kind_list">
                              <div className="kind_machine">
                                <i className="kind_img"><img style={{marginTop:10}} height="80%" src={hot.iconUrl}/></i>
                                <span className="kind_title">{hot.name}</span>
                              </div>
                            </div>} key="1" >
                           <div className="main">
                              {this.props.product.mainsList.length > 0 ?this.props.product.mainsList.map((item,int)=>{
                                    if (item.categoryTwoName==hot.name) {
                                      return (
                                      <Card key={int} style={{width:288,height:278}} bodyStyle={{padding:0}} className="card">
                                        <div className="cardBox" onClick={() =>this.listitem(item.id)}>
                                          <div className="custom_image">
                                            <img alt="阿斯加加·医疗设备一站式集成服务，牙科设备·医疗设备一站式集成服务，牙科设备" height="100%" src={JSON.parse(item.showImages)[0].url}/>
                                          </div>
                                          <div className="custom_card">
                                            <h3>{item.name}</h3>
                                            <p>品牌:{item.brandName}</p>
                                          </div>
                                        </div>
                                      </Card>)
                                    }
                                    
                              }):''}
                            </div>  
                        </TabPane>
                        <TabPane tab={
                          <div className="kind_list">
                           <div className="kind_machine">
                              <i className="kind_img1"><img style={{marginTop:10}} height="80%" src={hot1.iconUrl}/></i>
                              <span className="kind_title">{hot1.name}</span>
                            </div>
                         </div>
                        } key="2">
                          <div className="main">
                              {this.props.product.mainsList.length>0?this.props.product.mainsList.map((item,int)=>{
                                    if (item.categoryTwoName==hot1.name) {
                                      return (
                                      <Card key={int} style={{width:288,height:278}} bodyStyle={{padding:0}} className="card">
                                        <div className="cardBox" onClick={() =>this.listitem(item.id)}>
                                          <div className="custom_image">
                                            <img alt="阿斯加加·医疗设备一站式集成服务，牙科设备·医疗设备一站式集成服务，牙科设备" height="100%" src={JSON.parse(item.showImages)[0].url}/>
                                          </div>
                                          <div className="custom_card">
                                            <h3>{item.name}</h3>
                                            <p>品牌:{item.brandName}</p>
                                          </div>
                                        </div>
                                      </Card>)
                                    }
                                    
                              }):''}
                            </div> 
                        </TabPane>
                        <TabPane tab={
                          <div className="kind_list">
                              <div className="kind_machine">
                                <i className="kind_img2"><img style={{marginTop:10}} height="80%" src={hot2.iconUrl}/></i>
                                <span className="kind_title">{hot2.name}</span>
                              </div>
                           </div>
                        } key="3">
                            <div className="main">
                              {this.props.product.mainsList.length>0?this.props.product.mainsList.map((item,int)=>{
                                  if (item.categoryTwoName==hot2.name) {
                                    return (
                                      <Card key={int} style={{width:288,height:278}} bodyStyle={{padding:0}} className="card">
                                        <div className="cardBox" onClick={() =>this.listitem(item.id)}>
                                          <div className="custom_image">
                                            <img alt="阿斯加加·医疗设备一站式集成服务，牙科设备·医疗设备一站式集成服务，牙科设备" height="100%" src={JSON.parse(item.showImages)[0].url}/>
                                          </div>
                                          <div className="custom_card">
                                            <h3>{item.name}</h3>
                                            <p>品牌:{item.brandName}</p>
                                          </div>
                                        </div>
                                      </Card>)
                                  }
                                    
                              }):''}
                            </div> 
                        </TabPane>
                        <TabPane tab={
                          <div className="kind_list">
                              <div className="kind_machine">
                                <i className="kind_img3"><img style={{marginTop:10}} height="80%" src={hot3.iconUrl}/></i>
                                <span className="kind_title">{hot3.name}</span>
                              </div>
                           </div>
                         } key="4">
                             <div className="main">
                              {this.props.product.mainsList.length>0?this.props.product.mainsList.map((item,int)=>{
                                    if (item.categoryTwoName==hot3.name) {
                                      return (
                                      <Card key={int} style={{width:288,height:278}} bodyStyle={{padding:0}} className="card">
                                        <div className="cardBox" onClick={() =>this.listitem(item.id)}>
                                          <div className="custom_image">
                                            <img alt="阿斯加加·医疗设备一站式集成服务，牙科设备·医疗设备一站式集成服务，牙科设备" height="100%" src={JSON.parse(item.showImages)[0].url}/>
                                          </div>
                                          <div className="custom_card">
                                            <h3>{item.name}</h3>
                                            <p>品牌:{item.brandName}</p>
                                          </div>
                                        </div>
                                      </Card>)
                                    }
                                    
                              }):''}
                            </div> 
                         </TabPane>
                        <TabPane tab={
                            <div className="kind_list">
                              <div className="kind_machine">
                                <i className="kind_img4"><img style={{marginTop:10}} height="80%" src={hot4.iconUrl}/></i>
                                <span className="kind_title">{hot4.name}</span>
                              </div>
                           </div>
                        } key="5">
                             <div className="main">
                              {this.props.product.mainsList.length>0?this.props.product.mainsList.map((item,int)=>{
                                  if (item.categoryTwoName==hot4.name) {
                                    return (
                                      <Card key={int} style={{width:288,height:278}} bodyStyle={{padding:0}} className="card">
                                        <div className="cardBox" onClick={() =>this.listitem(item.id)}>
                                          <div className="custom_image">
                                            <img alt="阿斯加加·医疗设备一站式集成服务，牙科设备·医疗设备一站式集成服务，牙科设备" height="100%" src={JSON.parse(item.showImages)[0].url}/>
                                          </div>
                                          <div className="custom_card">
                                            <h3>{item.name}</h3>
                                            <p>品牌:{item.brandName}</p>
                                          </div>
                                        </div>
                                      </Card>)
                                  }
                                    
                              }):''}
                            </div> 
                        </TabPane>
                        <TabPane tab={
                            <div className="kind_list">
                              <div className="kind_machine">
                                <i className="kind_img5"><img style={{marginTop:10}} height="80%" src={hot5.iconUrl}/></i>
                                <span className="kind_title">{hot5.name}</span>
                              </div>
                           </div>
                        } key="6">
                             <div className="main">
                              {this.props.product.mainsList.length>0?this.props.product.mainsList.map((item,int)=>{
                                    if (item.categoryTwoName==hot5.name) {
                                    return (
                                      <Card key={int} style={{width:288,height:278}} bodyStyle={{padding:0}} className="card">
                                        <div className="cardBox" onClick={() =>this.listitem(item.id)}>
                                          <div className="custom_image">
                                            <img alt="阿斯加加·医疗设备一站式集成服务，牙科设备·医疗设备一站式集成服务，牙科设备" height="100%" src={JSON.parse(item.showImages)[0].url}/>
                                          </div>
                                          <div className="custom_card">
                                            <h3>{item.name}</h3>
                                            <p>品牌:{item.brandName}</p>
                                          </div>
                                        </div>
                                      </Card>)
                                    }
                                    
                              }):''}
                            </div> 
                        </TabPane>
                        <TabPane tab={
                            <div className="kind_list">
                              <div className="kind_machine">
                                <i className="kind_img6"><img style={{marginTop:10}} height="80%" src={hot6.iconUrl}/></i>
                                <span className="kind_title">{hot6.name}</span>
                              </div>
                           </div>
                        } key="7">
                             <div className="main">
                              {this.props.product.mainsList.length>0?this.props.product.mainsList.map((item,int)=>{
                                    if (item.categoryTwoName==hot6.name) {
                                      return (
                                      <Card key={int} style={{width:288,height:278}} bodyStyle={{padding:0}} className="card">
                                        <div className="cardBox" onClick={() =>this.listitem(item.id)}>
                                          <div className="custom_image">
                                            <img alt="阿斯加加·医疗设备一站式集成服务，牙科设备·医疗设备一站式集成服务，牙科设备" height="100%" src={JSON.parse(item.showImages)[0].url}/>
                                          </div>
                                          <div className="custom_card">
                                            <h3>{item.name}</h3>
                                            <p>品牌:{item.brandName}</p>
                                          </div>
                                        </div>
                                      </Card>)
                                    }
                                    
                              }):''}
                            </div> 
                        </TabPane>
                      </Tabs>
                    </div>
                </div>
                
                <div className="content_title">
                  <h2>最新需求信息</h2>
                  <h4>海量精品设备，有需所应</h4>
                </div>
                <div className="fabubtn">
                      <Button onClick={this.managepublish}>免费发布需求</Button>
                </div>
                <div className="index_list">
                    <Table
                        key={`nedlist${this.props.need.recordList.key}`} 
                        rowKey="needTable"
                        columns={columns} 
                        dataSource={this.props.need.recordList} 
                        pagination={{pageSize:10}} 
                        scroll={{y:300}}
                        />
                </div>
                <div className="hezuo_content">
                  <div className="hezuo_title" id="link">合作伙伴</div>
                  <div className="hezuo_box">
                    {this.props.companion.companionList.length > 0 ? this.props.companion.companionList.map((item,int) =>{
                      return(
                        <div key={int} className="hezuo_img">
                          <div className="hezuo_imgbox"><img alt="阿斯加加·医疗设备一站式集成服务，牙科设备" src={item.iconUrl}/></div>
                          <span>{item.name}</span>
                        </div>
                        )
                    }) : ''}
                  </div>
                </div>
          </div> 
    );
  }
};

export default Home;