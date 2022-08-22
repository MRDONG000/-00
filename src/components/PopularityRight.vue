<!--  -->
<template>
  <div class="box">
    <div class="right-item-box" v-for="(item,index) in PopularityData" :key="index">
      <div class="img">
        <img class="auto-img" :src="item.cover" alt="">
      </div>
      <div class="text-box">
        <div class="top-title-box">
          <div class="title">{{item.title}}</div>
          <div class="num">{{index+1}}</div>
        </div>
        <div class="introduce ">
          {{item.content}}
        </div>
        <div class="author-info">
          <div class="name">{{item.author}}</div>
          <div class="division">|</div>
          <div class="type">{{item.category}}</div>
          <!-- <div class="popularity">2.7万人气</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  props: ["list"],
  components: {},
  data() {
    //这里存放数据
    return {
      all: 0,
      PopularityData:[],
    };
  },
  //监听属性 类似于data概念
  computed: {
    index() {
      return this.$store.state.rankingIndex;
    },
  },
  //监控data中的数据变化
  watch: {
    index() {
      this.PopularityData = []
      this.getPopularityData()
    },
  },
  //方法集合
  methods: {
    //获取排行榜数据
    getPopularityData() {
      let url = this.list[this.index].naviInfos[0].url;
      const id = url.substring(0, url.indexOf("&all=0"));
      this.axios
        .get(`https://apis.netstart.cn/yunyuedu${url}`, {
          parmas: {
            all: this.all,
          },
        })
        .then((result) => {
          this.PopularityData.push(...result.data.list)
          console.log("result ==> ", result);
        });
      console.log(this.list[this.index].naviInfos[0].url);
      console.log("url ==> ", url);
      console.log("id ==> ", id);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getPopularityData();
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
.box {
  width: 100%;
  padding: 15px 15px;
}
.right-item-box {
  margin-bottom: 20px;
  &:last-child{
    margin-bottom: 0;
  }
  display: flex;
  .img {
    width: 60px;
    height: 80px;
    margin-right: 10px;
    background-color: #ccc;
    border-radius: 5px;
  }
  .text-box {
    color: #c1c1c1;
    font-size: 14px;
    flex: 1;
    .top-title-box {
      display: flex;
      align-items: center;

      .title {
        font-size: 16px;
        color: #000;
      }
      .num {
        font-size: 16px;
        margin-left: auto;
      }
    }
    .introduce {
      width: 190px;
      margin-top: 10px;
      margin-bottom: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .author-info {
      display: flex;
      align-items: center;
      .division {
        margin: 0 5px;
      }
      .popularity {
        margin-left: auto;
        color: #ec6868;
      }
    }
  }
}
</style>
