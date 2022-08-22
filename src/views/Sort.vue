<template>
  <div class="box">
    <div class="sort-top-nav">
      <keep-alive >
        <van-tabs v-model="active">
        <van-tab :title="item.name" v-for="(item,index) in topNavData" :key="index">
          <keep-alive :max="10">
          <sortNav :list="sortData"></sortNav>
          </keep-alive>
        </van-tab>
        
      </van-tabs>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import sortNav from '../components/sortNav.vue'
  export default {
    name:'Sort',
    data(){
      return {
        active:0,
        topNavData:[],
        sortUrl:'',
        sortData:[],
      }
    },
    components:{sortNav},
    watch:{
      active:function(){
        this.upActive()
        this.getData()
      }
    },
    methods:{
      //顶部导航数据
      async getData(){
        await this.axios.get('https://apis.netstart.cn/yunyuedu/store/node.json').then(result => {
          console.log('result ==> ',result);

          this.topNavData = result.data.books
          this.sortUrl = this.topNavData[this.active].node[0].url
          console.log('this.sortUrl ==> ',this.sortUrl);
          this.getSortData()
        })
        // let result = this.axios.get('https://apis.netstart.cn/yunyuedu/store/node.json')
        //   console.log('result ==> ',result);
          // this.topNavData = result.data.books
          // this.sortUrl = this.topNavData[this.active].node[0].url
          
          // this.getSortData()

      },
      //分类导航数据
      getSortData(){
        // console.log(this.sortUrl);
         this.axios.get(`https://apis.netstart.cn/yunyuedu${this.sortUrl}`).then(result => {
          this.sortData = result.data.list[0].labels
        })
      },
      upActive(){
        this.$store.commit('upActive',{active:this.active})
      }
      
    },
    created(){
      this.getData()
    }
  }
</script>

<style lang="less" scoped>
#app.night{
  .sort-top-nav{
    height: 100vh;
    background-color: #2f2f2f;
  }
}
.sort-top-nav{
  // padding: 0 20px;
}
/deep/.van-tabs__wrap{
  width: 70%;
  margin-left: 10px;
}
/deep/.van-tabs__line{
  background-color: #fff;
}
/deep/.van-tab--active{
  font-size: 16px;
  font-weight: 600;
}
</style>