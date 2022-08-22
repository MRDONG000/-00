<!-- 阅读小说页面 -->
<template>
  <div class="read-box">
    <!-- <div class="mask-box" v-if="MaskLayer">
    </div> -->
    <van-overlay :show="show" @click.stop="show = false"> </van-overlay>
    <div class="top" v-if="show">
      <div class="top-box">
        <div @click="goQuit">
          <van-icon name="arrow-left" size="20" color="#8c857d" />
        </div>
        <div class="add-bookshelf" @click="addShelf" v-if="shelfShow">加入书架</div>
        <div class="add-bookshelf" v-else @click="moveShelf">已加入书架</div>
      </div>
    </div>
    <div class="bottom" v-if="show">
      <div class="book-content">
        {{ chapterTitle }}
      </div>
      <div class="book-derive">
        <div class="left" @click="leftDerive">
          <van-icon name="arrow-left" size="18px" color="#666" />
        </div>
        <div class="derive">
          <van-slider v-model="index" @change="onChange" />
        </div>
        <div class="right" @click="rightDerive">
          <van-icon name="arrow" size="18px" color="#666" />
        </div>
      </div>
      <div class="size-box">
        <div class="size-title">字号</div>
        <div class="size-right">
          <div class="reduce" @click="reduceSize">A-</div>
          <div class="size">{{ fontSize }}</div>
          <div class="add" @click="addSize">A+</div>
        </div>
      </div>
      <div class="background-box">
        <div class="background-title">
          背景
        </div>
        <div
          class="background-item"
          v-for="(item, index) in backgroundColor"
          :key="index"
          :style="{ backgroundColor: item }"
          @click="upBackgroundColor(item)"
        ></div>
      </div>
      <van-tabbar>
        <van-tabbar-item icon="wap-nav" @click="aaa">目录</van-tabbar-item>
        <van-tabbar-item icon="setting">设置</van-tabbar-item>
      </van-tabbar>
    </div>

    <div
      class=""
      @click="showMask"
      :style="{ backgroundColor: background, color: fontColor }"
      v-if="!contentIsHas"
    >
      <div ref="book" class="text" :style="{ fontSize: fontSize + 'px' }"></div>
      <div ref="buttom"></div>
    </div>

    <div
      class="content-none"
      v-if="contentIsHas"
      @click="showMask"
      :style="{ backgroundColor: background, color: fontColor }"
    >
      请登录后阅读
      <div class="btn-primary">
        <van-button type="primary" block round color="#ee0a24">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import debounce from "lodash.debounce";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      //目录
      chapterData: [],
      //目录ID数据
      chapterIdData: [],
      //小说内容数据
      bookContentData: [],
      index: 1,
      //滚动条高度
      scrollTop: 0,
      offsetTop: 0,
      //遮罩层
      show: false,
      value: 50,
      backgroundColor: ["#f6f6f6", "#ded9c5", "#d7e3cb", "#ccd8e4", "#161616"],
      background: "#f6f6f6",
      fontColor: "#161616",
      fontSize: 16,
      contentIsHas: false,
      shelfShow : true
    };
  },
  //监听属性 类似于data概念
  computed: {
    uuid() {
      return this.$route.query.uuid;
    },
    chapterTitle() {
      return this.chapterData[this.index].title;
    },
   
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    aaa() {
      console.log("触发了");
    },
    onChange(value) {
      this.index = value;
      this.bookContentData = [];
      this.getContent();
    },
    //返回上一页
    goQuit() {
      this.$router.go(-1);
    },
    //上一章
    leftDerive() {
      if (this.index === 1) {
        this.$toast("没有上一章了!");
        return;
      }
      this.index -= 1;
      this.bookContentData = [];
      this.getContent();
    },
    //下一章
    rightDerive() {
      if (this.index === this.chapterData.length) {
        this.$toast("已经是最后一章!");
        return;
      }
      this.index += 1;
      this.bookContentData = [];
      this.getContent();
    },
    //字体变小
    reduceSize() {
      if (this.fontSize <= 16) {
        return;
      }
      this.fontSize -= 1;
    },
    //字体变大
    addSize() {
      if (this.fontSize >= 26) {
        return;
      }
      this.fontSize += 1;
    },
    //更换背景颜色
    upBackgroundColor(item) {
      this.background = item;
      if (item == "#161616") {
        this.fontColor = "#aaa";
      } else {
        this.fontColor = "#161616";
      }
    },
    getChapter() {
      this.axios
        .get(
          `https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=${this.uuid}`
        )
        .then((result) => {
          result.data.data.catalog.forEach((v) => {
            this.chapterData.push(v);
            this.chapterIdData.push(v.uuid);
          });
          this.getContent();
        });
    },
    handleScroll() {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      this.scrollTop = scrollTop;
      // console.log(scrollTop);

      let b = this.$refs.buttom;
      this.offsetTop = b.offsetTop;
      if (this.scrollTop >= this.offsetTop - 780) {
        this.index += 1;
        this.getContent();
      }
    },
    //获取小说内容
    getContent() {
      this.axios
        .get(
          `https://apis.netstart.cn/yunyuedu/reader/book/content.json?source_uuid=${
            this.uuid
          }&content_uuid=${this.chapterIdData[this.index]}`
        )
        .then((result) => {
          // console.log("result ==> ", result);
          let content = result?.data?.data?.content;
          // console.log(content);
          if (content === undefined) {
            this.contentIsHas = true;
          } else {
            this.contentIsHas = false;
            this.bookContentData += content;
            let a = this.$refs.book;
            a.innerHTML = this.bookContentData;
          }

          // console.log('b到顶部的距离 ==> ',b.offsetTop,'滚动条高度==>',this.scrollTop);
        });
    },

    //显示遮罩层
    showMask(e) {
      let pageX = e.pageX;
      let clientWidth = document.documentElement.clientWidth;
      // console.log('pageX ==> ',pageX,'页面宽度==> ',clientWidth);
      if (pageX <= clientWidth / 2 + 50 && pageX >= clientWidth / 2 - 50) {
        this.show = !this.show;
      }
    },

    //加入书架
    addShelf(){
      let ids = {}
      ids.id = this.uuid
      ids.type = 'book'
      console.log('ids ==> ',ids);
      let localIds = JSON.parse(localStorage.getItem('ids')) || []
      localIds.push(ids)
      localStorage.setItem('ids',JSON.stringify(localIds))
      this.shelfShow = !this.shelfShow
      this.$toast('加入书架成功')
      console.log('localIds ==> ',localIds);
    },

    //移出书架
    moveShelf(){
      this.shelfShow = !this.shelfShow
      let ids = JSON.parse(localStorage.getItem('ids'))
      ids.forEach((v,i) => {
        if(v.id === this.uuid){
          ids.splice(i, 1);
        }
      })
      this.$toast('移出书架成功')
      localStorage.setItem('ids',JSON.stringify(ids))
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      let ids = JSON.parse(localStorage.getItem('ids')) || []
      if(ids.length === 0){
       this.shelfShow = true
      }
      ids.forEach(v => {
        if(v.id === this.uuid){
          this.shelfShow = false
        }
      })
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getChapter();
    window.addEventListener("scroll", debounce(this.handleScroll, 500));
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    console.log("销毁完成");
    window.removeEventListener("scroll",this.handleScroll)
    // window.removeEventListener("scroll",this.handleScroll)
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.content-none {
  width: 100%;
  height: 100vh;
  padding: 0 20px;
  font-size: 14px;
  .btn-primary {
    margin-top: 20px;
  }
}
.bottom {
  position: fixed;
  height: 35%;
  overflow-y: auto;
  background-color: #fff;
  transition: transform 0.3s, -webkit-transform 0.3s;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 3000;
  .bottom-box {
    position: absolute;
    bottom: 10px;
    left: 0;

    .bottom-item-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        width: 30px;
        height: 30px;
        background-color: #ccc;
      }
    }
  }
  .book-content {
    color: #666666;
    font-size: 14px;
    margin-top: 20px;
    text-align: center;
  }
  .book-derive {
    margin-top: 20px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .derive {
      width: 100%;
      margin: 0 20px;
    }
  }
  .size-box {
    margin-top: 20px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .size-title {
      color: #666;
      font-size: 14px;
      margin-right: 10px;
    }
    .size-right {
      display: flex;
      .reduce,
      .add {
        font-size: 14px;
        padding: 5px 20px;
        border-radius: 20px;
        background-color: #ebebeb;
      }
      .size {
        font-size: 14px;
        padding: 5px 10px;
      }
    }
  }
  .background-box {
    margin-top: 20px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .background-title {
      color: #666;
      font-size: 14px;
      margin-right: 10px;
    }
    .background-item {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.top {
  position: fixed;
  height: 40px;
  overflow-y: auto;
  background-color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.3s, -webkit-transform 0.3s;
  z-index: 3000;
  .top-box {
    display: flex;
    margin-left: 5px;
    line-height: 45px;
    .add-bookshelf {
      margin-left: auto;
      margin-right: 10px;
      color: #666;
      font-size: 14px;
    }
  }
}
.mask-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0);
  z-index: 200;
}
/deep/.van-slider__bar {
  background-color: #666;
}
/deep/.van-overlay {
  background-color: rgba(0, 0, 0, 0);
}
/deep/.van-tabbar-item--active {
  color: #666;
}
/deep/.g-book {
  padding-top: 40px;
  &:nth-child(1) {
    padding-top: 0;
  }
}
/deep/h1 {
  font-size: 24px;
}
/deep/.m-content {
  letter-spacing: 2px;
}
.read-box {
  // position: relative;
  // background-color: #f6f6f6;
  margin-top: 0px;
  .text {
    padding: 0 25px;
    // margin-top: 100px;
    // font-size: 16px;
  }
}
</style>
