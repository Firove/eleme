<template>
  <div id="app">
    <headerH :seller="seller"></headerH>
    <div class="tab">
      <ul class="border-1px">
        <li class="item"><router-link to="/goods">商品</router-link></li>
        <li class="item"><router-link to="/ratings">评价</router-link></li>
        <li class="item"><router-link to="/seller">商家</router-link></li>
      </ul>
    </div>
    <router-view></router-view>
    <div id="content">我是内容</div>
  </div>
</template>

<script>
  import headerH from './components/header_h/header_h.vue';
  export default {
    data() {
      return {
        seller: {}
      };
    },
    components: {
      headerH
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === 0){
          this.seller = response.data;
        }
      });
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import './common/less/mixin.less';
  @import './common/less/base.less';
  *{
    padding: 0;
    margin: 0;
  }
  li{
    list-style-type: none;
  }
  a{
    text-decoration: none;
  }
 .tab ul{
   display: -webkit-flex;
   display: flex;
   height: 40px;
   background-color: white;
   width: 100%;
   line-height: 40px;
    .item{
      flex: 1;
      text-align: center;
    }
   a{
     display: block;
     font-size: 14px;
     color: rgb(77,85,93);
     width: 100%;
     height: 100%;
   }
   .router-link-active{
     color: red;
   }
   .mixin(rgba(7,17,27,0.1));
  }
</style>
