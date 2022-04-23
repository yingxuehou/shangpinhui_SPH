import request from "./request";
import mockRequest from "./mockAjax";

// 获取三级联动导航
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取轮播图
export const reqBannerList = () => mockRequest({ url: '/mock/banner', method: 'get' })

// 获取楼层数据
export const reqFloorData = () => mockRequest({ url: '/mock/floor', method: 'get' })

// 获取搜索商品数据
export const reqGoodsList = (params) => request({ url: '/list', method: 'post', data: params })

// 获取商品详情
export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}` })

// 添加到购物车(对已有物品进行数量改动)
export const reqAddToCart = ({ skuId, skuNum }) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车列表
export const reqCartList = () => request({ url: '/cart/cartList' })

// 切换商品选中状态
export const reqChangeChecked = ({ skuID, isChecked }) => request({ url: `/cart/checkCart/${skuID}/${isChecked}` })

// 删除一件商品
export const reqDeleteGoods = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 获取验证码
export const reqVerifyCode = (phone) => request({ url: `/user/passport/sendCode/${phone}` })

// 用户注册
export const reqRegister = (params) => request({ url: '/user/passport/register', method: 'post', data: params })

// 用户登录
export const reqLogin = (params) => request({ url: '/user/passport/login', method: 'post', data: params })

// 获取用户信息
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo' })

// 退出登陆
export const reqLogout = () => request({ url: '/user/passport/logout' })

// 获取地址列表
export const reqAddressList = () => request({ url: '/user/userAddress/auth/findUserAddressList' })

// 获取订单信息
export const reqOrderDetail = () => request({ url: '/order/auth/trade' })

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data: data })

// 获取订单支付信息
export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}` })

// 查询支付订单状态
export const reqOrderStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}` })