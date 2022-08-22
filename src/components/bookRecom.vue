// <template>
//   <div>
//     <van-tabs v-model="tabsActive"  background="rgba(255,255,255,0)">
//         <van-tab v-for="(itme,index) in product" :title="itme.name" :to="{name: titleTo[index].routerName}">
//         </van-tab>
//       </van-tabs>
//     <router-view/>
//   </div>
// </template>

// <script>
//   export default {
//     name: 'bookRecom',
//     props: {
//       pro: {
//         type: Object,
//         default() {
//           return {};
//         }
//       }
//     }
//   }
// </script>

// <style lang="less" scoped>
// .topHeader{
//     /deep/.van-tab{
//       color: #9e9e9e;
//     }
//     /deep/ .van-tab--active{
//       color: #2d2d2d;
//       font-size: 16px;
//       font-weight: 600;
//     }
//     /deep/ .van-tabs__line{
//       width: 20px;
//     }
//   }
// }
// </style>