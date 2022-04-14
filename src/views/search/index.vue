<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li v-show="params.categoryName" class="with-x">
              {{ params.categoryName }}<i @click="deleteClassBread">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li v-show="params.keyword" class="with-x">
              {{ params.keyword }}<i @click="deleteKeywordBread">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li v-show="params.trademark" class="with-x">
              {{ params.trademark.split(":")[1]
              }}<i @click="deleteTradeBread">×</i>
            </li>
            <!-- 属性面包屑 -->
            <li
              v-for="(prop, index) in params.props"
              :key="index"
              class="with-x"
            >
              {{ prop.split(":")[1] }}<i @click="deleteAttrBread(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @getAttr="handleAttr"
          @getTrade="handleTrade"
          :trademarkList="trademarkList"
          :attrsList="attrsList"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: currentId == 1 }" @click="handleSort(1)">
                  <a href="javascript:void(0)">
                    综合
                    <i
                      v-show="currentId == 1"
                      class="iconfont"
                      :class="{
                        'icon-up': this.params.order.indexOf('asc') != -1,
                        'icon-down-copy':
                          this.params.order.indexOf('desc') != -1,
                      }"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: currentId == 2 }" @click="handleSort(2)">
                  <a href="javascript:void(0)">
                    价格
                    <i
                      v-show="currentId == 2"
                      class="iconfont"
                      :class="{
                        'icon-up': this.params.order.indexOf('asc') != -1,
                        'icon-down-copy':
                          this.params.order.indexOf('desc') != -1,
                      }"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li v-for="goods in goodsList" :key="goods.id" class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link to="/detail">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">
                      {{ goods.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有<span>{{ goods.hotScore }}</span
                      >人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >
                      加入购物车
                    </a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">
                      收藏
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            @getPage="changePage"
            :pageNo="params.pageNo"
            :pageSize="params.pageSize"
            :total="goodsTotal"
            :continue="5"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "@/components/pagination/Pagination";
import { mapGetters } from "vuex";
export default {
  name: "search",
  components: { SearchSelector, Pagination },
  data() {
    return {
      currentId: 1,
      params: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: "",
      }
    };
  },
  computed: {
    ...mapGetters(["attrsList", "goodsList", "trademarkList","goodsTotal"]),
  },
  watch: {
    $route: {
      handler(newVal) {
        // 初始化参数
        this.initSearchParams();
        // 合并请求参数和路由参数
        Object.assign(this.params, newVal.params, newVal.query);
        // 重新请求数据
        this.getData();
      },
    },
  },
  methods: {
    // 获取数据
    getData() {
      this.$store.dispatch("getGoodsList", this.params);
    },
    // 初始化参数
    initSearchParams() {
      this.params.category1Id = undefined;
      this.params.category2Id = undefined;
      this.params.category3Id = undefined;
      this.params.categoryName = undefined;
      this.params.keyword = undefined;
      this.params.pageNo = 1;
    },
    // 删除分类面包屑
    deleteClassBread() {
      this.$router.push({ path: "/search", params: this.$route.params });
    },
    // 删除关键字面包屑
    deleteKeywordBread() {
      this.$bus.$emit("clearKeyword");
      this.$router.push({ path: "/search", query: this.$route.query });
    },
    // 处理品牌
    handleTrade(item) {
      this.params.trademark = `${item.tmId}:${item.tmName}`;
      // 分页置为1
      this.params.pageNo = 1;
      // 获取数据
      this.getData();
    },
    // 删除品牌面包屑
    deleteTradeBread() {
      this.params.trademark = "";
      // 分页置为1
      this.params.pageNo = 1;
      // 获取数据
      this.getData();
    },
    // 处理属性
    handleAttr(attr, childItem) {
      const _attrStr = attr.attrId + ":" + childItem + ":" + attr.attrName;
      const _index = this.params.props.findIndex((item) => item === _attrStr);
      _index === -1 && this.params.props.push(_attrStr);
      // 分页设为1
      this.params.pageNo = 1;
      // 获取数据
      this.getData();
    },
    // 删除属性面包屑
    deleteAttrBread(index) {
      this.params.props.splice(index, 1);
      this.params.pageNo = 1;
      this.getData();
    },
    // 点击排序
    handleSort(num) {
      const _originSort = this.params.order.split(":")[1];
      const _originId = this.params.order.split(":")[0];
      var _sort = "desc";

      this.currentId = num;

      if (num == _originId) {
        _sort = _originSort === "desc" ? "asc" : "desc";
      }

      this.params.order = num + ":" + _sort;

      this.params.pageNo = 1;

      this.getData();
    },
    // 点击分页
    changePage(page) {
      this.params.pageNo = page;
      this.getData();
    },
  },
  created() {
    // 合并请求参数
    const _routeParams = this.$route.params;
    const _routeQuery = this.$route.query;
    Object.assign(this.params, _routeParams, _routeQuery);
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
