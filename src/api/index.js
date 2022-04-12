import request from "./request";
import mockRequest from "./mockAjax";

// 获取三级联动导航
export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取轮播图
export const reqBannerList = () => mockRequest({ url: '/mock/banner', method: 'get' })

// 获取楼层数据
export const reqFloorData = () => mockRequest({ url:'/mock/floor', method: 'get' })