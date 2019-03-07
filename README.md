# medicone-Web

![web](http://photocdn.sohu.com/20151022/Img423921839.jpg)

### 基于React + Ant Design:smile::sparkles::+1::clap::smile:

- :smile::shipit::sparkles::+1::clap:
- 这是一个基于React + Ant Design开发的前端页面;
- 我的第一个React项目.

### 使用说明

- 1.下载本项目

    https://github.com/Duanruilong/medicone-webap.git
- 2.安装依赖

    npm install
- 3.启动服务

   npm start



> **还有很多可以优化。。。。!.**



有报错：
> 1、slick-carousel@1.8.1 requires a peer of jquery@>=1.8.0 but none is installed. You must install peer dependencies yourself.

解决方法： npm install slick-carousel


# Effect
示例：
```
app.model({
  namespace: 'todos',
  effects: {
    *addRemote({ payload: todo }, { put, call }) {
      yield call(addTodo, todo);
      yield put({ type: 'add', payload: todo });
    },
  },
});
```

## put
用于触发 action 。
```
yield put({ type: 'todos/add', payload: 'Learn Dva' });
```
## call
用于调用异步逻辑，支持 promise 。

```
const result = yield call(fetch, '/todos');
```

## select
用于从 state 里获取数据。
```
const todos = yield select(state => state.todos);
```

# 异步请求
异步请求基于 whatwg-fetch，API 详见：[https://github.com/github/fetch](https://github.com/github/fetch)

## GET 和 POST
```
import request from '../util/request';

// GET
request('/api/todos');

// POST
request('/api/todos', {
  method: 'POST',
  body: JSON.stringify({ a: 1 }),
});
```

统一错误处理
假如约定后台返回以下格式时，做统一的错误处理。
```
{
  status: 'error',
  message: '',
}
```

编辑 utils/request.js，加入以下中间件：
```
function parseErrorMessage({ data }) {
  const { status, message } = data;
  if (status === 'error') {
    throw new Error(message);
  }
  return { data };
}
```
然后，这类错误就会走到 onError hook 里。
