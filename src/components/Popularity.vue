<!--  -->
<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <div class="Popularity-box" v-if="item.module === 36">
        <div class="Popularity-top-title">
          {{ item.name }}
        </div>
        <div class="Popularity-item" v-for="v in item.list" :key="v.id" @click="toBook(v)">
          <div class="Popularity-img">
            <img class="auto-img" :src="v.cover" alt="" />
          </div>
          <div class="Popularity-text">
            <div class="Popularity-title ">{{ v.title }}</div>
            <div class="Popularity-type">{{ v.author }} / {{ v.category }}</div>
            <div class="Popularity-introduce van-multi-ellipsis--l2">
              {{ v.content }}
            </div>
          </div>
        </div>
      </div>
      <div class="ranking-box" v-if="item.module === 34">
        <div class="ranking-title">
          {{item.name}}
        </div>
        <div class="ranking">
          <div class="ranking-item" v-for="(v,i) in item.list" :key="v.id" @click="toBook(v)">
            <div class="ranking-img">
              <div class="ranking-top" :style="{backgroundImage: `url('https://m.yuedu.163.com/assets/mobile/images/index18/icon_0${i + 1}.png?5b202029')`}"></div>
              <img class="auto-img" :src="v.cover" alt="">
            </div>
            <div class="ranking-title">{{v.title}}</div>
          </div>
          
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["list"],

  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toBook(item){
      // console.log('item ==> ',item);
      this.$router.push({path:'/readBook',query:{uuid:item.id}})
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
#app.night{
  
  .ranking-title,.ranking-title,.Popularity-top-title,.Popularity-title {
    color: #777;
  }
  .ranking-img,.Popularity-img{
    opacity: .5;
    background-color: #312b2d;
    box-shadow: 2px 2px 8px #312b2d;
  }
  .name,.Popularity-text{
    color: #555;
  }
}
.Popularity-box {
  margin-top: 35px;
  padding: 0 25px;
  
  .Popularity-top-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .Popularity-item {
    display: flex;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    .Popularity-img {
      width: 75px;
      height: 100px;
      margin-right: 15px;
      background-color: #ccc;
      box-shadow: 2px 2px 8px #ccc;
    }
    .Popularity-text {
      flex: 1;
      .Popularity-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .Popularity-type {
        color: #666;
        margin-bottom: 10px;
      }
      .Popularity-introduce {
        color: #666;

        line-height: 20px;
        letter-spacing: 1px;
      }
    }
  }
}
.ranking-box{
  margin-top: 35px;
  padding: 0 25px;
  .ranking{
    margin-top: 25px;
    display: flex;

  }
  .ranking-title{
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .ranking-item{
    text-align: center;
    margin-right: 15px;
    &:last-child{
      margin-right: 0;
    }
    .ranking-title{
      font-size: 14px;
      font-weight: normal;
    }
    .ranking-img{
      width: 100px;
      height: 140px;
      background-color: #ccc;
      margin-bottom: 10px;
      box-shadow: 2px 2px 8px #ccc;
      position: relative;
      .ranking-top{
        position: absolute;
        top: -12px;
        left: 0;
        right: 0;
        width: 100%;
        height: 22px;
        background: 0 0 no-repeat;
        background-size: 100% auto;
        z-index: 9;
        
      }
    }
  }
}
</style>
