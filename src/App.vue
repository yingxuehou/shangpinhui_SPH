<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>

import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  mounted(){
    // 获取三级联动数据
    this.$store.dispatch('getCategoryList')
  }
}
</script>
