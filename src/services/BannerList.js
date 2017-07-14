
import $ from '../utils/ajax';
// banner图数据
async function queryBanner(params) {
    return $.post('/medicone/banner/getBannerList');
}
// 获取品牌
async function BrandList(params) {
    return $.post('/medicone/category/getBrandList',params);	
}

export default { queryBanner,BrandList}
