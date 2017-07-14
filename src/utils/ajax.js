import fetch from 'dva/fetch';
export default {
    convertObjToQueryString: function(obj) {
        var paramStr = '';
        for (let name in obj) {
            paramStr += (name + '=' + obj[name] + '&');
        }
        if (paramStr[paramStr.length - 1] === '&')
            return paramStr.slice(0, paramStr.length - 1);
        else
            return paramStr;
    },
    get: function(originUrl, data) {
        let url = originUrl;
        let queryString = this.convertObjToQueryString(data);
        if (url.indexOf('?') !== -1) url = url + '&' + queryString;
        else url += ('?' + queryString);
        return fetch(url, {
            credentials: 'include'
        });
    },
    getJSON: function(originUrl, data) {
        return this.get(originUrl, data).then(function(res) {
            console.log(res)
            return res.json()
        });
    },
    post: function(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(function(res) {
            return res.json();
        });
    }
}