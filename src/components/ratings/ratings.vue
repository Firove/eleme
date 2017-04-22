<template>
<div class="ratings" ref="ratings">
  <div class="ratings-content">
    <div class="overview">
      <div class="overview-left">
        <h1 class="score">{{seller.score}}</h1>
        <div class="title">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <star :size="36" :score="seller.serviceScore" class="star"></star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">商品评分</span>
          <star :size="36" :score="seller.foodScore" class="star"></star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" @ratingtype="toggleRating" @toggle="toggleContent"></ratingselect>
    <div class="ratings-wrapper">
      <ul>
        <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
          <div class="avatar">
            <img :src="rating.avatar" width="28" height="28" />
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
              <span class="icon-thumb_up"></span>
              <span v-for="text in rating.recommend" class="text">{{text}}</span>
            </div>
            <div class="time">{{rating.rateTime | formatDate}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/date.js';
  import BScroll from 'better-scroll';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        showflag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if(response.errno === ERR_OK){
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    methods: {
      needShow(rateType, text){
        if(this.onlyContent && !text){
          return false;
        }
        if(this.selectType === ALL) {
          return true;
        }else{
          return rateType === this.selectType;
        }
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => { // 异步更新，只有当DOM更新以后才能refresh,刷新页面的高度
          this.scroll.refresh();
        });
      },
      toggleRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      ratingselect,
      split
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .ratings{
    color: black;
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width:100%;
    overflow: hidden;
    .overview{
      display: flex;
      padding:18px 0;
      .overview-left{
        flex:0 0 137px;
        padding: 6px 0;
        border-right: 1px solid rgba(7,17,27,0.1);
        text-align: center;
        // 兼容iphone5
        @media only screen and (max-width: 320px){
          flex: 0 0 120px;
          width: 120px;
        }
        .score{
          line-height: 28px;
          color: rgb(255,153,0);
          font-size: 20px;
          margin-bottom: 6px;
        }
        .title{
          line-height: 12px;
          font-size: 12px;
          margin-bottom: 8px;
          color: rgb(7, 17, 27);
        }
        .rank{
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right{
        flex:1;
        padding: 6px 0 0 24px;
        // 兼容iphone5
        @media only screen and (max-width: 320px){
          padding-left: 6px;
        }
        .score-wrapper{
          margin-bottom: 8px;
          font-size: 0;
          .title{
            font-size: 12px;
            line-height: 18px;
            color: rgb(7,17,27);
            vertical-align: top;
          }
          .star{
            display: inline-block;
            vertical-align: top;
            margin: 0 12px;
          }
          .score{
            color: rgb(255, 150, 30);
            font-size: 12px;
            line-height: 18px;
            vertical-align: top;
          }
        }
        .delivery-wrapper{
          margin-bottom: 8px;
          font-size: 0;
          .title{
            font-size: 12px;
            line-height: 18px;
            color: rgb(7,17,27);
            vertical-align: top;
          }
          .delivery{
            vertical-align: top;
            font-size: 12px;
            color: rgb(147,153,159);
            line-height: 18px;
            margin: 0 12px;
          }
        }
      }
    }
    .ratings-wrapper{
      padding: 0 18px;
      .rating-item{
        display: flex;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7,17,27,0.2);
        .avatar{
          flex: 0 0 28px;
          width: 28px;
          img{
            border-radius: 50%;
          }
          margin-right: 12px;
        }
        .content{
          flex:1;
          position: relative;
          .name{
            color: rgb(7, 17, 27);
            line-height: 12px;
            font-size: 10px;
            margin-bottom: 4px;
          }
          .star-wrapper{
            margin-bottom: 6px;
            font-size: 0;
            .star{
              display: inline-block;
              vertical-align: top;
              margin-right: 6px;
              line-height: 12px;
            }
            .delivery{
              vertical-align: top;
              font-size: 10px;
              color: rgb(147, 153, 159);
              line-height: 12px;
            }
          }
          .text{
            color: rgb(7,17,27);
            font-size: 12px;
            line-height: 18px;
            margin-bottom: 8px;
          }
          .recommend{
            font-size: 0;
            .icon-thumb_up{
              color: rgb(0, 160, 220);
              font-size: 12px;
              vertical-align: top;
              line-height: 16px;
              margin-right: 8px;
            }
            .text{
              vertical-align: top;
              line-height: 18px;
              color: rgb(147,153,159);
              font-size: 9px;
              margin: 0 8px 4px 0;
              border: 1px solid rgba(7,17,27,0.1);
              border-radius: 1px;
              padding: 0 6px;
            }
          }
          .time{
            font-size: 12px;
            position: absolute;
            top:0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
        }
      }
    }
  }
</style>
