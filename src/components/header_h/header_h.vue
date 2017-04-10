<template>
<div id="header">
  <div class="content-wrapper">
    <div class="avatar">
      <img :src="seller.avatar" width="64" height="64">
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"><img src="./brand@2x.png" height="18" width="30"/></span>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="description">
        {{seller.description}}/{{seller.deliveryTime}}分钟送达
      </div>
      <div v-if="seller.supports" class="supports">
        <span class="icon">
          <img src="./decrease_1@2x.png" height="12" width="12"/>
        </span>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
    </div>
    <div class="support-count"  v-if="seller.supports"  @click="showDetail()">
      <span class="count">{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
  <div class="bulletin-wrapper" @click="showDetail()">
    <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    <i class="icon-keyboard_arrow_right"></i>
  </div>
  <div class="bkimg">
    <img :src="seller.avatar"/>
  </div>
  <div class="detail" v-show="detailShow">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <div class="name">{{seller.name}}</div>
        <div class="star-wrapper">
          <star :score="seller.score" :size="48"></star>
        </div>
      </div>
    </div>
    <div class="detail-close">
      <i class="icon-close"></i>
    </div>
  </div>
</div>
</template>

<script>
  import star from '../star/star.vue';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data(){
    return {
      detailShow: false
    };
  },
//  created() {
//    this.iconMap = ['./decrease_1@2x.png', './discount_1@2x.png', './special_1@2x.png', './invoice_1@2x.png', './guarantee_1@2x.png'];
//  },
  methods: {
    showDetail(){
      this.detailShow = true;
    }
  },
  components: {
    star
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  #header{
    height: 134px;
    position: relative;
    background-color: rgba(0,0,0,0.5);
    .content-wrapper{
      position: relative;
      padding: 24px 12px 18px 24px;//up right down left
      font-size: 0;//消除默认的空白字符
      .avatar{
        display: inline-block;
      }
      .content{
        font-size: 0;
        display: inline-block;
        color: #fff;
        margin-left: 16px;
        .title{
          font-size: 0;
          .brand{
            display: inline-block;
            vertical-align: top;
            margin-right: 6px;
          }
          .name{
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
          margin: 2px 0 8px 0;
        }
        .description{
          margin-bottom: 10px;
          font-size: 12px;
          line-height: 12px;
          font-weight: 200;
        }
        .supports{
          font-size: 0;
          .icon{
            display: inline-block;
            vertical-align: top;
            margin-right: 4px;
          }
          .text{
            font-size: 10px;
            line-height: 12px;
            font-weight: 200;
          }
        }
      }
      .support-count{
        position: absolute;
        right:12px;
        bottom:14px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background-color: rgba( 0, 0, 0, 0.2 );
        .count{
          vertical-align: top;
          font-size: 10px;
          font-weight: 200;
          line-height: 24px;
          margin-right: 2px;
        }
        .icon-keyboard_arrow_right{
          font-size: 10px;
          line-height: 24px;
        }
      }
    }
    .bulletin-wrapper{
      position: relative;
      padding: 0 24px 0 12px;
      height:28px;
      background-color: rgba( 0, 0, 0, 0.2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .bulletin-text{
        font-size: 10px;
        line-height: 28px;
      }
      .bulletin-title{
        display: inline-block;
        background: url("./bulletin@2x.png") no-repeat;
        width: 22px;
        height: 12px;
        background-size: 22px 12px;
        vertical-align: top;
        margin-right: 4px;
        margin-top: 7px;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 11px;
      }
    }
    .bkimg{
      position: absolute;
      top:0;
      left:0;
      z-index: -1;
      width: 100%;
      height:100%;
      overflow: hidden;
      filter: blur(10px);
      img{
        width: 100%;
      }

    }
    .detail{
      position: fixed;
      overflow: auto;
      z-index: 100;
      width: 100%;
      height: 100%;
      top:0;
      left:0;
      background-color: rgba(7,17,27,0.8);
      .detail-wrapper{
        width: 100%;
        min-height: 100%;
        .detail-main{
          margin-top: 64px;
          padding-bottom: 64px;
          .name{
            line-height: 16px;
            text-align: center;
            font-size:16px;
            font-weight: 700;
          }
          .star-wrapper{
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
        }
      }
      .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;

      }
    }
  }

</style>
