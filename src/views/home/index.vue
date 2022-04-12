<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="(floor,index) in floorList" :key="index" :floorData="floor" />
    <!-- <Floor /> -->
    <Brand />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

  export default {
    name:'Home',
    components:{
      ListContainer,
      TodayRecommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    computed:{
      ...mapState({
        floorList: state=>state.home.floorList
      })
    },
    mounted(){
      this.$store.dispatch('getFloorList')
    }
  }
</script>
<style lang="less" scoped>

</style>