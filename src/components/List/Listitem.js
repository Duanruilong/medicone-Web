import React, { Component, PropTypes } from 'react';
import {  Table, Popconfirm, Button,Carousel,Icon,Card,Row,Col,Input,Popover,Tabs} from 'antd';
import styles from './Listitem.less';
import {hashHistory} from 'dva/router';
import isNullObject from '../../utils/common'
const TabPane = Tabs.TabPane;


function callback(key){
	console.log(key);
}
class Listitem extends React.Component{
	constructor(props) {   //传输加解密
   		super(props);
    	let idStr=this.props.location.query.id;
    	let key=idStr.split('o')[1];
  		this.props.dispatch({
	        type:'product/queryProductById',
	        payload:{
	          key:key  
	        }
	     });
  		
  	}
	componentDidMount(){
      this.props.dispatch({
            type:'banner/querybannerList',
       });
	    this.props.dispatch({
	    	type:'login/getTellist'
	    });
	    
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
  _handleClickbtn=(e) =>{
    this.props.dispatch({
        type:'product/querySuccess',
            payload:{
              weixinBtn:false,
              }
         })
	}
	_handleClickitembtn=(e) =>{
    this.props.dispatch({
        type:'product/querySuccess',
            payload:{
              weixinBtn:true,
              }
         })
	}

	render(){

		return(
			<div>
				<div className="listitemItem">
					<div className="topItem">
						<div className="topimgItem">
							<Carousel className="bannerItem" arrows="true" dots="false" effect="fade">
								{!isNullObject(this.props.product.clikItem)&&JSON.parse(this.props.product.clikItem.showImages).length>0?JSON.parse(this.props.product.clikItem.showImages).map((item,int) => {
									if (item.url!="") {
										return (<div key={int} className="topframeItem">
											<img alt="阿斯加加" src={item.url}/>
										</div>)
									}
								}):<div></div>}
							</Carousel>
							<div className="topsmallItem">
								<div className="inglistItem">
								{!isNullObject(this.props.product.clikItem)&&JSON.parse(this.props.product.clikItem.showImages).length>0?JSON.parse(this.props.product.clikItem.showImages).map((item,int) =>{
									if (item.url!="") {
										return(
											  <img key={int} alt="阿斯加加" src={item.url}/>
											)
									}}):<div></div>}
								</div>
							</div>
						</div>
						<div className="topcentItem">
							<div className="titleItem">
								<h1>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.name:''}
									<span className="titlebtnItem_2">
										{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.isCollect!=''&&this.props.product.clikItem.isCollect==2?<Button value="large" type="ghost" icon={!isNullObject(this.props.product.clikItem)&&this.props.product.clikItem.isCollect!=''?'star-o':''} onClick = {()=>this.collect(this.props.product.clikItem.id)} title="收藏"/>:'':''}
                                		{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.isCollect!=''&&this.props.product.clikItem.isCollect==1?<Button value="large" type="ghost" icon={!isNullObject(this.props.product.clikItem)&&this.props.product.clikItem.isCollect!=''?'star':''} onClick = {()=>this.deleteCollect(this.props.product.clikItem.id)} title="取消收藏"/>:'':''}
									</span>
								</h1>
							</div>

							<div className="titlelistItem">
								<ul>
								   <span>产品编号：<i>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.number:''}</i></span>
								   <span>品牌：<i>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.brandName:''}</i></span>
								   <span>型号：<i>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.seriesName:''}</i></span>
								</ul>
								<ul>
									<span>批准文号：<i>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.approval:''}</i></span>
								</ul>

								<ul>
									<span>租赁方式及费用：</span>

									<div className="rentItem">
										{!isNullObject(this.props.product.clikItem)&&JSON.parse(this.props.product.clikItem.rentType).length>0?JSON.parse(this.props.product.clikItem.rentType)[0].show==1?<p>租完即送：月租金<span style={{color:'#ff4028',fontSize:16,paddingRight:0}}>￥{JSON.parse(this.props.product.clikItem.rentType)[0].rent}</span>，租期{JSON.parse(this.props.product.clikItem.rentType)[0].tenancy}个月</p>:'':''}
                                		{!isNullObject(this.props.product.clikItem)&&JSON.parse(this.props.product.clikItem.rentType).length>0?JSON.parse(this.props.product.clikItem.rentType)[1].show==1?<p>长期租赁：月租金<span style={{color:'#ff4028',fontSize:16,paddingRight:0}}>￥{JSON.parse(this.props.product.clikItem.rentType)[1].rent}</span>，租期{JSON.parse(this.props.product.clikItem.rentType)[1].tenancy}个月</p>:'':''}
                                		{!isNullObject(this.props.product.clikItem)&&JSON.parse(this.props.product.clikItem.rentType).length>0?JSON.parse(this.props.product.clikItem.rentType)[2].show==1?<p>短期租赁：月租金<span style={{color:'#ff4028',fontSize:16,paddingRight:0}}>￥{JSON.parse(this.props.product.clikItem.rentType)[2].rent}</span>，租期{JSON.parse(this.props.product.clikItem.rentType)[2].tenancy}个月</p>:'':''}
                                		{!isNullObject(this.props.product.clikItem)&&JSON.parse(this.props.product.clikItem.rentType).length>0?JSON.parse(this.props.product.clikItem.rentType)[3].show==1?<p>零售：单价<span style={{color:'#ff4028',fontSize:16,paddingRight:0}}>￥{JSON.parse(this.props.product.clikItem.rentType)[3].rent}</span></p>:'':''}
                                		{!isNullObject(this.props.product.clikItem)&&JSON.parse(this.props.product.clikItem.rentType).length>0?JSON.parse(this.props.product.clikItem.rentType)[3].show!=1&&JSON.parse(this.props.product.clikItem.rentType)[2].show!=1&&JSON.parse(this.props.product.clikItem.rentType)[1].show!=1&&JSON.parse(this.props.product.clikItem.rentType)[0].show!=1?<p>零售：<span style={{color:'#ff4028',fontSize:16,paddingRight:0}}>面议</span></p>:'':''}
									</div>
								</ul>
								
							</div>
							<div className="bdsharebuttonbox">
								<a href="#" className="bds_more" data-cmd="more"></a>
								<a href="#" className="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
								<a href="#" className="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
								<a href="#" className="bds_renren" data-cmd="renren" title="分享到人人网"></a>
								<a href="#" className="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
								<a href="#" className="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
							</div>

							<div className="Telbox">
								<p className="Teltel">咨询电话：{this.props.login.Tellist.tel}</p>
								<p className="Teltel Telemail">咨询邮箱：{this.props.login.Tellist.email}</p>
								
								<div className="Mabox">
									<span style={{paddingLeft:10}}>分享</span>
									<div className="Mabox_btn" onClick={this._handleClickbtn}></div>
                					{!this.props.product.weixinBtn?
                						<div className="Maboxitem" >
											<span className="Mabox_img">
												<img alt="" />
											</span>
											<span className="Maboxitem_btn" onClick={this._handleClickitembtn}>X</span>
											<div className="txt">
												<p>打开微信"扫一扫", </p>
												<p>打开网页后点击屏幕</p>
												<p>右上角"分享"按钮</p>
											</div>
										</div>
                						:''}
								</div>
								
							</div>
						</div>
					</div>
					
					<div className="centerItem">
						<Tabs defaultActiveKey="1" onChange={callback} animated={false}>
							<TabPane tab="产品描述" key="1" >
								{!isNullObject(this.props.product.clikItem)&&JSON.parse(this.props.product.clikItem.detailImages).length>0?JSON.parse(this.props.product.clikItem.detailImages).map((item,int) => {
									if (item.url!="") {
										return (
											<img key={int} alt="阿斯加加" src={item.url}/>
											)
									}
								}):''}
							</TabPane>
							<TabPane tab="规格参数" key="2" >
								<div className="standItem">
									<div className="standleftItem">
										<ul>商品名称：<i>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.name:''}</i></ul>
										{this.props.product.clikItem.number==null?'':<ul>商品编号：<i>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.number:''}</i></ul>}
										{this.props.product.clikItem.modelName==null?'':<ul>型 号：<i>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.modelName:''}</i></ul>}
										{this.props.product.clikItem.pack==null?'':<ul>包 装：<i>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.pack:''}</i></ul>}
									</div>
									<div className="standrightItem">
										
										{this.props.product.clikItem.size==null?'':<ul>规 格：<i>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.size:''}</i></ul>}
										{this.props.product.clikItem.weight==null?'':<ul>重 量：<i>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.weight:''}</i></ul>}
									</div>
									{this.props.product.clikItem.characters==null?'':<div className="topsmallItem_2">
										<div style={{paddingTop:20}}>产品特点：</div>
										<p style={{paddingLeft:65}}>
											{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.characters:''}
										</p>
									</div>}
									{this.props.product.clikItem.scope==null?'':<ul><span>适用范围： </span>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.scope:''}</ul>}
									{this.props.product.clikItem.taboo==null?'':<ul><span>禁 忌 ：</span>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.taboo:''}</ul>}

								</div>
								
								<div className="topsmallItem_2"></div>
							</TabPane>
							<TabPane tab="产品服务" key="3" >
								<ul className="saleItem">
									<li>{!isNullObject(this.props.product.clikItem)?this.props.product.clikItem.aftermarket:''}</li>
									<li>售后服务电话：{this.props.login.Tellist.tel}</li>
									<li>服务承诺：</li>
									<li style={{paddingLeft:65}} >平台向您保证所售商品均为正品，并开具签约公司的正式发票。凭质保证书及发票，可享受相应售后服务。平台还为您提供具有竞争力产品服务，请您放心购买！</li>
									<li>注：因厂家会在没有任何提前通知的情况下更改产品包装、升级、产地或者一些附件，网站上的产品图片或包装及信息等可能会与实物出现些许不同，具体以实物为准！若本网站没有及时更新，请大家谅解！</li>
									<li>售后注意：</li>
									<div style={{paddingLeft:65}}>
										<li  >1．尊敬的客户，您的有效签收意味着您已经认可我们寄送的产品。如产品有异议，请于签收之日起2个工作日内及时向把因反应，并提供相应的破损照片及相应的证明；我们会及时联系生产厂家提供后续服务；逾期我们将很难处理；</li>
										<li  >2．打印LOGO、特制、定制类产品、一次性产品（拆包后）、进口产品不在退换货范围之内；</li>
										<li  >3．完好商品一经使用或包装无法复原的将导致把因或生产厂家无法二次销售，所以一旦出现此种情况我们将很难实行退换货；</li>
										<li  >4．不好看，和想象中不一样很难作为退换货依据；</li>
										<li  >5．如您对产品有异议，请您第一时间联系把因；请不要出现：未经联系就直接退货至把因或厂家；这会加重我们的查询负担，谢谢配合；</li>
										<li  >6．客户出现单方面毁约、选型错误或希望更换无质量问题的商品时，如由此发生的相应运费成本、差价、违约金需要尊敬的客户您对此进行承担；</li>
										<li  >7．出现售后问题，请不要到付；请先行垫付运费，后续会根据责任归属判定处理运费。</li>
									</div>
									<li>权利声明：</li>
									<li style={{paddingLeft:65}} >平台上的商品信息、参数、客户信息等内容，是把因重要资源，未经许可，不得转载使用。</li>
									<li>注：本网站商品信息均来自于产品合作方，其真实性、准确性、合法性均由信息所有者（合作方）负责</li>
								</ul>
							</TabPane>
						</Tabs>
					</div>
				</div>

			</div>
			)
	}
}

export default Listitem;