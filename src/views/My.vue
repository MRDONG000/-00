<template>
  <div class="box">
    <div class="top-nav">
      <van-nav-bar >
        <template #right>
          <van-icon name="envelop-o" size="24" color="#6e6e6e"/>
        </template>
      </van-nav-bar>
    </div>
    <div class="user-info" v-if="appkeyState">
      <div class="avatar">
        <img class="auto-img" :src="userData.avatar" alt="">
      </div>
      <div class="clickLog">{{userData.phone}}</div>
    </div>
    <div class="user-info" v-else @click="goLogin">
      <div class="avatar">
      </div>
      <div class="clickLog">点击登录</div>
    </div>
    <div class="user-Balance-box">
      <div class="left-balance">
        <div class="title">余额</div>
        <div class="two-title">充值送红包</div>
        <div class="left-btn">充值</div>
      </div>
      <div class="segmentation"></div>
      <div class="right-balance">
        <div class="title">签到</div>
        <div class="two-title">做任务领红包</div>
        <div class="right-btn">签到</div>
      </div>
    </div>
    <div class="cell-box">
      <div class="cell">
        <div class="icon-box">
          <svg t="1652356242475" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5075" width="20" height="20"><path d="M778.24 61.44a122.88 122.88 0 0 1 122.88 122.88v655.36a122.88 122.88 0 0 1-122.88 122.88H245.76a122.88 122.88 0 0 1-122.88-122.88V184.32a122.88 122.88 0 0 1 122.88-122.88h532.48z m0 61.44H245.76a61.44 61.44 0 0 0-61.3376 57.83552L184.32 184.32v655.36a61.44 61.44 0 0 0 57.83552 61.3376L245.76 901.12h532.48a61.44 61.44 0 0 0 61.3376-57.83552L839.68 839.68V184.32a61.44 61.44 0 0 0-57.83552-61.3376L778.24 122.88zM563.2 532.48a30.72 30.72 0 0 1 0 61.44h-266.24a30.72 30.72 0 0 1 0-61.44h266.24z m163.84-225.28a30.72 30.72 0 0 1 0 61.44h-430.08a30.72 30.72 0 0 1 0-61.44h430.08z" fill="#858585" p-id="5076"></path></svg>
        </div>
        <div class="title">笔记</div>
        <div class="arrow"><van-icon name="arrow"  size="16"/></div>
      </div>
      <div class="cell">
        <div class="icon-box">
          <svg t="1652356434366" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6673" width="20" height="20"><path d="M567.466667 634.325333v234.666667a21.333333 21.333333 0 0 1-21.333334 21.333333h-42.666666a21.333333 21.333333 0 0 1-21.333334-21.333333v-234.666667H413.866667a8.533333 8.533333 0 0 1-6.826667-13.653333l110.933333-147.925333a8.533333 8.533333 0 0 1 13.653334 0l110.933333 147.925333a8.533333 8.533333 0 0 1-6.826667 13.653333h-68.266666z" fill="#bfbfbf" p-id="6674"></path><path d="M768 725.333333a128 128 0 0 0 38.613333-250.112l-39.850666-12.586666-14.506667-39.253334a256.128 256.128 0 0 0-480.554667 0l-14.464 39.253334-39.850666 12.586666A128.085333 128.085333 0 0 0 256 725.333333a42.666667 42.666667 0 0 1 0 85.333334 213.333333 213.333333 0 0 1-64.341333-416.810667 341.461333 341.461333 0 0 1 640.682666 0A213.418667 213.418667 0 0 1 768 810.666667a42.666667 42.666667 0 0 1 0-85.333334z" fill="#858585" p-id="6675"></path></svg>
        </div>
        <div class="title">已购和上传</div>
        <div class="arrow"><van-icon name="arrow"  size="16"/></div>
      </div>
      <div class="cell">
        <div class="icon-box">
          <svg t="1652356550711" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7764" width="20" height="20"><path d="M840.610909 515.723636a23.272727 23.272727 0 0 1-23.272727-23.272727c0-187.578182-107.985455-304.174545-282.065455-304.174545s-282.298182 116.363636-282.298182 304.174545a23.272727 23.272727 0 0 1-46.545454 0C206.429091 279.272727 335.592727 141.730909 535.272727 141.730909S863.883636 279.272727 863.883636 492.450909a23.272727 23.272727 0 0 1-23.272727 23.272727z" p-id="7765" fill="#858585"></path><path d="M229.701818 755.665455A67.025455 67.025455 0 0 1 162.909091 688.64V558.545455a67.025455 67.025455 0 1 1 133.818182 0v130.792727a67.025455 67.025455 0 0 1-67.025455 66.327273z m0-218.298182A20.48 20.48 0 0 0 209.454545 558.545455v130.792727a20.48 20.48 0 1 0 40.727273 0V558.545455a20.48 20.48 0 0 0-20.48-21.178182zM840.610909 755.665455a67.025455 67.025455 0 0 1-66.792727-67.025455V558.545455A67.025455 67.025455 0 1 1 907.636364 558.545455v130.792727a67.025455 67.025455 0 0 1-67.025455 66.327273z m0-218.298182a20.48 20.48 0 0 0-20.247273 20.48v130.792727a20.48 20.48 0 1 0 40.727273 0V558.545455a20.48 20.48 0 0 0-20.48-21.178182z" p-id="7766" fill="#858585"></path><path d="M644.421818 886.458182a23.272727 23.272727 0 1 1 0-46.545455c154.530909 0 184.785455-113.570909 186.181818-114.734545a23.272727 23.272727 0 1 1 45.149091 11.170909c-1.629091 1.629091-40.96 150.109091-231.330909 150.109091z" p-id="7767" fill="#858585"></path><path d="M600.669091 863.185455m-65.396364 0a65.396364 65.396364 0 1 0 130.792728 0 65.396364 65.396364 0 1 0-130.792728 0Z" p-id="7768" fill="#858585"></path></svg>
        </div>
        <div class="title">在线客服</div>
        <div class="arrow"><van-icon name="arrow"  size="16"/></div>
      </div>
      <div class="cell">
        <div class="icon-box">
          <svg t="1652356670337" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8837" width="20" height="20"><path d="M542.331247 955.220693a431.045474 431.045474 0 0 1-21.360033-861.450146 32.467251 32.467251 0 0 1 28.408844 14.311222 32.04005 32.04005 0 0 1 1.922403 31.82645A363.120567 363.120567 0 0 0 514.563204 299.040467a367.606174 367.606174 0 0 0 367.178974 368.033375H899.471005a32.25365 32.25365 0 0 1 30.331248 46.137672 427.200668 427.200668 0 0 1-387.471006 242.009179z m-69.633708-790.321235A366.965373 366.965373 0 1 0 845.857322 729.65874 431.686275 431.686275 0 0 1 450.483104 299.040467a427.200668 427.200668 0 0 1 22.214435-135.209011z" p-id="8838" fill="#858585"></path></svg>
        </div>
        <div class="title">夜间模式</div>
        <div class="arrow"><van-switch v-model="checked" size="24px" @change="upNightState" /></div>
      </div>
      <div class="cell">
        <div class="icon-box">
          <svg t="1652356826338" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10583" width="20" height="20"><path d="M930.986667 450.773333l2.133333-2.986666 1.92-4.266667c0-1.066667 1.066667-2.133333 1.493333-3.413333a27.52 27.52 0 0 0 0-4.053334 22.613333 22.613333 0 0 0 0-4.053333 77.226667 77.226667 0 0 0 0-8.106667 13.44 13.44 0 0 0 0-4.053333 26.666667 26.666667 0 0 0 0-4.053333 24.533333 24.533333 0 0 0-1.28-3.626667 35.626667 35.626667 0 0 0-1.706666-4.266667l-1.066667-2.56-2.773333-4.266666-170.666667-213.333334-1.92-2.133333-2.346667-2.56-3.84-2.986667-2.773333-1.92-4.266667-2.346666-3.413333-1.28-4.266667-1.493334H288l-4.053333 1.493334-3.413334 1.28-4.266666 2.346666-2.773334 1.92-3.626666 2.986667-2.56 2.56-1.92 2.133333-170.666667 213.333334-2.773333 4.266666-1.706667 2.986667a35.626667 35.626667 0 0 0-1.706667 4.266667 24.533333 24.533333 0 0 0-1.28 3.626666 26.666667 26.666667 0 0 0 0 4.053334 13.44 13.44 0 0 0 0 4.053333 77.226667 77.226667 0 0 0 0 8.106667 22.613333 22.613333 0 0 0 0 4.053333 27.52 27.52 0 0 0 0 4.053333c0 1.28 1.066667 2.346667 1.493334 3.413334l1.92 4.266666 2.133333 2.986667 2.773333 3.84 384 426.666667 1.706667 1.493333 1.493333 1.706667 2.133334 1.706666 2.986666 2.133334 4.48 2.56 2.773334 1.28a32.64 32.64 0 0 0 5.546666 1.706666h2.346667A36.693333 36.693333 0 0 0 512 896a36.693333 36.693333 0 0 0 8.32 0h2.346667a32.64 32.64 0 0 0 5.546666-1.706667l2.773334-1.28 4.48-2.56 2.986666-2.133333 2.133334-1.706667 1.493333-1.706666 1.706667-1.493334 384-426.666666zM512 789.333333L183.893333 425.173333 320 256h384l135.253333 169.173333z" p-id="10584" fill="#858585"></path><path d="M320 384m42.666667 0l298.666666 0q42.666667 0 42.666667 42.666667l0 0q0 42.666667-42.666667 42.666666l-298.666666 0q-42.666667 0-42.666667-42.666666l0 0q0-42.666667 42.666667-42.666667Z" p-id="10585" fill="#858585"></path></svg>
        </div>
        <div class="title">积分商城</div>
        <div class="arrow"><van-icon name="arrow"  size="16"/></div>
      </div>
      <div class="cell">
        <div class="icon-box">
          <svg t="1652356858815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11517" width="20" height="20"><path d="M944.48 552.458667l-182.357333 330.666666a73.792 73.792 0 0 1-64.565334 38.325334h-362.133333a73.792 73.792 0 0 1-64.565333-38.325334l-182.357334-330.666666a75.338667 75.338667 0 0 1 0-72.682667l182.357334-330.666667a73.792 73.792 0 0 1 64.565333-38.325333h362.133333a73.792 73.792 0 0 1 64.565334 38.325333l182.357333 330.666667a75.338667 75.338667 0 0 1 0 72.682667z m-55.989333-31.146667a10.773333 10.773333 0 0 0 0-10.378667l-182.037334-330.666666a10.517333 10.517333 0 0 0-9.205333-5.482667H335.733333a10.517333 10.517333 0 0 0-9.205333 5.482667l-182.037333 330.666666a10.773333 10.773333 0 0 0 0 10.378667l182.037333 330.666667a10.517333 10.517333 0 0 0 9.205333 5.472h361.514667a10.517333 10.517333 0 0 0 9.205333-5.472l182.037334-330.666667zM513.738667 682.666667c-94.261333 0-170.666667-76.405333-170.666667-170.666667s76.405333-170.666667 170.666667-170.666667c94.250667 0 170.666667 76.405333 170.666666 170.666667s-76.416 170.666667-170.666666 170.666667z m0-64c58.912 0 106.666667-47.754667 106.666666-106.666667s-47.754667-106.666667-106.666666-106.666667-106.666667 47.754667-106.666667 106.666667 47.754667 106.666667 106.666667 106.666667z" p-id="11518" fill="#858585"></path></svg>
        </div>
        <div class="title">设置</div>
        <div class="arrow"><van-icon name="arrow"  size="16"/></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'My',
    data(){
      return{
        checked:false,
        userData:[],
      }
    },
    computed:{
      appkeyState(){
        let appkey = localStorage.getItem('appkey') || ''
        if(appkey !== ''){
          return true
        }else{
          return false
        }
      },
      
    },
    methods:{
      goLogin(){
        this.$router.push({name:'login'})
      },

      getUserInof(){
        let userData = JSON.parse(localStorage.getItem('user-info'))
        let appkey = JSON.parse(localStorage.getItem('appkey'))
        userData.forEach(v => {
          if(v.phone == appkey){
            this.userData = v
          }
        })
        
      },
      upNightState(){
        this.$store.commit('upNightState',{nightState:this.checked})
      }
    },
    created(){
      this.getUserInof()
      this.checked = this.$store.state.nightState
    }
  }
</script>


<style lang="less"  scoped>
.van-switch--on{
  background: #b23636;
}
#app.night{
  .avatar{
    opacity: .5;
  }
  /deep/.van-tabbar{
    background-color: #2f2f2f;
  }
  .box{
    background-color: #2f2f2f;
    height: 100vh;
  }
  .van-nav-bar{
    background-color: #2f2f2f;
  }
.user-info{
  background-color: #2f2f2f;
  .avatar{
    width: 70px;
    height: 70px;
    border: 1px solid #656565;
    background-color: #161515;
    border-radius: 50%;
    box-shadow:0px 0px 10px #656565;
    overflow: hidden;
    margin-right: 15px;
  }
  .clickLog{
    color: #757575;
  }
}
.user-Balance-box{
  box-shadow: 0px 10px 10px #272727;
  background-color: #2f2f2f;
  .segmentation{
    background-color: #383838;
  }
  .left-balance{
    .title{
      color: #777777;
    }
    .two-title{
      color: #4d4d4d;
    }
    .left-btn{
      
      color: #eaaaa4;
      background: #b23636;
    }
  }
  .right-balance{
    .title{
      color: #777777;

    }
    .two-title{
            color: #4d4d4d;

    }
    .right-btn{
      
      border: 1px solid #ac4d4f;
      color: #ac4d4f;
    }
  }
}
.cell-box{
  padding: 0 20px;
  .cell{
    color: #858585;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .arrow{
      margin-left: auto;
    }
    .icon-box{
      margin-right: 15px;
    }
    .van-icon{
      color: #626262;
    }
  }
}
.avatar-img{
  width: 80%;
  text-align: center;
  margin: auto;
}
}

.user-info{
  padding: 0 20px;
  padding-top: 20px;

  display: flex;
  align-items: center;
  .avatar{
    width: 70px;
    height: 70px;
    border: 1px solid #fff;
    background-color: #f0f0f0;
    border-radius: 50%;
    box-shadow:0px 0px 10px rgb(213, 212, 212);
    overflow: hidden;
    margin-right: 15px;
  }
  .clickLog{
    color: #333;
    font-size: 24px;
    font-weight: bold;
  }
}
.user-Balance-box{
  margin-top: 30px;
  text-align: center;
  padding: 0px 20px;
  padding-bottom: 30px;
  margin-bottom: 20px;
  display: flex;
  
  box-shadow: 0px 6px 10px #f0f0f0;
  .segmentation{
    width: 1px;
    background-color: #eee;
  }
  .left-balance{
    width: calc(50% - 1px);
    .title{
      color: #333;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .two-title{
      color: #666;
      margin-bottom: 10px;
    }
    .left-btn{
      margin: auto;
      width: 70px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      border-radius: 30px;
      color: rgb(241, 241, 241);
      background: #f24a49;
    }
  }
  .right-balance{
    width: calc(50% - 1px);
    .title{
      color: #333;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .two-title{
      color: #666;
      margin-bottom: 10px;
    }
    .right-btn{
      margin: auto;
      width: 70px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      border-radius: 30px;
      border: 1px solid #f24a49;
      color: #f24a49;
      // background: #f24a49;
    }
  }
}
.cell-box{
  padding: 0 20px;
  .cell{
    color: #858585;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .arrow{
      margin-left: auto;
    }
    .icon-box{
      margin-right: 15px;
    }
  }
}
.avatar-img{
  width: 80%;
  text-align: center;
  margin: auto;
}
</style>