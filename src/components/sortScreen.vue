<!-- 分类模块筛选 -->
<template>
<div class='box'>
  <div class="sort-screen">
    <div class="sort-top">
      <div class="sort" :class="{active : sortIndex === index}" v-for="(item,index) in sortData" :key="index" @click="upSortIndex(item,index)">{{item.name}}</div>
      
      <div class="screen" @click="show = !show">
        <div class="triangle"></div>
        <div>筛选</div>
      </div>
    </div>
    <transition name="fade">
      <div class="sort-bottom-box" v-if="show" >
          <div class="sort-bottom">
            <div class="sort-bottom-text" v-for="(item,index) in pay" :key="index" @click="upPayIndex(item,index)" :class="{active : payIndex === index}">{{item.name}}</div>
          </div>
          <div class="sort-bottom">
            <div class="sort-bottom-text" v-for="(item,index) in bookStatus" :key="index"  @click="upBookStatusIndex(item,index)" :class="{active : bookStatusIndex === index}">{{item.name}}</div>
          </div>
          <div class="sort-bottom">
            <div class="sort-bottom-text" v-for="(item,index) in wordCount" :key="index"  @click="upWordCountIndex(item,index)" :class="{active : wordCountIndex === index}">{{item.name}}</div>
          </div>
      </div>
    </transition>

    <keep-alive :max="10">

      <sortBookItem :list="sortBookData"></sortBookItem>
    </keep-alive>
    
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import sortBookItem from "../components/sortBookItem.vue"
export default {
//import引入的组件需要注入到对象中才能使用
props:['list','catId'],
components: {sortBookItem},
data() {
//这里存放数据
return {
  show:false,
  categories:[],
  sortIndex:0,
  sortData:[],

  payIndex:0,
  pay:[],
  bookStatus:[],
  bookStatusIndex:0,
  wordCount:[],
  wordCountIndex:0,

  sortBookData:[],


  sortValue:1,
  wordCountValue:0,
  bookStatusValue:0,
  payValue:0,
  page:1,
};
},
//监听属性 类似于data概念
computed: {
  navIndex(){
    return this.$store.state.navIndex;
  }
},
//监控data中的数据变化
watch: {
  navIndex(){
    this.payIndex = 0;
    this.bookStatusIndex = 0;
    this.wordCountIndex = 0;
    this.sortIndex = 0;
    this.sortValue= 1;
    this.wordCountValue= 0;
    this.bookStatusValue= 0;
    this.payValue= 0;
    this.page= 1;
    this.show = false
    this.sortBookData =[]
    this.getScreenBookData()
  },
  list(){
    this.payIndex = 0;
    this.bookStatusIndex = 0;
    this.wordCountIndex = 0;
    this.sortIndex = 0;
    this.sortValue= 1;
    this.wordCountValue= 0;
    this.bookStatusValue= 0;
    this.payValue= 0;
    this.page= 1;
    this.show = false
    this.sortBookData =[]
    this.getScreenBookData()
  }
},
//方法集合
methods: {
  getSortScreenData(){
    this.axios.get(`https://apis.netstart.cn/yunyuedu${this.list[this.navIndex].url}`).then(result => {
      console.log('result ==> ',result);
      let categories = result.data.categories
      console.log(categories);
      this.categories = categories
      this.categories.forEach(v => {
        if(v.type === 'pay'){
          this.pay = v.catArray
        }else if(v.type === 'bookStatus'){
          this.bookStatus = v.catArray
        }else if(v.type === 'wordCount'){
          this.wordCount = v.catArray
        }else if(v.type === 'sort'){
          this.sortData = v.catArray
        }
      })
    })
  },
  upPayIndex(item,i){
    this.payIndex = i
    this.payValue = item.value
    this.sortBookData = []
    this.getScreenBookData()
  },
  upBookStatusIndex(item,i){
    this.bookStatusIndex = i
    console.log('item2 ==> ',item);
    this.bookStatusValue = item.value
    this.sortBookData = []
    this.getScreenBookData()
  },
  upWordCountIndex(item,i){
    this.wordCountIndex = i
    console.log('item3 ==> ',item);
    this.wordCountValue = item.value
    this.sortBookData = []
    this.getScreenBookData()
  },
  upSortIndex(v,i){
    let sort = v.value
    console.log('v==> ',v);
    this.sortIndex = i
    this.sort = v.value
    this.sortBookData = []
    this.getScreenBookData()
  },
  getScreenBookData(){
    this.axios.get('https://apis.netstart.cn/yunyuedu/source/v2/searchBook.json',{
      params:{
        catId: this.catId,
        wordCount:this.wordCountValue,
        pay:this.payValue,
        bookStatus:this.bookStatusValue,
        sort:this.sortValue,
        page:this.page,
      }
    }).then(result => {
      this.sortBookData.push(...result.data.list)
      console.log(result);
    })
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  setTimeout(()=>{
    // console.log('list ==> ',this.list);
    this.getSortScreenData()
    this.getScreenBookData()
  },1000)
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
  
},
beforeCreate() {
  
}, //生命周期 - 创建之前
beforeMount() {
  
}, //生命周期 - 挂载之前
beforeUpdate() {
  
}, //生命周期 - 更新之前
updated() {
  
}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
#app.night{
  .box{
    background-color: #2f2f2f;
  }
  .screen{
    color: #666;
    border: 1px solid #666;
  }
  .sort{
    color: #777;
  }
  .active{
    color: #993832;
  }
}
.sort{
  margin-right: 15px;
}
.active{
  color: #e84b2c;
}
.box{
  padding: 10px 20px;
  font-size: 14px;
  .sort-screen{
    
    .sort-top{
      display: flex;
      align-items: center;
    }
    .division{
      margin: 0 5px;
    }
    .screen{
      padding: 01px 5px;
      padding-left: 15px;
      color: #a2a2a2;
      margin-left: auto;
      border-radius: 10px;
      border: 1px solid #a2a2a2;
      position: relative;
      .triangle{
        width: 10px;
        height: 10px;
        // background-color: #989898;
        border-top: 6px solid #a2a2a2;
        border-bottom: 5px solid transparent;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        margin: 0 5px;
        position: absolute;
        top: 8px;
        left: -1px;
      }
    }
    .sort-bottom{
      color: #666666;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .sort-bottom-text{
        margin-right: 15px;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>