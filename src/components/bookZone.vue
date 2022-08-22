<!-- 好书专区 -->
<template>
<div class='bookZone-box'>
  <div class="top-title">{{list.name}}</div>
  
  <div class="bookZone-item" v-for="(item,index) in list.list" :key="index" @click="toBook(item)">
    <div class="bookZone-img">
      <img class="auto-img" :src="item.cover" alt="">
    </div>
    <div class="bookZone-text">
      <div class="bookZone-title">{{item.title}}</div>
      <div class="introduce van-multi-ellipsis--l2">{{item.content}}</div>
      <div class="bookZone-name">
        <div>{{item.author}} / {{item.category}}</div>
        <div class="right-text">立即阅读<van-icon name="arrow" /></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props:['list'],
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
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
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
#app.night{
  .top-title,.bookZone-title{
    color: #777;
  }
  .bookZone-img{
    opacity: .5;
    background-color: #312b2d;
    box-shadow: 2px 2px 8px #312b2d;
  }
  .bookZone-text{
    color: #555;
  }
}
.bookZone-box{
  margin-top: 20px;
  padding: 0 25px;
  .top-title{
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 15px;
  }
  .bookZone-item{
    display: flex;
    margin-bottom: 20px;
    &:last-child{
      margin-bottom: 0;
    }
    .bookZone-img{
      width: 75px;
      height: 100px;
      background-color: #ccc;
      box-shadow: 2px 2px 8px #ccc;
      margin-right: 10px;
    }
    .bookZone-text{
      flex: 1;
      color: #777;
      .bookZone-title{
        font-size: 14px;
        font-weight: 600;
        color: #000;
      }
      .introduce{
        margin: 10px 0;
      }
      .bookZone-name{
        display: flex;
        .right-text{
          margin-left: auto;
        }
      }
    }
  }
}
</style>