import React,{Component,PropTypes} from 'react';
// 引入 connect 工具函数
import { connect } from 'dva';
// Users 的 Presentational Component
import Layout from '../components/Layout';

function ManagePage({children,location,dispatch,login,companion,banner,product,need,}){
	const layoutProps={
		 dispatch,
	    location,
	    children,
	    login,
	    companion,
	    banner,
	    product,
	    need,
	};

	return(
		<Layout {...layoutProps}/>
		)
}

ManagePage.PropTypes={
	login:PropTypes.object,
    companion:PropTypes.object,
    banner:PropTypes.object,
    product:PropTypes.object,
    need:PropTypes.object,
}
// 指定订阅数据
function mapStateToProps({ login,companion,banner,product,need,}) {
    return {login,companion,banner,product,need,};
}

export default connect(mapStateToProps)(ManagePage);