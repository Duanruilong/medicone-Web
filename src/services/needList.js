
import $ from '../utils/ajax';
// 需求列表
async function needListquery(params) {
//   return $.post('/medicone/requirement/getList',params);
}
// 发布需求
async function insertList(params) {
    return $.post('/medicone/requirement/insert',params);	
}
async function updateNeed(params) {
    return $.post('/medicone/requirement/update',params);	
}

export default { needListquery,insertList,updateNeed}



