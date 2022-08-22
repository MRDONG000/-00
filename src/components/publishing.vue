<!-- 出版模块 -->
<template>
  <div class="publishing-box">
    <div class="publishing-item" v-for="(item,index) in list" :key="index" >
      <div class="top-title">{{item.name}}</div>
      <div class="book-box">
        <div class="publishing-book" v-for="(v,i) in item.list" :key="i" @click="toBook(v)">
          <div class="book-img">
            <img class="auto-img" :src="v.cover" alt="">
          </div>
          <div class="book-name van-multi-ellipsis--l2">
            {{v.title}}
          </div>
          <div class="name van-ellipsis">{{v.author}}</div>
        </div>
      </div>
      <div class="van-hairline--bottom"></div>
    </div>
    
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: ["list"],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toBook(item){
        console.log('item ==> ',item.id);
        this.$router.push({path:'/readBook',query:{uuid:item.id}})
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
#app.night{
  .top-title,.book-name{
    color: #777;
  }
  .book-img{
    opacity: .5;
    background-color: #312b2d;
    box-shadow: 2px 2px 8px #312b2d;
  }
  .name{
    color: #555;
  }
}
/deep/.van-hairline--bottom{
  margin: 20px 0;
}
.book-box {
  display: flex;
}
.publishing-box {
  padding: 0 25px;
  .publishing-item {
    margin-bottom: 40px;
    .top-title {
      font-size: 18px;
      font-weight: 600;
    }
    .publishing-book {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
      margin-top: 15px;
      width: 75px;
      .book-img {
        width: 75px;
        height: 100px;
        background-color: #ccc;
        box-shadow: 2px 2px 8px #ccc;
      }
      .book-name {
        margin-top: 10px;
        font-size: 14px;
      }
      .name {
        margin-top: 5px;
        color: #666;
      }
    }
  }
}
</style>
