<template>
  <div class="bookstore">
    <div class="topNav">
      <div class="sex" @click="getGender">
        <img v-if="gender === 1" src="../assets/man.png" class="autoImg">
        <img v-if="gender === 2" src="../assets/she.png" class="autoImg">
      </div>
      <div class="search" @click="goSearchBook">
        <input type="text" class="searchInp" placeholder="龙符">
        <van-icon name="search" size="18" color="#cdcdcd"/>
      </div>
    </div>
    <div class="topHeader">
      <van-tabs v-model="tabsActive"  background="rgba(255,255,255,0)">
        <van-tab v-for="(itme,index) in product" :key="index" :title="itme.name" :to="{name: titleTo[index].routerName,query:{id:itme.url}}" @click="getUuid(itme)" >
          <!-- <router-view></router-view> -->
          <!-- <keep-alive include="Selection,Gratis,Man,She,Publishing,Listen">
            
          </keep-alive> -->
          <keep-alive :max="6">
            <router-view/>
          </keep-alive>
        </van-tab>
      </van-tabs>
      
    </div>
  </div>
</template>

<script>
  export default {
    name:'Bookstore',
    data() {
      return {
        tabsActive: 0,
        product: '',
        value: '',
        id:'',
        num:1,
        titleTo:[
          {
            routerName:'selection',
          },
          {
            routerName:'gratis',
          },
          {
            routerName:'man',
          },
          {
            routerName:'she',
          },
          {
            routerName:'publishing',
          },
          {
            routerName:'listen',
          },

        ]
      };
    },
    
    computed:{
      
    },
    created(){
      this.getData()
    },
    methods:{
      getUuid(){
        console.log('执行了');
      },
      getData(){
        this.axios({
        method: 'get',
        url: 'https://apis.netstart.cn/yunyuedu/store/navi.json?',
        params: {
          gender: this.gender
        }
      }).then(result => {
        // this.$router.push({path: '/bookstore', query:{uuid: result.data.data.navi[0].id}
        // });
        console.log(result);
        if (result.data.resCode === 0) {
          this.product = result.data.data.navi;
          this.$store.commit('updateUUid', {uuid: result.data.data.navi[0].id});
        }
        
      }).catch(err => {
        console.log('err ==> ', err);
      })
      },
      getGender(){
        
        if (this.num !== 2) {
          this.num = 2
        }else{
          this.num = 1
        }
        this.$store.commit('updateCount', {gender: this.num});
        this.getData()
        
      },
      goSearchBook(){
        this.$router.push({name:'searchBook'})
      }
    },
    computed: {
        gender () {
          return this.$store.state.gender
        }
      },
    
  }
</script>

<style lang="less" scoped>
#app.night{
  .bookstore{
    height: 100%;
    background-color: #2f2f2f;
  }
  .search{
    background: #555;
  }
  .sex{
    background-color: #555;
  }
  
}
.bookstore{
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .topNav{
    padding: 10px 10px;
    display: flex;
    align-items: center;
    z-index: 2;
    .sex{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      margin-right: 10px;
      box-shadow: 0px 5px 50px rgba(0,0,0,0.1);
      .autoImg{
        width: 18px;
        height: 18px;
        display: block;
        margin: 5px auto;
      }
    }
    .search{
      flex: 1;
      width: 35px;
      height: 30px;
      border-radius: 35px;
      padding: 3px 8px;
      box-shadow: 0px 5px 50px rgba(0,0,0,0.1);


      display: flex;
      align-items: center;
      
      .searchInp{
        width: 100%;
        height: 100%;
        background:none;  
        outline:none;  
        border:none;
      }
    }
  }
  .topHeader{
    /deep/.van-tab{
      color: #9e9e9e;
    }
    /deep/ .van-tab--active{
      color: #2d2d2d;
      font-size: 16px;
      font-weight: 600;
    }
    /deep/ .van-tabs__line{
      width: 20px;
    }
  }
  
}
</style>