<template>
  <transition name="move">
    <div v-show="showflag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image"/>
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst($event)">加入购物车</div>
          </transition>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @cartadd="_drop"></cartcontrol>
          </div>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="pingjia">
          <h1 class="title">商品评价</h1>
          <ratingselect :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" @ratingtype="toggleRating" @toggle="toggleContent"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar"/>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></span><span class="contenta">{{rating.text}}</span>
                </p>
              </li>
            </ul>
            <div v-show="!food.ratings || !food.ratings.length" class="no">暂无评论</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/date.js';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
    export default {
      props: {
        food: {
          type: Object
        }
      },
      data() {
        return {
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
        },
        show() {
          this.showflag = true;
          this.selectType = ALL;
          this.onlyContent = false;
          this.$nextTick(() => {
            if(!this.scroll){
              this.scroll = new BScroll(this.$refs.food, {
                click: true
              });
            }else{
              this.scroll.refresh();
            }
          });
        },
        hide() {
          this.showflag = false;

        },
        _drop(target) {
          this.$emit('cartadd', target);
        },
        addFirst(event){
          if(!event._constructed){
            return;
          }
          this.$emit('cartadd', event.target);
          if(!this.food.count){
            this.$set(this.food, 'count', 1);
          }else{
            this.food.count ++;
          }
        }
      },
      components: {
        BScroll,
        cartcontrol,
        split,
        ratingselect
      },
      filters: {
        formatDate(time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

  .food{
    position: fixed;
    left:0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #ffffff;
    &.move-enter-active,&.move-leave-active{
      transition: all .3s linear;
    }
    &.move-enter, &.move-leave-active {
      transform: translate3d(100%,0,0);
    }
    .food-content{
      .image-header{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;// 相对盒子的宽度进行计算的
        img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .back{
          position: absolute;
          top:10px;
          left:0;
          .icon-arrow_lift{
            display: block;
            padding: 10px;
            font-size: 20px;
            color: #ffffff;
          }
        }
      }
      .content{
        position: relative;
        color: rgb(7,17,27);
        padding: 18px;
        .title{
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
        }
        .detail{
          margin-bottom: 18px;
          line-height: 10px;
          font-size: 0;
          height: 10px;
          .sell-count,.rating{
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .sell-count{
            margin-right: 12px;
          }
        }
        .price{
          font-weight: 700;
          line-height: 24px;
          .now{
            color: rgb(240,20,20);
            margin-right: 18px;
            font-size: 14px;
          }
          .old{
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper{
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
        .buy{
          position: absolute;
          right: 18px;
          bottom: 18px;
          background-color: rgb(0,160,220);
          z-index: 10;
          line-height: 24px;
          height: 24px;
          padding: 0 12px;
          box-sizing: border-box;
          font-size: 10px;
          border-radius: 12px;
          color: #ffffff;
          &.fade-enter-active,&.fade-leave-active{
            transition: all 0.3s;
          }
          &.fade-enter,&.fade-leave-active{
            opacity: 0;
          }
        }
      }

    }
    .info{
      padding: 18px;
      .title{
        line-height: 14px;
        margin-bottom: 16px;
        font-size: 14px;
        color: rgb(55, 53, 71);
      }
      .text{
        color: rgb(77, 85, 93);
        padding: 0 8px;
        font-size: 12px;
        line-height: 14px;
      }
    }
    .pingjia{
      padding-top: 18px;
      .title{
        line-height: 14px;
        margin-left: 18px;
        font-size: 14px;
        color: rgb(55, 53, 71);
      }
      .rating-wrapper{
        color: #000000;
        padding: 0 18px;
        .rating-item{
          position: relative;
          padding: 16px 0;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          .user{
            position: absolute;
            right: 0;
            top: 16px;
            font-size: 0;
            line-height: 12px;
            .name{
              font-size: 10px;
              color: rgb(147, 153, 159);
              margin-right: 6px;
              vertical-align: top;
            }
            .avatar{
              border-radius: 50%;
            }
          }
          .time{
            margin-bottom: 6px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .text{
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            .icon-thumb_up{
              color: rgb(0,160,220);
              line-height: 16px;
              margin-right: 4px;
              font-size: 12px;
            }
            .icon-thumb_down{
              color: rgb(147,153,159);
              line-height: 16px;
              margin-right: 4px;
              font-size: 12px;
            }
            .contenta{
              /*padding: 0;*/
            }
          }
        }
        .no{
          padding:16px 0;
          font-size: 12px;
          color: rgb(147, 153, 159);
       }
      }

    }
  }

</style>
