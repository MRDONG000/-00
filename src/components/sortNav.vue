<!--  -->
<template>
<div class='box'>
  <div class="sort-nav">
    <div class="nav-item" :class="{active : index===navIndex}" v-for="(item,index) in list" :key="index" @click="navActive(item,index)">
      {{item.name}}
    </div>
  </div>

  <keep-alive :max="10">

    <sortScreen :list="list" :catId="catId"></sortScreen>
  </keep-alive>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import sortScreen from '../components/sortScreen.vue'

export default {
  props:['list'],
//import引入的组件需要注入到对象中才能使用
components: {sortScreen},
data() {
//这里存放数据
return {
  navIndex:0,
  catId:7,
};
},
//监听属性 类似于data概念
computed: {
  active(){
    return this.$store.state.active
  }
},
//监控data中的数据变化
watch: {
  list:function(){
    this.upSortNavCatId()
  }
},
//方法集合
methods: {
  navActive(item,index){
    this.navIndex = index
    this.$store.commit('upNavIndex', {navIndex: this.navIndex});
    let url = item.url
    var index=url.lastIndexOf("catId=");
    url=url.substring(index+1,url.length);
    let catId = url.substring(5)
    this.catId = catId
  },
  
  upSortNavCatId(){
    console.log('this.list ==> ',this.list);
    let url = this.list[0].url
    var index=url.lastIndexOf("catId=");
    url=url.substring(index+1,url.length);
    let catId = url.substring(5)
    this.catId = catId
    console.log('this.catId ==>',url);
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  setTimeout(() => {
    this.upSortNavCatId()
    console.log('this.list ==> ',this.list);
  },1000)
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
  .sort-nav{
    background-color: #363435;
  }
  .nav-item{
    color: #777;
  }
  .active{
    color: #993832;
  }
}
.box{
  // margin-left: 20px;
  .sort-nav{
    background-color: #f5f5f5;
    
    padding: 0 20px;
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    .nav-item{
      margin-right: 30px;
      margin-bottom: 20px;
      position: relative;
      &:nth-child(6n){
        margin-right: 0;
      }
      &.active{
        color: #ea4b2b;
      }
      &.active::after{
        content: " ";
        position: absolute;
        left: 7px;
        bottom: -2px;
        width: 50%;
        height: 2px;
        border-radius: 5px;
        background-color: #ea4b2b;
      }
    }
  }
}
</style>