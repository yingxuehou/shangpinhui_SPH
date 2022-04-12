<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div v-for="banner in bannerList" :key="banner.id" class="swiper-slide">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
  export default {
    name:'Carouse',
    props:['bannerList'],
    watch:{
     bannerList:{
       immediate: true,
       handler(){
         this.$nextTick(()=>{
            new Swiper(this.$refs.mySwiper,{
              loop: true,
              pagination: {
                el:'.swiper-pagination',
                clickable: true,
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            })
          })
       }
     } 
    }
  }
</script>
<style lang="less" scoped>
  
</style>