<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="handlePage(pageNo - 1)">
      上一页
    </button>
    <button
      @click="handlePage(1)"
      v-show="start != 1"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>

    <button v-show="start > 2">···</button>

    <button
      v-for="num in end"
      v-show="num >= start"
      :key="num"
      @click="handlePage(num)"
      :class="{ active: pageNo == num }"
    >
      {{ num }}
    </button>

    <button v-show="end < pageAll - 1">···</button>
    <button
      v-show="end != pageAll"
      @click="handlePage(pageAll)"
      :class="{ active: pageNo == pageAll }"
    >
      {{ pageAll }}
    </button>
    <button :disabled="pageNo == pageAll" @click="handlePage(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ this.total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continue"],
  data() {
    return {
      // start:0, //开始
      // end:0 //结束
    };
  },
  computed: {
    pageAll() {
      return Math.ceil(this.total / this.pageSize);
    },
    start() {
      // 从当前页减去二分之一连续 开始连续
      let _start = this.pageNo - parseInt(this.continue / 2);

      // 最大不超过 总页数-连续页数+1
      if (_start > this.pageAll - this.continue + 1) {
        _start = this.pageAll - this.continue + 1;
      }

      // 最小从1开始
      if (_start <= 0) {
        _start = 1;
      }

      return _start;
    },
    end() {
      // 思路一：首先计算 正常页码 ，然后考虑各种极端情况
      // let _end = this.pageNo + parseInt(this.continue / 2);

      // // 当前页 小于 二分之一连续页-------end为连续页数
      // if (this.pageNo <= Math.ceil(this.continue / 2)) {
      //   _end = this.continue;
      // }

      // // 当前页 大于 总页数减去二分之一连续数
      // if (this.pageNo > this.pageAll - parseInt(this.continue / 2)) {
      //   _end = this.pageAll;
      // }

      // // 总页数小于连续页数---end为总页数
      // if (this.pageAll <= this.continue) {
      //   _end = this.pageAll;
      // }

      // return _end;

      // 思路二（前提是开始数字已经精确计算）：
      // 1.结束数字等于 开始数字+连续页数-1
      // 2.如果结束数字大于总页数，结束数字等于总页数
      // over
      let _end = this.start + this.continue - 1;

      _end > this.total && (_end = this.total);

      return _end;
    },
  },
  methods: {
    // 点击分页
    handlePage(page) {
      this.$emit("getPage", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
