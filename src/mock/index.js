// 1.引入Mock
import Mock from 'mockjs'

import bannerData from './banner.json'
import floorData from './floor.json'

Mock.mock('/mock/banner', function () {
  return {
    code: 200,
    data: bannerData
  }
})

Mock.mock('/mock/floor', function(){
  return {
    code: 200,
    data: floorData
  }
})