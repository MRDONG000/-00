<!--  -->
<template>
<div class="book-box">
  <div>
    <van-empty description="没有找到你想要的内容" v-if="list.length === 0"/>
  </div>
  <div class='book-item-box'>
    <div class="book-item" v-for="(item,index) in list" :key="index" @click="goBookDetail(item)">
    <div class="img">
      <img class="auto-img" :src="item.cover" alt="">
    </div>
    <div class="book-name van-ellipsis">{{item.title}}</div>
    <div class="name van-ellipsis">{{item.author}}</div>
  </div>
  </div>
  
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
props:['list'],
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
  goBookDetail(v){
    // console.log('v ==> ',v.id);
    this.$router.push({name:'bookDetail',query:{id:v.id}})
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
  
  .img{
    opacity: .5;
    background-color: #2d2d2d;
      box-shadow: 2px 2px 8px #2d2d2d;
  }
  .book-name{
    color: #777;
  }
  .name{
    color: #555;
  }
  
}
.book-item-box{
  padding-bottom: 50px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .book-item{
    width: 98px;
    margin-right: 20px;
    margin-bottom: 20px;
    &:nth-child(3n){
      margin-right: 0;
    }
    .img{
      width: 98px;
      height: 135px;
      background-color: #ccc;
      box-shadow: 2px 2px 8px #ccc;
      
    }
    .book-name{
      margin-top: 15px;
      margin-bottom: 3px;
    }
    .name{
      color: #666;
    }
  }
}
</style>