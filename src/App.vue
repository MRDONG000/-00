<template>
  <div id="app" :class="{night : nightState}" >
    <router-view/>
          
  </div>
</template>
<script>

export default ({
  computed:{
    nightState(){

      return this.$store.state.nightState
    }
  }
})
</script>

<style lang="less">
*{
  box-sizing: border-box;
 
}
.night{
  .van-tabbar{
  background-color: #2f2f2f;
}
.van-tabbar-item--active{
  background-color: #2f2f2f;
}
.van-tab__text{
    color: #707070;
  }
  .van-tabs__nav{
    background-color: #2f2f2f;
  }
}
.auto-img{
  width: 100%;
  height: 100%;
  display: block;
}
</style>
