<!-- 排行榜 -->
<template>
  <div class="ranking-box">
    <div class="top-nav">
      <div class="nav-left" @click="goPage">
      <van-icon name="arrow-left" size="24" color="#666"/>
    </div>
      <div class="nav-right">
        <keep-alive>
          <van-tabs v-model="active">
          <van-tab
            :title="item.name"
            v-for="(item, index) in topNavData"
            :key="index"
          >
            <div class="centen-box">
              <div class="left">
                <keep-alive>

                <PopularityLeft :list="item.subNavis"></PopularityLeft>
                </keep-alive>
              </div>
              <div class="right">
                <keep-alive>
                  <PopularityRight :list="item.subNavis"></PopularityRight>
                </keep-alive>
              </div>
            </div>
          </van-tab>
        </van-tabs>
        </keep-alive>
        
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import PopularityLeft from "../components/PopularityLeft.vue";
import PopularityRight from "../components/PopularityRight.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { PopularityLeft, PopularityRight },
  data() {
    //这里存放数据
    return {
      active: 0,
      topNavData: [],
    };
  },
  //监听属性 类似于data概念
  computed: {
    url(){
      return this.$route.query.url
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //排行榜分类数据
    classification() {
      this.axios
        .get(`https://apis.netstart.cn/yunyuedu${this.url}`)
        .then((result) => {
          console.log("result==> ", result);
          this.topNavData = result.data.data.list;
          this.topNavData.forEach((v, i) => {
            if (v.select) {
              this.active = i;
            }
          });
        });
    },
    goPage(){
      this.$router.go(-1)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.classification();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.ranking-box {
  .top-nav {
    // padding: 0 20px;
    // margin-top: 20px;
    // display: flex;
    // align-items: center;
    position: relative;
    .nav-left {
      z-index: 1000;
      position: absolute;
      left: 22px;
      top: 10px;
      // margin-left: 10px;
      // margin-right: 20px;
    }
    .nav-right {
      // flex: 1;
      // margin-left: 50px;
      
    }
  }
  .centen-box {
    display: flex;
    .right{
      height: 100vh;
      flex: 1;
      border-left: 1px solid rgb(232, 230, 230);
    }
  }
}
/deep/.van-tabs__wrap {
  padding-left: 60px;
}
/deep/.van-sidebar-item{
  background-color: #fff;
}
/deep/.van-sidebar-item--select{
  color: #ee0a24;
}
/deep/.van-tabs__wrap{
  border-bottom: 1px solid rgb(232, 230, 230);
}
</style>
