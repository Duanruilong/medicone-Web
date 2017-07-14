import React, { Component, PropTypes }from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

function Products ({children,location,dispatch,login,companion,banner,product,need,}){

  const productsProps = {
    dispatch,
    location,
    children,
    login,
    companion,
    banner,
    product,
    need,
  }
  
    return (
        <ProductList {...productsProps}/>
    );
  }
  Products.propTypes = {
    login:PropTypes.object,
    companion:PropTypes.object,
    banner:PropTypes.object,
    product:PropTypes.object,
    need:PropTypes.object,

  };

// 指定订阅数据
function mapStateToProps({ login,companion,banner,product,need,}) {
    return {login,companion,banner,product,need,};
}

export default connect(mapStateToProps)(Products);