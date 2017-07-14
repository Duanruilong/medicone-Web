
import $ from '../utils/ajax';
// 获取产品
async function ProductListitem(params) {
    return $.post('/medicone/product/getProductList',params);	
}
// 获取产品列表
async function ProductByIditem(params) {
  return $.post('/medicone/product/getProductById',params);
}
// 获取类目(热门管理)
async function ClassHotList(params) {
	return $.post('/medicone/category/getHotList',params);	
}
//获取分类
async function CategoryList(params) {
    return $.post('/medicone/category/getCategoryList',params);
}
// 获取收藏列表
async function collectList(params) {
    return $.post('/medicone/collect/getCollectList',params);	
}
// 点击收藏
async function intCollectlist(params) {
    return $.post('/medicone/collect/insertCollect',params);	
}
// 取消收藏
async function deleteCollectlist(params) {
    return $.post('/medicone/collect/deleteCollect',params);	
}
async function getCollectProductList(params) {
    return $.post('/medicone/product/getCollectProductList',params);	
}
export default { ProductListitem,ProductByIditem,ClassHotList,CategoryList,collectList,intCollectlist,deleteCollectlist,getCollectProductList}
