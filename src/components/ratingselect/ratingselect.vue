<template>
    <div class="ratingselect">
      <div class="ratingtype">
        <span class="desc-all"   :class="{'active': selectType === 2}"  @click="select(2, $event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span class="desc-positive" :class="{'active': selectType === 0}"  @click="select(0, $event)">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
        <span class="desc-negative" :class="{'active': selectType === 1}"  @click="select(1, $event)">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
      </div>
      <div class="switch" :class="{'on': onlyContent}" @click="toggle($event)">
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>

    </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
    export default {
      props: {
        ratings: {
          type: Array,
          default() {
            return [];
          }
        },
        selectType: {
          type: Number,
          default: ALL
        },
        onlyContent: {
          type: Boolean,
          default: false
        },
        desc: {
          type: Object,
          default() {
            return {
              all: '全部',
              positive: '满意',
              negative: '不满意'
            };
          }
        }
      },
      methods: {
        select(type, event) {
          if(!event._constructed){
            return;
          }
          this.$emit('ratingtype', type);// 发送事件改变父组件的selectType，父组件的改变可以传递给子组件

        },
        toggle(event){
          if(!event._constructed){
            return;
          }
          this.$emit('toggle');// 发送事件改变父组件的onlyContent
        }
      },
      computed: {
        positive() {
          return this.ratings.filter((rating) => {
            return rating.rateType === POSITIVE;
          });
        },
        negative() {
          return this.ratings.filter((rating) => {
            return rating.rateType === NEGATIVE;
          });
        }
      }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
.ratingselect{
  color: #000000;
  .ratingtype{
    padding: 18px 0;
    margin:0 18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    font-size: 0;
    .desc-all,.desc-positive,.desc-negative{
      display: inline-block;
      padding: 8px 12px;
      border-radius: 2px;
      margin-right: 8px;
      color: rgb(77,85,93);
      font-size: 12px;
      line-height: 16px;
      vertical-align: bottom;
      .count{
        font-size: 8px;
        margin-left: 2px;
      }
    }
    .desc-all,.desc-positive{
      background-color: rgba(0,160,220,0.2);
      &.active{
        background-color: rgb(0,160,220);
        color: #ffffff;
      }
    }
    .desc-negative{
      background-color: rgba(77,85,93,0.2);
      &.active{
        background-color: rgb(77,85,93);
        color: #ffffff;
      }
    }

  }
  .switch{
    padding:12px 18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    color: rgb(147, 153, 159);
    font-size: 0;
    &.on{
      .icon-check_circle{
        color: #00c850;
      }
    }
    .icon-check_circle{
      margin-right: 4px;
      font-size: 24px;

    }
    .text{
      font-size: 12px;
      vertical-align: top;
      line-height: 24px;
    }
  }
}
</style>
