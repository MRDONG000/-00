<template>
  <div class="strongPush" >
    <div class="strong-item" v-if="listTwo.length !== 0" >
      <div class="top-title van-ellipsis">{{listTwo.name}}</div>
      <div class="book-top-detail-box" v-for="item in listTwo.list.slice(0,1)" :key="item.id" @click="toBook(item)">
        <div class="book-img">
          <img class="auto-img" :src="item.cover" alt="">
        </div>
        <div class="book-text">
          <div class="title">{{item.title}}</div>
          <div class="boox-type">{{item.author}} / {{item.category}}</div>
          <div class="introduce van-multi-ellipsis--l3">{{item.content}}</div>
        </div>
      </div>
      <div class="book-bottom-detail-box">
        <div class="bottom-detail-item" v-for="item in listTwo.list.slice(1,5)" :key="item.id" @click="toBook(item)">
          <div class="book-bottom-img">
            <img class="auto-img" :src="item.cover" alt="">
          </div>
          <div class="book-bottom-title">{{item.title}}</div>
          <div class="book-bottom-name">{{item.author}}</div>
        </div>
      </div>
      <div class="van-hairline--bottom"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'StrongPush',
    data() {
      //这里存放数据
      return {
        listData:[]
      };
    },
    
    props:{
      list:{
        typeof:Object,
        default:{
          list:[
            
          ]
        }
      },
      listOne:{
        typeof:Object,
        default:{
          list:[
            
          ]
        }
      },
      listTwo:{
        typeof:Object,
        default:{
          list:[
            
          ]
        }
      }
      
    },
    
    methods:{
      toBook(item){
        console.log('item ==> ',item);
        this.$router.push({path:'/readBook',query:{uuid:item.id}})
      }
    }
    
  }
</script>

<style lang="less" scoped>
#app.night{
  .top-title{
    color: #777777;
  }
  .book-img{
    opacity: .5;
    background-color: #2e2e2e;
    box-shadow: 2px 2px 8px #2d2e2a;
  }
  .title{
    color: #777;
  }
  .book-text{
    color: #555;
  }
  .book-bottom-img{
    opacity: .5;

    background-color: #2b2b2b;
    box-shadow: 2px 2px 8px #2b2b2b;
  }
  .book-bottom-title{
    color: #777;
  }
  .book-bottom-name{
    color: #555;
  }
}
/deep/.van-hairline--bottom{
  margin-top: 20px;
}
.strongPush{
  padding: 0 25px;
  .strong-item{
      margin: 35px 0;
    .top-title{
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .book-top-detail-box{
      display: flex;
      .book-img{
        width: 82px;
        height: 115px;
        margin-right: 10px;
        background-color: #cccccc;
        box-shadow: 2px 2px 8px #ccc;
      }
      .book-text{
        flex: 1;
        color: #777;
        .title{
          font-size: 16px;
          font-weight: 600;
          color: #000;
        }
        .boox-type{
          margin-top: 6px;
          margin-bottom: 10px;
        }
        .introduce{
          line-height: 20px;
          letter-spacing: 1px
        }
      }
    }
    .book-bottom-detail-box{
      display: flex;
      margin-top: 15px;
      .bottom-detail-item{
        margin-right: 15px;
        &:last-child{
          margin-right: 0;
        }
        .book-bottom-img{
          width: 70px;
          height: 100px;
          background-color: #ccc;
          box-shadow: 2px 2px 8px #ccc;
          margin-bottom: 8px;
        }
        .book-bottom-title{
          width: 70px;
          font-size: 14px;
          margin-bottom: 2px;
          color: #000;
        }
        .book-bottom-name{
          color: #666;
        }
      }
    }
  }
}
</style>