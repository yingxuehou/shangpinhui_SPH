<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul v-for="cart in cartInfoList"
            :key="cart.id"
            class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox"
                   name="chk_list"
                   data-check = 'check'
                   @change="handleCheckedChange(cart.skuId,$event)"
                   :checked="cart.isChecked">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="changeNum('sub',cart.skuId,cart.skuNum)"
               href="javascript:void(0)"
               class="mins">-</a>
            <input @blur="changeNum('input',cart.skuId,cart.skuNum,$event)"
                   :value="cart.skuNum"
                   autocomplete="off"
                   type="text"
                   minnum="1"
                   class="itxt">
            <a @click="changeNum('add',cart.skuId)"
               href="javascript:void(0)"
               class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none"
               class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll"
               :checked="isCheckAll"
               @click="handleAllCheckChange($event)"
               type="checkbox">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedGoodsList.length}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{account}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn"
             href="###"
             target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShopCart',
  methods: {
    // 获取数据
    getData() {
      this.$store.dispatch('getCartInfo')
    },
    // 修改商品数量
    /**
     * type:操作类型 add:+1  sub: -1  input:输入操作
     * skuId:商品id
     * skuNum: 数据库中的商品数量
     * event: 事件对象
     */
    async changeNum(type,skuId,skuNum,event){
      let _skuNum = 0
      switch (type) {
        case 'add':
          _skuNum = 1
          break;
        case 'sub':
          _skuNum = skuNum > 1 ? -1 : 0
          break;
        case 'input':
          let _num = event.target.value * 1
          // 处理非法字符串
          if(isNaN(_num)){
            event.target.value = skuNum
            _skuNum = 0
          }else{
            _skuNum = _num - skuNum
          }
          break;
      }

      try {
        // 派action，更新商品数量
        await this.$store.dispatch('addToCart', {skuId: skuId,skuNum: _skuNum})
        // 重新获取数据
        this.getData()
      } catch (error) {
        alert('修改商品数量失败：' + error.message)
      }
    },
    // 单个商品状态改变
    async handleCheckedChange(skuId,event){
      const params = {skuID:skuId,isChecked:event.target.checked ? 1 : 0}
      try {
        await this.$store.dispatch('setChecked',params)
        // 重新获取数据
        this.getData()
      } catch (error) {
        alert('修改商品选中状态失败：'+ error.message)
      }
    },
    // 全选、全不选
    async handleAllCheckChange(e){
      // 派发action，修改所有与商品选中状态
      try {
        await this.$store.dispatch('setAllGoodsChecked',e.target.checked ? '1' : '0')
        // 重新获取数据
        this.getData()
      } catch (error) {
        alert("商品更新失败")
      }
    }
  },
  computed: {
    ...mapGetters(['cartInfoList']),
    isCheckAll(){
      return this.cartInfoList.every(item=>item.isChecked == '1')
      // let _flag = true
      // this.cartInfoList.forEach(item=>{
      //   if(!item.isChecked) _flag=false
      // })
      // return _flag
    },
    checkedGoodsList(){
      return this.cartInfoList.filter(item=>item.isChecked)
    },
    account(){
      let _account = 0
      this.checkedGoodsList.forEach(item=>{_account += (item.skuNum * item.skuPrice)})
      return _account
    }
  },
  mounted() {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>