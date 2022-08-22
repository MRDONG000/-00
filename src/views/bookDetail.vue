<!--  -->
<template>
<div class='box'>
  <div class="top-nav">
    <van-nav-bar  @click-left="onClickLeft" left-arrow>
      <template #right>
        <van-icon name="share-o" size="24"/>
      </template>
    </van-nav-bar>
  </div>
  <div class="book-detail">
    <div class="book-img">
      <img class="auto-img" :src="bookImg" alt="">
    </div>
    <div class="book-text-box">
      <div class="text">
        <div class="book-name">{{BookData.title}}</div>
        <div class="name-box">
          <div class="type">都市</div>
          <div class="division">|</div>
          <div class="name">{{name}}</div>
        </div>
      </div>
      <div class="evaluate">
        <van-rate v-model="evaluateValue" color="#f3aa3a" :size="14" readonly />
      </div>
      <div class="count-box">
        <div class="word-count">{{words}}</div>
        <div class="click-count">{{clicksCount}}</div>
      </div>
      <div class="price">{{wprice}}约点/千字</div>
    </div>
  </div>
  <div class="contentDetail" :class="isHas ? 'van-multi-ellipsis--l3' : ''" @click="isHas = !isHas">
    {{contentText}}
  </div>
  <div class="SplitLine van-hairline--bottom"></div>
  <div class="catalogue-box">
    <div class="icon"><van-icon name="bars" size="16" color="#333"/></div>
    <div class="timer">05月11号</div>
    <div>更至：</div>
    <div>第2082章 抓捕失败</div>
    <div class="right">
      连载中>
    </div>
  </div>
  <div class="SplitBg"></div>
  <div class="comment-box">
    <div class="top-title">
      <div class="left-title">
        <div class="rectangle"></div>
        <div>评论</div>
      </div>
      <div class="right-title" @click="showComment" v-if="commentData.length">
        <div class="write-icon"><svg t="1652273441206" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1996" width="20" height="20"><path d="M872.064 847.104H205.312c-14.08 0-25.6-11.52-25.6-25.6s11.52-25.6 25.6-25.6h666.752c14.08 0 25.6 11.52 25.6 25.6s-11.52 25.6-25.6 25.6zM352.64 693.632c-1.28 0-2.432-0.128-3.712-0.256L220.288 674.56c-11.264-1.664-19.968-10.368-21.632-21.632l-18.816-128.512c-1.152-8.064 1.536-16.128 7.168-21.76L576.512 113.28c9.984-9.984 26.24-9.984 36.224 0l147.328 147.328a25.3824 25.3824 0 0 1 0 36.096L370.688 686.08a25.6 25.6 0 0 1-18.048 7.552z m-105.984-66.944l97.024 14.208 362.112-362.112-111.104-111.104-362.24 361.984 14.208 97.024z" p-id="1997" fill="#333333"></path></svg></div>
        写评论</div>
    </div>
    <commentItem :list="commentData"></commentItem>
    
    <div class="more-comment" v-if="!commentData.length">
      <div class="more-comment-text">快来当第一个写评论的人吧</div>
      <div class="more-bnt" @click="showComment">写评论</div>
    </div>
  </div>
  <div class="botton-box">
    <div class="add-bookshelf" @click="addShelf" v-if="shelfShow">加入书架</div>
    <div class="add-bookshelf" @click="moveShelf" v-else>已在书架</div>
    <div class="Buy">购买</div>
    <div class="Trial" @click="goBook">免费试读</div>
  </div>
  <van-popup v-model="show" position="bottom">
    <div class="write-comment-box">
      <div class="comment-score-box">
        <div class="score">评分：</div>
        <div class="score-btn"><van-rate v-model="scoreValue" color="#f1af36"/></div>
      </div>
      <div class="comment-text">
        <!-- <input  type="text" placeholder="写长评当大师，接受众人膝盖"> -->
        <textarea cols="8" rows="8" placeholder="写长评当大师，接受众人膝盖" v-model="commentText"></textarea>
      </div>
      <div class="sendOut-comment">
        <div class="total">{{commentText.length}}字</div>
        <div class="sendOut" :class="{active : !commentText.length}" @click="senComment">发送</div>
      </div>
    </div>
  </van-popup>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import commentItem from '../components/commentItem.vue'
export default {
//import引入的组件需要注入到对象中才能使用
components: {commentItem},
data() {
//这里存放数据
return {
  isHas:true,
  evaluateValue:5,
  BookData:[],
  name:'',
  contentText:'',
  clicksCount:"",
  words:'',
  wprice:'',
  bookImg:'',
  id:'',
  shelfShow:false,
  show:false,
  total:3,
  commentData:[],
  seeCommentState:true,
  scoreValue:5,
  commentText:'',
  likes:0
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  onClickLeft(){
    this.$router.go(-1)
  },
  getBookData(){
    this.id = this.$route.query.id
    this.axios.get('https://apis.netstart.cn/yunyuedu/book/getsub.json',{
      params:{
        id:this.id
      }
    }).then(result => {
      console.log('result ==> ',result);
      this.BookData = result.data.feed.entry
      this.name = this.BookData.author.name
      this.contentText = this.BookData.content.text
      this.clicksCount = this.BookData['pris:subscribe'].clicksCount
      this.words =this.BookData['pris:book'].words
      this.wprice = this.BookData['pris:book'].wprice
      this.bookImg = this.BookData.link[1].href
    })
  },
  goBook(){
    this.$router.push({path:'/readBook',query:{uuid:this.id}})
  },
  getCommentData(){
    this.axios.get('https://apis.netstart.cn/yunyuedu/comment/getComments.json',{
      params:{
        bookId:this.id
      }
    }).then(result => {
      this.commentData = result.data.all.list
    })
  },
  //加入书架
  addShelf(){
    this.shelfShow = !this.shelfShow
    let ids = {}
    ids.id = this.id
    ids.type = 'book'
    console.log('ids ==> ',ids);
    let localIds = JSON.parse(localStorage.getItem('ids')) || []
    localIds.push(ids)
    localStorage.setItem('ids',JSON.stringify(localIds))
    this.$toast('加入书架成功')
    console.log('localIds ==> ',localIds);
  },
  //移出书架
    moveShelf(){
      this.shelfShow = !this.shelfShow
      let ids = JSON.parse(localStorage.getItem('ids'))
      ids.forEach((v,i) => {
        if(v.id === this.id){
          ids.splice(i, 1);
        }
      })
      this.$toast('移出书架成功')
      localStorage.setItem('ids',JSON.stringify(ids))
    },
  seeComment(){
    this.seeCommentState = !this.seeCommentState
    this.total = 100;
    this.getCommentData()
  },
  senComment(){
    let user = JSON.parse(localStorage.getItem('user-info'))
    let appkey = JSON.parse(localStorage.getItem('appkey'))
    let obj = {}
    let time = new Date()
    user.forEach(v => {
      if(v.phone == appkey){
        obj.avatar = v.avatar
        obj.nickName = v.phone
        obj.userLevel = 1,
        obj.likes = this.likes
        obj.comment = this.commentText
        obj.grade = this.scoreValue
        obj.time = time
      }
    })
    console.log('obj==> ',obj);
    this.commentData.unshift(obj)
    this.show = !this.show
    this.commentText = ''
  },
  showComment(){
    let appkey = JSON.parse(localStorage.getItem('appkey')) || ''
    if(appkey === ''){
      this.$toast('请先登录')
      setTimeout(()=> {
        this.$router.push({name:'login'})
      },1000)
    }else{
      this.show = !this.show
    }
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  
  // console.log(this.$router.query.id);
  this.getBookData()
  this.getCommentData()
  let ids = JSON.parse(localStorage.getItem('ids')) || []
  if(ids.length === 0){
    this.shelfShow = true
  }
  ids.forEach(v => {
    if(v.id === this.id){
      this.shelfShow = false
    }else{
      this.shelfShow = true

    }
  })
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
  .van-nav-bar,.box,.botton-box{
    background-color: #2f2f2f;
  }
  .SplitBg{
    background-color: #363435;
  }
  .book-name,.catalogue-box,.van-icon{
    color: #777;
  }
  .type,.book-text-box,.contentDetail{
    color: #555;
  }
  .name{
    opacity: .5;
  }
  .left-title{
    color: #777;
  }
  .Buy,.add-bookshelf{
    color: #777;
  }
  .Trial{
    opacity: .8;
  }
}
/deep/.van-popup{
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.write-comment-box{
  
  .comment-score-box{
    // margin-top: 20px;
    margin: 20px 0;
    display: flex;
    padding: 0 20px;
    .score{

      font-size: 14px;
    }
    
  }
  .comment-text{
    padding: 0 20px;
    width: 100%;
    textarea{
      width: 100%;
      border: 0;
      font-size: 16px;
      overflow-y: auto;
    }
    input::-webkit-input-placeholder {
    /* placeholder颜色 */
    color: #aab2bd;
    /* placeholder字体大小 */
    font-size: 14px;
    }
  }
  .sendOut-comment{
    display: flex;
    padding: 0 20px;
    margin-bottom: 20px;
    .total{
      font-size: 14px;
      color: #888;
    }
    .sendOut{
      border-radius: 3px;
      padding: 5px 10px;
      background-color: #e84c2c;
      color: #fff;
      margin-left: auto;
      &.active{
        opacity: .6;
      }
    }
  }  
}
.box{
  padding-bottom: 50px;
}
.book-detail{
  margin-top: 5px;
  padding: 0 20px;
  display: flex;
  .book-img{
      width: 100px;
      height: 140px;
      background-color: #ccc;
      margin-right: 10px;
    }
  .book-text-box{
    flex: 1;
    .text{
      .book-name{
        font-size: 16px;
        margin-bottom: 8px;
      }
      .name-box{
        display: flex;
        margin-bottom: 8px;
        .type{
          color: #999;
        }
        .division{
          margin: 0 5px;
          color: #999;

        }
        .name{
          color: #74a6d7;
        }
      }
    }
    .evaluate{
      margin-bottom: 8px;
    }
    .count-box{
      display: flex;
      color: #888;
      margin-bottom: 8px;
      .word-count{
        margin-right: 20px;
      }
    }
    .price{
      color: #888;
    }
  }
}
.contentDetail{
  margin-top: 20px;
  padding: 0 20px;
  position: relative;
  color: #777;
  font-size: 14px;
  line-height: 22px;
}
.catalogue-box{
  padding: 0 20px;
  margin-bottom: 10px;
  display: flex;
  .icon{
    margin-right: 10px;
  }
  .timer{
    margin-right: 10px;
  }
  .right{
    margin-left: auto;
  }
}
.SplitLine{
  margin: 0 20px;
  margin-top: 15px;
  margin-bottom: 30px;
}
.SplitBg{
  width: 100%;
  height: 10px;
  background-color: #f5f5f5;
}
.comment-box{
  margin-top: 20px;
  padding: 0 20px;
  .top-title{
    display: flex;
    color: #333;
    margin-bottom: 20px;
    .left-title{
      margin-left: 10px;
      font-size: 16px;
      display: flex;
      position: relative;
      .rectangle{
        position: absolute;
        top: 5px;
        left: -10px;
        width: 2px;
        height: 40%;
        background-color: #666;
      }
    }
    .right-title{
      border: 1px solid #333;
      padding: 0 5px;
      border-radius: 5px;
      margin-left: auto;
      display: flex;
      font-size: 14px;
      .write-icon{
        margin-right: 2px;
      }
    }
  }
  
  .more-comment{
    margin-top: 30px;
    margin-bottom: 10px;
    text-align: center;
    .more-comment-text{
      color: #888;
      margin-bottom: 10px;
    }
    .more-bnt{
      margin: auto;
      width: 60px;
      height: 30px;
      line-height: 30px;
      border-radius: 30px;
      color: #f24a49;
      border: 1px solid #f24a49;
    }
  }
}
.botton-box{
  width: 100%;
  height: 50px;
  display: flex;
  // justify-content: space-between;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  border-top: 1px solid #eee;
  .add-bookshelf,.Buy,.Trial{
    color: #333;
    width: calc(100% / 3);
    text-align: center;
    line-height: 50px;
  }
  .Buy{
    border-left: 1px solid #ccc;
  }
  .Trial{
    background-color: #f24a49;
    color: #fff;
  }
}
/deep/.van-nav-bar .van-icon{
  font-size: 24px;
  color:#5b5b59;
}
</style>