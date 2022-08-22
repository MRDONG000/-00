<!--  -->
<template>
<div class='freeBook-box'>
  <div class="freeBook-item">
    <div class="freeBook-top">
      <div class="title">{{list.name}}</div>
      <div class="timer">
          <div><van-icon name="clock-o" size="18"/> </div>
          <van-count-down :time="list.time_limit">
            <template #default="timeData">
              <span class="block">{{ timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
    </div>
    <div class="freeBook-img-box">
      <div class="book-item" v-for="(item,index) in list.list" :key="index" @click="toBook(item)">
        <div class="book-img">
          <img class="auto-img" :src="item.cover" alt="">
        </div>
        <div class="book-name">{{item.title}}</div>
        <div class="book-parive">{{item.nwprice}} 阅点/千字</div>
        <div class="free">{{item.discountDesc}}</div>
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
  time: 0,
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
  console.log(this.list);
  this.time = this.list.time_limit
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
  .title{
    color: #787878;
  }
}
.freeBook-item{
  margin-top: 10px;
  padding: 0 25px;
  .freeBook-top{
    display: flex;
    align-items: center;
    .title{
      font-size: 18px;
      font-weight: 600;
    }
    .timer{
      font-size: 14px;
      margin-left: auto;
      color: #fff;
      padding: 2px 10px;
      border-radius: 20px;
      background-color: #ffa64c;
      display: flex;
      align-items: center;
    }
  }
  .freeBook-img-box{
    margin-top: 15px;
    display: flex;
    .book-item{
      margin-right: 15px;
      &:last-child{
        margin-right: 0;
      }
      .book-img{
        width: 100px;
        height: 140px;
        background-color: #ccc;
        box-shadow: 2px 2px 8px #ccc;

      }
      .book-name{
        margin-top: 15px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 550;
      }
      .book-parive{
        color: #777;
        text-decoration: line-through
      }
      .free{
        margin-top: 3px;
        color: #d7664d;
      }
    }
  }
}
.colon {
    display: inline-block;
    margin: 0 4px;
    color: #fff;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #ee0a24;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
  }
</style>