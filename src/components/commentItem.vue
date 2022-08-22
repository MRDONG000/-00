<!--  -->
<template>
<div class=''>
  <div class="comment-item" v-for="(item,index) in list" :key="index">
      <div class="avatar">
        <img class="auto-img" :src="item.avatar" alt="">
      </div>
      <div class="user-info-box">
        <div class="user-info">
          <div class="user-name">{{item.nickName}}</div>
          <div class="user-grade"> LV.{{item.userLevel}}</div>
          <div class="like-count">
            <div class="count">{{item.likes}}</div>
            <div class="icon">
              <van-icon name="good-job-o" color="#666" size="18"/>
            </div>
          </div>
        </div>
        <div class="timer-box">
          <div class="score"><van-rate v-model="item.grade" readonly  color="#f5ad3a" size="12"/></div>
          <div class="tiemr">{{item.time | formateDate}} </div>
        </div>
        <div class="comment-text">
          {{item.comment}}
        </div>
      </div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {formateDate } from '../api/uset'
export default {
//import引入的组件需要注入到对象中才能使用
props:{
  list:{
    typeof:Array,
    default:[],
  }
},
components: {},
data() {
//这里存放数据
return {
evaluateValue:5
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
filters:{
  formateDate (time) {
    let date = new Date(time)
    return formateDate(date, 'MM-dd hh:mm')
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
  
  // .top-title{
  //   color: #777;
  // }
  
  .user-info,.avatar{
    opacity: .5;
  }
  .left-title,.comment-text{
    color: #777;
  }
}
.comment-item{
    display: flex;
    margin-bottom: 20px;
    &:last-child{
      margin-bottom: 20px;
    }
    .avatar{
      width: 35px;
      height: 35px;
      margin-right: 10px;
      border-radius: 50%;
      background-color: #ccc;
      overflow: hidden;

    }
    .user-info-box{
      flex: 1;
      .user-info{
        display: flex;
        align-items: center;
        .user-name{
          color: #74a6d7;
          margin-right: 5px;
          font-size: 14px;
        }
        .user-grade{
          padding: 0 2px;
          font-size: 12px;
          border: 1px solid #c39798;
          border-radius: 3px;
          color: #c39798;
        }
        .like-count{
          display: flex;
          color: #666;
          margin-left: auto;
          align-items: center;
          .icon{
            margin-left: 2px;
          }
        }
      }
      .timer-box{
        display: flex;
        align-items: center;
        color: #888;
        .score{
          margin-top: 5px;
          margin-bottom: 8px;
          margin-right: 10px;
        }
      }
      .comment-text{
        font-size: 14px;
        color: #333;
        line-height: 20px;
      }
    }
  }
</style>