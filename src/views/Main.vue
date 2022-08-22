<template>
  <div class="main">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <div>
      <van-tabbar v-model="active" active-color="#3e3e3e" inactive-color="#cccccc" route>
        <van-tabbar-item v-for="itme in tabbarData" :to="{name:itme.routerName} ">
          <span>{{itme.titel}}</span>
          <template #icon="props">
            <img :src="props.active ? itme.active : itme.inactive" />
          </template>
        </van-tabbar-item>
        
      </van-tabbar>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'Main',
  data(){
    return{
      active: 0,
      tabbarData:[
        {
          titel:'书架',
          routerName: "shelf",
          active: require('../assets/Shelf_active.png'),
          inactive: require('../assets/Shelf.png')
        },
        {
          titel:'书城',
          routerName: "bookstore",
          active: require('../assets/Bookstore_active.png'),
          inactive: require('../assets/Bookstore.png')
        },
        {
          titel:'分类',
          routerName: "sort",
          active: require('../assets/Sort_active.png'),
          inactive: require('../assets/sort.png')
        },
        {
          titel:'我的',
          routerName: "my",
          active: require('../assets/My-active.png'),
          inactive: require('../assets/My.png')
        },
      ]
    }
  }
}
</script>
