## 简介
用vue实现饿了么的整个项目，涉及40+个页面。后台接口参考[github的这个项目](https://github.com/bailicangdu/node-elm/blob/master/API.md)，这个项目完成后是饿了么webapp的一整套流程，从注册，登录，添加购物车一直到下单。其中涉及购物车，商品展示，下单等复杂的业务。
写这个项目的原因是业务足够复杂有一定的挑战性，是个很好的练习提升vue的机会。

## 技术栈
vue2 + vuex + vue-router + axios + webpack + ES6/7 + sass + flex + svg

## 项目运行

``` bash
# install dependencies
npm install
or
cnpm install
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 最终功能
- [x] 定位功能
- [x] 选择城市
- [x] 搜索地址
- [x] 展示所选地址附近商家列表
- [x] 搜索美食，餐馆 -- 完成
- [x] 根据距离、销量、评分、特色菜、配送方式等进行排序和筛选
- [x] 餐馆食品列表页
- [x] 购物车功能 -- 完成
- [x] 店铺评价页面
- [] 单个食品详情页面
- [] 商家详情页
- [x] 登录、注册
- [] 修改密码
- [x] 个人中心
- [] 发送短信、语音验证
- [] 下单功能
- [] 订单列表
- [] 订单详情
- [] 下载App
- [] 添加、删除、修改收货地址
- [] 帐户信息
- [] 服务中心
- [] 红包
- [] 上传头像
- [ ] 付款 -- 臣妾做不到啊~~
## 说明
 当然，开始写的时候也可以根据原型图和界面功能结构一个个往下写，[饿了么app原型图链接地址](https://www.xiaopiu.com/user?uid=5b69b06ec496fe18064cd5c0&libPop=project&libId=5b69b085c496fe18064cd5c2)

## 附录
![图片](https://github.com/kkxiaojun/vue-ele-kk/blob/master/static/main.jpg)
