<template>
<div class="seller">
  <div class="overview">
    <div class="up">
      <div class="title">{{seller.name}}</div>
      <div class="desc">
        <star :size="36" :score="seller.score"></star>
        <span class="text">({{seller.ratingCount}})</span>
        <span class="text">月售{{seller.sellCount}}单</span>
      </div>
      <ul class="remark">
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>平均配送时间</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
    </div>
    <split></split>
  </div>
</div>
</template>

<script>
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .seller{
    color: black;
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width:100%;
    overflow: hidden;
    .overview{
      .up{
        padding:18px 18px 0 18px;
      }
      .title{
        margin-bottom:  8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
        font-weight: 200;
      }
      .desc{
        font-size: 0;
        line-height: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .star{
          display: inline-block;
          vertical-align: top;
          margin-right: 8px;
        }
        .text{
          vertical-align: top;
          font-size: 10px;
          color: rgb(77, 85, 93);
          margin-right: 12px;
        }
      }
      .remark{
        display: flex;
        padding:18px 0;
        .block{
          flex:1;
          text-align: center;
          display: inline-block;
          border-right: 1px solid rgba(7,17,27,0.1);
          &:last-child{
            border: 0;
          }
          h2{
            margin-bottom: 4px;
            line-height: 10px;
            color: rgb(147,153,159);
            font-size: 10px;
            font-weight: 200;

          }
          .content{
            color: rgb(7, 17, 27);
            line-height: 24px;
            font-size: 10px;
            .stress{
              font-size: 24px;
              font-weight: 200;
            }
          }
        }

      }
    }
  }

</style>
