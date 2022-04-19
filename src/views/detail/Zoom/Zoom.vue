<template>
  <div class="spec-preview">
    <img v-if="imageList.length" :src="imageList[currentIndex].imgUrl" />
    <div class="event" @mousemove="handleMouseMove($event)"></div>
    <div class="big">
      <img v-if="imageList.length" ref="imgs" :src="imageList[currentIndex].imgUrl" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['imageList'],
    data () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      // 鼠标移动
      handleMouseMove(e){
        // 获取元素
        const _maskDOM = this.$refs.mask
        const _imgDOM = this.$refs.imgs
        // 基于鼠标位置 获取左上距离
        let _left = e.offsetX - _maskDOM.offsetWidth/2
        let _top = e.offsetY - _maskDOM.offsetHeight/2
        // 修正 左上位置
        _left < 0  ? (_left = 0) : (_left > _maskDOM.offsetWidth ? (_left = _maskDOM.offsetWidth) : (''))
        _top < 0 ? (_top = 0) : (_top > _maskDOM.offsetHeight ? (_top = _maskDOM.offsetHeight) : (''))
        // 样式赋值
        _maskDOM.style.left = _left + 'px'
        _maskDOM.style.top = _top + 'px'
        _imgDOM.style.left = -2*_left + 'px'
        _imgDOM.style.top = -2*_top + 'px'
      }
    },
    mounted(){
      this.$bus.$on("getIndex",(index)=>{
        this.currentIndex = index
      })
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>