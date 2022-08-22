<template>
  <div>
    <div class="box">
      <div class="top-nav-box">
        <div class="top-nav">
          <div class="title">书架</div>
          <div class="icon-box">
            <div class="search-icon" @click="goSearc">
              <van-icon name="search" size="24" color="#777" />
            </div>
            <div class="time-icon">
              <van-icon name="clock-o" size="24" color="#777" />
            </div>
            <div class="more-icon">
              <van-icon name="wap-nav" size="24" color="#777" />
            </div>
          </div>
        </div>
      </div>

      <div class="recommend-banner-box" v-if="crossBanner">
        <div class="recommend-banner">
          <div class="banner-img">
            <img class="auto-img" :src="banners.cover" alt="" />
          </div>
          <div class="banner-text">
            <div class="title-box">
              <div class="title">{{ banners.title }}</div>
              <div class="title-on">{{ banners.readInfo }}</div>
            </div>
            <div class="introduce">
              {{ banners.description }}
            </div>
          </div>
          <div class="closure" @click="crossBanner = !crossBanner" >
            <van-icon name="cross" color="#999" size="18" />
          </div>
        </div>
      </div>
      <div class="book-item-box">
        <div
          class="book-item"
          v-for="(item, index) in bookInfoData"
          :key="index"
          @touchstart="handlerTouchstart(item, index)"
          @touchmove="handlerTouchmove"
          @touchend="handlerTouchend"
          @click="goReadBook(item.id)"
        >
          <div class="book-img">
            <img class="auto-img" :src="item.cover" alt="" />
          </div>
          <div class="name van-ellipsis">{{ item.title }}</div>
          <div class="unread">{{ item.articleCount }}章未读</div>
        </div>
        
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <div class="popup-box">
        <div class="popup" @click="goBookDetail">
          <div class="icon">
            <svg
              t="1652518256753"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3782"
              width="14"
              height="14"
            >
              <path
                d="M996.562475 131.235956V848.476632a322.978348 322.978348 0 0 1-1.356084 57.134648 151.651166 151.651166 0 0 1-27.659003 64.401212 138.857918 138.857918 0 0 1-80.3416 50.09836 236.700681 236.700681 0 0 1-52.401145 2.712169H189.999339a246.832934 246.832934 0 0 1-48.358479-1.893401 137.757698 137.757698 0 0 1-81.416232-46.874462 151.369715 151.369715 0 0 1-30.08972-63.60803 329.067934 329.067934 0 0 1-2.149266-63.32658v-675.483513a293.553877 293.553877 0 0 1 3.479763-65.194394A137.348314 137.348314 0 0 1 118.254802 8.625464 221.655821 221.655821 0 0 1 194.835187 0.540131h516.054052c19.343392 0 141.03277 0.179105 160.376162 0.255865a154.695959 154.695959 0 0 1 53.475778 16.170666 143.437901 143.437901 0 0 1 63.966242 74.917262 154.823892 154.823892 0 0 1 6.447797 25.867948c0.51173 4.503223 0.9467 8.98086 1.407257 13.484084z m-76.580384 4.298532l-0.537317-5.654616-3.50535-13.484084a62.891609 62.891609 0 0 0-25.586497-30.447931 111.736231 111.736231 0 0 0-58.593077-8.622649H204.583642a227.412783 227.412783 0 0 0-54.550411 1.8934 61.407592 61.407592 0 0 0-42.703863 40.938395 170.841039 170.841039 0 0 0-2.686582 44.725196v686.255429a222.065205 222.065205 0 0 0 1.330498 46.900049 71.642191 71.642191 0 0 0 15.351898 28.835981c15.761282 19.548083 41.833922 19.113113 77.117701 19.113113h633.163448a183.352836 183.352836 0 0 0 42.447998-1.867814 62.149601 62.149601 0 0 0 33.59507-22.362598c14.09816-19.241046 12.358278-40.145213 12.358278-73.049448V135.534488zM828.408019 507.152766a35.821095 35.821095 0 0 1-28.477771 39.889349 141.083943 141.083943 0 0 1-28.145146 0.537316h-362.816524a36.15372 36.15372 0 0 1-5.910481-70.618731 121.97083 121.97083 0 0 1 29.833855-1.074633h341.323867a95.974949 95.974949 0 0 1 33.59507 2.968034 36.614277 36.614277 0 0 1 18.524624 19.676016z m-4.145013 231.992766a35.514057 35.514057 0 0 1-29.552403 37.995948l-48.358479 0.281451H458.32493c-42.192133 0-74.78933 5.756962-81.134781-31.522564a33.467138 33.467138 0 0 1 4.01708-20.750649c13.202632-25.816775 45.006648-19.420151 82.235001-19.420151H734.991719a197.476582 197.476582 0 0 1 71.207221 4.60557 37.10042 37.10042 0 0 1 16.375358 20.187746z m10.464878-461.836266a36.691036 36.691036 0 0 1-17.475578 35.56523 162.423081 162.423081 0 0 1-67.164554 4.835848h-296.803362c-40.759289 0-69.979069 4.01708-76.043068-31.778429a33.467138 33.467138 0 0 1 4.01708-20.750648c12.255932-23.769855 38.021534-19.420151 72.81917-19.420151h309.59661a154.823892 154.823892 0 0 1 50.789196 3.249485 36.179306 36.179306 0 0 1 18.268759 19.676016zM230.937734 230.818601a51.172993 51.172993 0 1 1-51.172994 51.172994 51.172993 51.172993 0 0 1 51.172994-51.172994z m0 230.278471a51.172993 51.172993 0 1 1-51.172994 51.172993 51.172993 51.172993 0 0 1 51.172994-51.172993z m0 230.278471a51.172993 51.172993 0 1 1-51.172994 51.172993 51.172993 51.172993 0 0 1 51.172994-51.172993z"
                p-id="3783"
                fill="#555555"
              ></path>
            </svg>
          </div>
          <div class="text">书籍详情</div>
        </div>
        <div class="popup" @click="moveShelfBook">
          <div class="icon">
            <svg
              t="1652518322644"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4720"
              width="14"
              height="14"
            >
              <path
                d="M92.748283 203.507071h838.503434v44.140606H92.748283zM644.402424 115.238788v44.127677h44.127677V115.238788c0-24.384646-19.75596-44.127677-43.998384-44.127677h-265.050505a43.97899 43.97899 0 0 0-31.172525 12.916364 43.918222 43.918222 0 0 0-12.825859 31.211313v44.127677h44.127677V115.238788h264.791919z m0 0"
                p-id="4721"
                fill="#555555"
              ></path>
              <path
                d="M203.073939 909.614545v-661.979798H158.946263V909.575758c0 24.410505 19.639596 44.179394 44.179394 44.179394h617.761616c24.410505 0 44.179394-19.639596 44.179394-44.179394V247.634747H820.926061v661.979798H203.073939z m0 0"
                p-id="4722"
                fill="#555555"
              ></path>
              <path
                d="M313.412525 335.90303h44.127677V733.090909h-44.127677V335.90303z m176.523637 0h44.127676V733.090909H489.936162V335.90303z m176.523636 0h44.127677V733.090909h-44.127677V335.90303z m0 0"
                p-id="4723"
                fill="#555555"
              ></path>
            </svg>
          </div>
          <div class="text">删除</div>
        </div>
      </div>
    </van-popup>
    <van-empty description="书架还没有书噢" v-if="bookInfoData.length === 0"/>
  </div>
</template>

<script>
export default {
  name: "shelf",
  data() {
    return {
      showPopover: true,
      banners: {},
      bookInfoList: [],
      ids: [],
      bookInfoData: [],
      loop: 0,
      clickShow: false,
      longClickShow: false,
      show: false,

      bookDetailId: "",
      moveBookIndex:0,
      crossBanner:true
    };
  },
  methods: {
    getBanner() {
      this.axios
        .get("https://apis.netstart.cn/yunyuedu/shelf/banner.json")
        .then((result) => {
          this.banners = result.data.data.banners[0];
        });
    },
    getBookInfo() {
      this.axios
        .get("https://apis.netstart.cn/yunyuedu/shelf/info.json")
        .then((result) => {
          this.bookInfoList = result.data.data.list;
          let ids = [];
          this.bookInfoList.forEach((v, i) => {
            let id = {};
            id.id = v.id;
            id.type = v.type;

            ids.push(id);
          });
          // this.ids.push(...ids);
          console.log("this.ids ==> ", this.ids);
          this.axios
            .get("https://apis.netstart.cn/yunyuedu/shelf/detail.json", {
              params: {
                ids: JSON.stringify(this.ids),
              },
            })
            .then((result) => {
              this.bookInfoData = result.data.data.list;
            });
        });
    },
    handlerTouchstart(item, index) {
      this.loop = setTimeout(() => {
        this.loop = 0;
        // 执行长按要执行的内容
        this.show = !this.show;
        this.clickShow = false;
        this.longClickShow = true;
        this.bookDetailId = item.id;
        this.moveBookIndex = index
        
      }, 1000); // 定时的时间
      return false;
    },
    handlerTouchmove() {
      // 清除定时器
      clearTimeout(this.loop);
      this.loop = 0;
    },
    handlerTouchend() {
      // 清除定时器
      clearTimeout(this.loop);
      if (this.loop !== 0) {
        // 单击操作
        this.clickShow = true;
        this.longClickShow = false;
      }
    },
    goBookDetail() {
      this.$router.push({name:'bookDetail',query:{id:this.bookDetailId}})
    },
    moveShelfBook(){
      this.show = !this.show
      this.bookInfoData.splice(this.moveBookIndex,1)
      let arr = JSON.parse(localStorage.getItem('ids'))
      arr.splice(this.moveBookIndex,1)
      localStorage.setItem('ids',JSON.stringify(arr))
    },
    goReadBook(id){
      this.$router.push({name:'readBook',query:{uuid:id}})
    },
    goSearc(){
      this.$router.push({name:'searchBook'})
    }
  },
  created() {
    this.ids = JSON.parse(localStorage.getItem("ids"));
    console.log(this.ids);
    this.getBanner();
    this.getBookInfo();
  },
};
</script>

<style lang="less" scoped>
#app.night{
  .book-img,.banner-img{
    opacity: .5;
  }
.box {
  height: 100vh;
  background-color: #2f2f2f;
  padding-bottom: 50px;
}
.popup-box {
  padding: 0 20px;
  .popup {
    padding: 10px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #2c2c2c;
    &:last-child {
      border-bottom: 0;
    }
    .text {
      margin-left: 10px;
      color: #787878;
      font-size: 14px;
    }
  }
  .moveBook {
    display: flex;
    align-items: center;
  }
}
.recommend-banner-box {
  padding: 0 15px;
}
.top-nav {
  padding: 0 15px;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #2f2f2f;
  .title {
    font-weight: 550;
    color: #727272;
    font-size: 16px;
  }
  .icon-box {
    margin-left: auto;
    display: flex;
    .search-icon,
    .time-icon {
      margin-right: 15px;
    }
  }
}
.recommend-banner {
  margin: 20px 0;
  padding: 10px 0;
  padding-left: 10px;
  padding-right: 20px;
  border: 1px solid #2b2b2b;
  border-radius: 5px;
  width: 100%;
  display: flex;
  position: relative;
  box-shadow: 0 5px 10px #2b2b2b;
  // height: 50px;
  // background-color: #333;
  .banner-img {
    width: 60px;
    height: 80px;
    border-radius: 2px;
    background-color: #333333;
    margin-right: 15px;
  }
  .banner-text {
    flex: 1;
    font-size: 14px;
    .title-box {
      display: flex;
      margin-bottom: 10px;
    }
    .introduce {
      color: #555555;

    }
    // justify-content: space-between;
    .title {
      color: #777;
      font-weight: 700;
    }
    .title-on {
      margin-left: auto;
      color: #8e3a3f;
      margin-right: 10px;
    }
  }
  .closure {
    position: relative;
    position: absolute;
    right: 5px;
    top: 10px;
  }
}
.book-item-box {
  margin-top: 5px;
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  .book-item {
    width: 95px;
    margin-right: 30px;
    margin-bottom: 15px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .book-img {
      width: 100%;
      height: 130px;
      border-radius: 5px;
      background-color: #2c2d28;
      margin-bottom: 15px;
      box-shadow: 0 2px 10px #353631;
    }
    .name {
      color: #888;
    }
    .unread {
      margin-top: 15px;
      color: #666;
    }
  }
}
}

.box {
  padding-bottom: 50px;
}
.popup-box {
  padding: 0 20px;
  .popup {
    padding: 10px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: 0;
    }
    .text {
      margin-left: 10px;
      color: #555;
      font-size: 14px;
    }
  }
  .moveBook {
    display: flex;
    align-items: center;
  }
}
.recommend-banner-box {
  padding: 0 15px;
}
.top-nav {
  padding: 0 15px;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  .title {
    font-weight: 550;
    color: #333;
    font-size: 16px;
  }
  .icon-box {
    margin-left: auto;
    display: flex;
    .search-icon,
    .time-icon {
      margin-right: 15px;
    }
  }
}
.recommend-banner {
  margin: 20px 0;
  padding: 10px 0;
  padding-left: 10px;
  padding-right: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  width: 100%;
  display: flex;
  position: relative;
  box-shadow: 0 5px 10px #eee;
  // height: 50px;
  // background-color: #333;
  .banner-img {
    width: 60px;
    height: 80px;
    border-radius: 2px;
    background-color: #ccc;
    margin-right: 15px;
  }
  .banner-text {
    flex: 1;
    font-size: 14px;
    .title-box {
      display: flex;
      margin-bottom: 10px;
    }
    .introduce {
      color: #999;
    }
    // justify-content: space-between;
    .title {
      font-weight: 700;
    }
    .title-on {
      margin-left: auto;
      color: #e65552;
      margin-right: 10px;
    }
  }
  .closure {
    position: relative;
    position: absolute;
    right: 5px;
    top: 10px;
  }
}
.book-item-box {
  margin-top: 5px;
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  .book-item {
    width: 95px;
    margin-right: 30px;
    margin-bottom: 15px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .book-img {
      width: 100%;
      height: 130px;
      border-radius: 5px;
      background-color: #ccc;
      margin-bottom: 15px;
      box-shadow: 0 2px 10px #ccc;
    }
    .name {
      color: #333;
    }
    .unread {
      margin-top: 15px;
      color: #888;
    }
  }
}
</style>
