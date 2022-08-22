<template>
  <div class="selection">
    <div class="topPoster" v-if="banners">
      <div class="carousel">
        <van-swipe :autoplay="3000" :show-indicators="false" >
          <van-swipe-item v-for="(image, index) in banners" :key="index" @click="toBook(image)">
            <img v-lazy="image.cover" class="autoImg" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="headingNav" v-if="shortCut">
        <div class="heading-itme" v-for="itme in shortCut" :key="itme.id" @click="goRanking(itme)">
          <div class="heading-icon">
            <img :src="itme.cover" alt="" class="autoImg" />
          </div>
          <div class="titelText">{{ itme.name }}</div>
        </div>
      </div>
      <div class="van-hairline--top"></div>

      <div class="context-box" v-for="(itme, index) in listData" :key="index">
        <van-divider />

        <div class="contextTitel">
          {{ itme.name }}
        </div>
        <div v-for="key in itme.list" :class="['context-novel']" :key="key.id">
          <div class="img">
            <img :src="key.cover" class="autoImg" />
          </div>
          <div class="right">
            <div class="titelText">{{ key.title }}</div>
            <div>{{ key.author }}</div>
            <div class="text">{{ key.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <freeBook :list="freeBookData" v-if="freeBookData.length !== 0"></freeBook>
    <bookZone :list="bookZoneData" v-if="bookZoneData.length !== 0"></bookZone>
    <StrongPush :list="StrongPushData" :listOne="StrongPushTewData" :listTwo="StrongPushTeoData"></StrongPush>
    <publishing :list="publishingData" v-if="publishingData.length !== 0"></publishing>
    <Popularity :list="PopularityData"></Popularity>
    <!-- <div>{{uuid}}</div> -->
    <div class="botton">
      <van-divider />
      正在加载中...
    </div>
  </div>
</template>

<script>
import StrongPush from "../components/strongPush.vue";
import Popularity from "../components/Popularity.vue";
import freeBook from "../components/freeBook.vue"
import bookZone from "../components/bookZone.vue"
import publishing from "../components/publishing.vue"
export default {
  name: "Selection",

  data() {
    return {
      product: "",
      shortCut: "",
      listData: "",
      id: "",
      // 海报数据
      banners: "",

      //本周强推数据
      StrongPushData: [],
      StrongPushTewData:[],
      StrongPushTeoData:[],
      //人气NO.1数据
      PopularityData: [],
      //免费数据
      freeBookData:[],
      //好书专区数据
      bookZoneData:[],
      //出版模块 悬疑推理
      publishingData:[],
      //性别参数
      gender: 1,
    };
  },
  watch:{
    uuid:function(){
      
      this.PopularityData = []
      this.id = this.uuid
      this.getData()
    }
  },
  computed:{
    uuid(){
      return this.$store.state.uuid
    }
  },
  components: {
    StrongPush,
    Popularity,
    freeBook,
    bookZone,
    publishing
  },
  async created() {
    this.id = this.$route.query.id
      ? this.$route.query.id
      : this.uuid;

    this.getData();
    console.log('this.id ==> ',this.id);
    // console.log("StrongPushData ==> ", this.StrongPushData);
  },

  methods: {
    async getData() {
      let result = await this.axios({
        //请求类型
        method: "get",
        //请求路径
        url: `https://apis.netstart.cn/yunyuedu${this.id}`,
        //如果get请求, 请求参数需要写在params字段中
        
      });
      console.log("result ==> ", result);
      result.data.data.list.forEach((v, i) => {
        if (v.module === 52) {
          this.StrongPushTeoData = v

          this.StrongPushData = v.list.slice(0,1);
          this.StrongPushTewData = v.list.slice(1,5)
        }
        if (v.module === 36) {
          this.PopularityData.push(v);
        }
        if (v.module === 34) {
          this.PopularityData.push(v);
        }
        if(v.module === 45){
          this.freeBookData = v
        }
        if(v.module === 53){
          this.bookZoneData = v
        }
        if(v.module === 58){
          this.publishingData.push(v)
        }
      });
      console.log('publishingData ==> ',this.publishingData);
      let bannersData = result.data.data.list;
      let banners;
      let shortCut;
      bannersData.forEach((item) => {
        if (item.module === 10) {
          banners = item.banners;
        }
        if (item.module === 49) {
          shortCut = item.shortCut;
        }
      });
      this.banners = banners;
      this.shortCut = shortCut;
    },

    async getNaviData() {
      await this.axios({
        method: "get",
        url: "https://apis.netstart.cn/yunyuedu/store/navi.json",
        params: {
          gender: this.gender,
        },
      })
        .then((result) => {
          console.log("result11 ==> ", result);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    toBook(item){
      this.$router.push({path:'/readBook',query:{uuid:item.id}})
    },
    goRanking(item){
      this.$router.push({path:'/ranking',query:{url:item.url}})
    }
  },
  
};
</script>

<style lang="less" scoped>
#app.night{
  .botton{
    background: #2f2f2f;
    padding-bottom: 10px;
  }
 .headingNav{
   color: #707070;
   .heading-icon{
     opacity: .5;
   }
 }
.selection {
  height: 100vh;
    background-color: #2f2f2f;
  margin-top: 10px;
  .topPoster {
    padding: 0 25px;
    .carousel {
      width: 100%;
      height: 130px;

      /deep/ .autoImg {
        border-radius: 10px;
        width: 100%;
        height: 100%;
        display: block;
        opacity: .5;
      }
    }
  }
  .headingNav {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    .heading-itme {
      text-align: center;
      .heading-icon {
        width: 50px;
        height: 50px;
        .autoImg {
          width: 90%;
        }
      }
    }
  }
  .context-box {
    .contextTitel {
      font-weight: 550;
      font-size: 16px;
    }
    .context-novel {
      color: #9b9b9b;
      margin-top: 15px;
      display: flex;
      .img {
        margin-right: 10px;
        .autoImg {
          width: 80px;
          height: 100px;
        }
      }
      .right {
        width: calc(100% - 80);
        .titelText {
          font-size: 14px;
          font-weight: 550;
          color: #000;
          margin-bottom: 5px;
        }
        .text {
          width: 100%;
          margin-top: 10px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .context-novel-float {
      color: #9b9b9b;
      margin-top: 15px;
      float: left;
      .img {
        margin-right: 10px;
        .autoImg {
          width: 70px;
          height: 80px;
        }
      }
      .right {
        .titelText {
          width: 70px;
          word-wrap: break-word;
          font-size: 12px;
          font-weight: 500;
          color: #000;
          margin-bottom: 5px;
        }
        .text {
          width: 100%;
          margin-top: 10px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .botton {
    color: #9b9b9b;
    text-align: center;
    margin-bottom: 60px;
  }
}
}
/deep/.van-swipe{
  height: 100%;
  // margin-bottom: 10px;
}
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
.headingNav {
  margin-bottom: 10px;
  margin-top: 10px;
}

.selection {
  margin-top: 10px;
  .topPoster {
    padding: 0 25px;
    .carousel {
      width: 100%;
      height: 130px;

      /deep/ .autoImg {
        border-radius: 10px;
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .headingNav {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    .heading-itme {
      text-align: center;
      .heading-icon {
        width: 50px;
        height: 50px;
        .autoImg {
          width: 90%;
        }
      }
    }
  }
  .context-box {
    .contextTitel {
      font-weight: 550;
      font-size: 16px;
    }
    .context-novel {
      color: #9b9b9b;
      margin-top: 15px;
      display: flex;
      .img {
        margin-right: 10px;
        .autoImg {
          width: 80px;
          height: 100px;
        }
      }
      .right {
        width: calc(100% - 80);
        .titelText {
          font-size: 14px;
          font-weight: 550;
          color: #000;
          margin-bottom: 5px;
        }
        .text {
          width: 100%;
          margin-top: 10px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .context-novel-float {
      color: #9b9b9b;
      margin-top: 15px;
      float: left;
      .img {
        margin-right: 10px;
        .autoImg {
          width: 70px;
          height: 80px;
        }
      }
      .right {
        .titelText {
          width: 70px;
          word-wrap: break-word;
          font-size: 12px;
          font-weight: 500;
          color: #000;
          margin-bottom: 5px;
        }
        .text {
          width: 100%;
          margin-top: 10px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .botton {
    color: #9b9b9b;
    text-align: center;
    margin-bottom: 60px;
  }
}
</style>
