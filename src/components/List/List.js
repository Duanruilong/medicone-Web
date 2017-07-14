import React, { Component, PropTypes } from 'react';
import {  Alert,Tabs,Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Pagination } from 'antd';
import styles from './List.less';
import {hashHistory} from 'dva/router';
import isNullObject from '../../utils/common'

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
function callback(key){
  console.log(key)
}

class List extends React.Component{
  componentDidMount(){
      this.props.dispatch({   //获取分类
            type:'product/queryclassListitem'
      });
      this.props.dispatch({   //品牌
            type:'banner/queryBrandList'
      });
       this.props.dispatch({
            type:'banner/querybannerList',
       })
      this.props.dispatch({   //获取产品列表
            type:'product/listitemQuery',
            payload:{
              searchStr:this.props.product.searchStr,
              pageNum:this.props.product.current,
            }
      });
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
  collect(id){
     this.props.dispatch({
        type:'product/intCollectlist',
        payload:{
          id:id
        }
     })
  } 
  deleteCollect(id){
    this.props.dispatch({
        type:'product/deleteCollectlist',
        payload:{
          id:id
        }
     })
  }
  changeCurrent=(current)=>{
    this.props.dispatch({
        type:'product/listitemQuery',
        payload:{
           pageNum:current
        }
     })
    this.props.dispatch({
        type:'product/changeCurrent',
        payload:{
          name:current
        }
     })
  }

  finderList=(e)=>{  //三级筛选
    let nameKey=e.target.id.split('@')[0];
    let name=e.target.id.split('@')[1];
    let categoryTwoName=null;
    let categoryThreeName=null;
    let brandName=null;
    
    if(nameKey=='two'){
      categoryTwoName=name;
    }else if(nameKey=='three'){
      categoryThreeName=name;
    }else if(nameKey='brand'){
      brandName=name;
    }
    let key;
    if(categoryTwoName!=null){ //判断三次筛选
        key='categoryTwoName';
    }else{
      categoryTwoName=this.props.product.categoryTwoName
    }if(categoryThreeName!=null){
        key='categoryThreeName';
    }else{
      categoryThreeName=this.props.product.categoryThreeName;
    }if(brandName!=null){
        key='brandName';
    }else{
      brandName=this.props.product.brandName
    }
    this.props.dispatch({
        type:'product/listitemQuery',
        payload:{
          categoryTwoName:categoryTwoName,
          categoryThreeName:categoryThreeName,
          brandName:brandName,
          searchStr:this.props.product.searchStr,
          pageNum:this.props.product.current,
        }
    })
    }
  render() {
    // 租赁方式
    let rentType= this.props.product.listitemlist.length>0 ?JSON.parse(this.props.product.listitemlist[0].rentType) : '';      //生命周期
    // 子类  (双重遍历)
    let classitem_s =this.props.product.classListitem.length > 0 ? this.props.product.classListitem[0].children:[];
    let classitemAllChild=[];
    if(classitem_s.length>0){
      classitem_s.map((item)=>{
        if(item.name==this.props.product.categoryTwoName){
            item.children.map((item)=>{
              classitemAllChild.push(item);
            })
        }
      })
    }
    return (
       <div>
          <div className="equipmentList">
            <div className="titleboxEqu">
         	   <div className="itemEqu">

                <div className="itemstitEqu">产品目录：</div>
                    {this.props.product.classListitem.length > 0 ?this.props.product.classListitem[0].children.map((item,int) =>{
                      let activeCategory=""; //添加样式
                      if(item.name==this.props.product.categoryTwoName){
                        activeCategory="titleactive";
                      }
                      return(
                            <span className={activeCategory} name={item.name} id={`two@${item.name}@${int}`}  onClick={this.finderList} key={`two@${int}`}>{item.name}</span>
                            )
                    }) : ''}
         	    </div>
              {classitemAllChild.length!=0?<div className="itemEqu">
               <div className="itemstitEqu">产品子类:</div>
                 <div className="itemlistEqu">
                  {classitemAllChild.length > 0 ?classitemAllChild.map((item,int) =>{
                      let activeCategory="";
                      if (item.name==this.props.product.categoryThreeName) {
                        activeCategory="titleactive"
                      }
                      return(
                            <span className={activeCategory} name={item.name} id={`three@${item.name}@${int}`}  onClick={this.finderList} key={`three@${int}`}>{item.name}</span>
                            )
                    }) : ''}
                 </div>
              </div>:''}
           		<div className="item2Equ">
                <div className="itemstitEqu">产品品牌：</div>
                <div className="itemlistEqu">
                    {this.props.banner.brandList.length > 0 ?this.props.banner.brandList.map((item,int) =>{
                    let activeCategory="";
                      if (item.name==this.props.product.brandName) {
                        activeCategory="titleactive"
                      }
                      return(
                          <span className={activeCategory} name={item.name} id={`brand@${item.name}@${int}`}  onClick={this.finderList} key={`brand@${int}`}>{item.name}</span>
                            )
                    }) : ''}
                </div>
                
           		</div>
           		<div className="itemEqu">
                <div className="itemstitEqu">租赁方式：</div>
                <span >租完即送</span>
                <span >长期租赁</span>
                <span >短期租赁</span>
           		 	<span >零售</span>
           		 </div>
              
       		 </div>
	           <div className="centerEqu">
             {this.props.product.showNomore ? <Alert
                    message="警告提示"
                    description="暂无更多数据！"
                    type="error"
                    showIcon
                  />:''}
    	       		<div className="titleEqu"></div>
    	       		<div className="listnumEqu">
                    {this.props.product.listitemlist.length > 0  ? this.props.product.listitemlist.map((item,int) => {
                      let showImages=JSON.parse(item.showImages);
                      let rentType=JSON.parse(item.rentType);
                      let iconName='star-o';
                      if(item.isCollect!=''&&item.isCollect==1){
                          iconName='star';
                      }
                       return(
                          <ul key={int} className="listitemEqu" >
                              <div className="listimgEqu" >
                                <img onClick = {()=>this.listitem(item.id)} alt="阿斯加加·医疗设备一站式集成服务，牙科设备" src={showImages[0].url}/>
                              </div>
                              <div className="listmainEqu" style={{width:350}}>
                                <span className="listmainEqu_title" onClick = {()=>this.listitem(item.id)}>{item.name}</span>
                                <div className="listmainEqu_item">
                                  <div className="listmainEqu_item_tit">
                                    <span >品牌</span>
                                    <span >系列</span>
                                  </div>
                                  <div className="listmainEqu_item_cent">
                                    <span>{item.brandName}</span>
                                    <span>{item.seriesName}</span>
                                  </div>
                                </div>
                                <ButtonGroup className="listbtnEqu">
                                   <Button value="large" type="ghost" icon="search" onClick = {()=>this.listitem(item.id)} name="查看详情" title="查看详情"/>
                                </ButtonGroup>
                              </div>
                              <div className="listaleEqu" style={{width:350}}>
                                {rentType[0].show==1||rentType[1].show==1||rentType[2].show==1?<span className="listaleEqu_title">租赁方式</span>:''}
                                {rentType[0].show==1?<p>租完即送：月租金<span style={{color:'#ff4028',fontSize:16}}>￥{rentType[0].rent}</span>，租期{rentType[0].tenancy}个月</p>:''}
                                {rentType[1].show==1?<p>长期租赁：月租金<span style={{color:'#ff4028',fontSize:16}}>￥{rentType[1].rent}</span>，租期{rentType[1].tenancy}个月</p>:''}
                                {rentType[2].show==1?<p>短期租赁：月租金<span style={{color:'#ff4028',fontSize:16}}>￥{rentType[2].rent}</span>，租期{rentType[2].tenancy}个月</p>:''}
                                {rentType[3].show==1?<span className="listaleEqu_title">零售方式</span>:''}
                                {rentType[3].show==1?<p>零售：单价<span style={{color:'#ff4028',fontSize:16}}>￥{rentType[3].rent}</span></p>:''}
                                {rentType[0].show!=1&&rentType[1].show!=1&&rentType[2].show!=1&&rentType[3].show!=1?<span className="listaleEqu_title">零售方式</span>:''}
                                {rentType[0].show!=1&&rentType[1].show!=1&&rentType[2].show!=1&&rentType[3].show!=1?<p>零售：<span style={{color:'#ff4028',fontSize:16}}>面议</span></p>:''}
                              </div>
                           </ul>
                            )
                    }) : ''}
    	       		 	
    	       		</div>
                <Pagination className="listPage" current={this.props.product.current} total={this.props.product.total!=''?this.props.product.total:0} onChange={this.changeCurrent} pageSize={12}/>
	           </div>
       	</div>
       </div> 
    );
  }
};

export default List;