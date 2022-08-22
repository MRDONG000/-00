<!-- 搜索页面 -->
<template>
  <div class="search-book-box">
    <div class="top-nav">
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @input="onInput"
          @cancel="onCancel"
        />
      </form>
    </div>
    <div class="content-hot" v-if="value === ''">
      <div class="hot-title">热门搜索</div>
      <div class="hot-box">
        <div class="hot-item" v-for="(item, index) in hotSearData" :key="index" @click="onSearchGoBookDedail(item.id)">
          <div
            class="sort"
            :class="[
              { one: index === 0 },
              { two: index === 1 },
              { three: index === 2 },
            ]"

          >
            {{ index + 1 }}
          </div>
          <div class="hot-name van-ellipsis">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="lately-box" v-if="value === ''">
      <div class="lately-title-box">
        <div class="lately-title">最近搜索</div>
        <div class="move-icon" @click="moveLately" v-if="latelySearchData.length !== 0">
          <van-icon name="delete-o" />
        </div>
      </div>
      
      <div class="lately-item-box" v-if="latelySearchData.length !== 0">
        <div class="lately-item" v-for="(item,index) in latelySearchData" :key="index"  >
          <div class="search-icon">
            <van-icon name="search" />
          </div>
          <div class="book-name">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="search-content-box" v-if="value !== ''">
      <div class="search-keyword">
        <div class="search-icon">
          <van-icon name="search" />
        </div>
        <div>搜索 “ <span class="keyword">{{value}}</span> ”</div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="search-one-detail-box" v-for="item in searchData.slice(0,1)" :key="item.id" @click="goBookDedail(item)">
        <div class="book-img">
          <img class="auto-img" :src="item.cover" alt="">
        </div>
        <div class="book-text">
          <div class="title" v-html="item.text"></div>
          <div class="name">{{item.author}}</div>
          <div class="brief van-multi-ellipsis--l2">
            {{item.d}}
          </div>
        </div>
      </div>
      <div class="search-book-box">
        <div class="search-book-item" v-for="item in searchData.slice(1)" :key="item.id" @click="goBookDedail(item)">
          <div class="book-icon">
            <svg
              t="1652623404607"
              class="icon"
              viewBox="0 0 1092 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1935"
              width="20"
              height="20"
            >
              <path
                d="M785.066667 921.6v1.706667c-5.7344-0.341333-11.229867-1.706667-17.066667-1.706667a221.320533 221.320533 0 0 0-186.4704 102.4h-70.792533A221.320533 221.320533 0 0 0 324.266667 921.6c-5.8368 0-11.332267 1.365333-17.066667 1.706667V921.6H0V0h341.333333c94.242133 0 204.8 76.458667 204.8 170.666667 0-94.208 110.557867-170.666667 204.8-170.666667h341.333334v921.6h-307.2z m-273.066667-68.266667V273.066667a204.8 204.8 0 0 0-204.8-204.8H68.266667v785.066666h273.066666a316.1088 316.1088 0 0 1 170.666667 68.266667v-68.266667zM1024 68.266667h-238.933333a204.8 204.8 0 0 0-204.8 204.8v648.533333a270.062933 270.062933 0 0 1 170.666666-68.266667h273.066667V68.266667z"
                p-id="1936"
                fill="#c3bfbc"
              ></path>
            </svg>
          </div>
          <div class="book-name" v-html="item.text"></div>
          <div class="right-icon">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Dialog } from 'vant';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      value: "",
      hotSearData: [],
      searchData:[],
      latelySearchData:[],
      latelyName:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onInput() {
      this.axios.get('https://apis.netstart.cn/yunyuedu/search/searchHint',{
        params:{
          search:this.value
        }
      }).then(result => {
        this.searchData = result.data.words.w
        
        this.searchData.forEach(v => {

          // let index = v.text.indexOf(this.value)
          // v.text.splice(index,1)
          // console.log('index ==> ',index);
          let reg = new RegExp(this.value)
          v.text = v.text.replace(reg,`<span style='color:#3981c5'>${this.value}</span>`)
          // bookName.innerHTML = v.text
        })
        let bookName = document.querySelector('.book-name')

        console.log(bookName);
        // console.log(this.searchData);
      })
    },
    onCancel() {
      this.$router.go(-1)
    },

    //获取热门搜索数据
    getHotSearchData() {
      this.axios
        .get("https://apis.netstart.cn/yunyuedu/search/getHotWords")
        .then((result) => {
          console.log(result);
          this.hotSearData = result.data.list;
        });
    },
    //跳转书本详情页面
    goBookDedail(item){
      let text = item.text
      let replaceReg = new RegExp(`<span style='color:#3981c5'>`)
      text = text.replace(replaceReg,'')
      let reg = new RegExp(`</span>`)
      text = text.replace(reg,'')
      let arr = JSON.parse(localStorage.getItem('search-record')) || []
      arr.forEach((v,i) => {
        if(v === text){
          arr.splice(i,1)
          // arr.unshift(text)
        }
        if(i === 5){
          arr.splice(i,1)
        }
      })
      arr.unshift(text)
      localStorage.setItem('search-record',JSON.stringify(arr))
      this.$router.push({name:'bookDetail',query:{id:item.id}})
    },
    onSearchGoBookDedail(id){
      this.$router.push({name:'bookDetail',query:{id}})
      
    },
    getLocalStorage(){
      let arr = JSON.parse(localStorage.getItem('search-record')) || []
      this.latelySearchData = arr
    },
    //删除搜索历史记录
    moveLately(){
      Dialog.confirm({
        title: '是否要删除全部历史记录?',
        // message: '是否要删除全部历史记录?',
      })
        .then(() => {
          // on confirm
          this.latelySearchData = []
          window.localStorage.removeItem('search-record')
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getHotSearchData();
    this.getLocalStorage()
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
};
</script>
<style lang="less" scoped>
.keyword {
  color: #3981c5;
}
.search-content-box {
  background-color: #f7f7f7;
  padding: 0 20px;
  .search-keyword {
    // height: 50px;
    font-size: 14px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    .search-icon {
      color: #bdb9b6;
      margin-right: 10px;
    }
    .right-icon {
      color: #bdb9b6;
      margin-left: auto;
    }
  }
  .search-one-detail-box {
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    display: flex;
    color: #999;
    .book-img {
      width: 60px;
      height: 80px;
      margin-right: 10px;
      background-color: #ccc;
    }
    .book-text {
      flex: 1;
      .title {
        font-size: 14px;
        color: #333;
      }
      .name {
        margin: 5px 0;
      }
    }
  }
  .search-book-box {
    // background-color: #f7f7f7;
    height: 75vh;
    .search-book-item {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      .book-icon {
        color: #bdb9b6;
        margin-right: 10px;
      }
      .book-name {
        color: #333;
        font-size: 14px;
      }
      .right-icon {
        color: #bdb9b6;
        margin-left: auto;
      }
    }
  }
}
.content-hot {
  margin-top: 30px;
  padding: 0 20px;
  .hot-title {
    color: #777;
    font-size: 14px;
  }
  .hot-box {
    margin-top: 20px;
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    .hot-item {
      width: 50%;
      font-size: 14px;
      display: flex;
      margin-bottom: 25px;
      // align-items: center;
      &:nth-child(2n) {
        width: calc(50% - 30px);
        margin-left: 30px;
      }
      .sort {
        text-align: center;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: #d8d8d8;
        color: #fdfdfd;
        &.one {
          background-color: #f1462e;
        }
        &.two {
          background-color: #fa7a11;
        }
        &.three {
          background-color: #ffbb0e;
        }
      }
      .hot-name {
        color: #333;
      }
    }
  }
}
.lately-box {
  padding: 0 20px;

  .lately-title-box {
    display: flex;
    align-items: center;
    .lately-title {
      color: #777;
      font-size: 14px;
    }
    .move-icon {
      font-size: 18px;
      color: #888;
      margin-left: auto;
    }
  }
  .lately-item-box {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .lately-item {
      display: flex;
      padding: 5px 15px;
      padding-left: 10px;
      border-radius: 15px;
      background-color: #f0f0f0;
      margin-left: 20px;
      margin-bottom: 10px;
      &:nth-child(1) {
        margin-left: 0;
      }
      &:nth-child(4) {
        margin-left: 0;
      }
      .search-icon {
        font-size: 14px;
        margin-right: 5px;
      }
    }
  }
}
.search-book-box {
  height: 100vh;
  background-color: #f7f7f7;
}
/deep/.van-search__content {
  border-radius: 50px;
}
/deep/.van-field__left-icon {
  color: #999;
}
/deep/.van-search__action {
  font-size: 16px;
  margin: 0 10px;
  color: #888;
}
</style>
