<template>
    <div class="shopcat">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': num }">
              <i class="icon-shopping_cart" :class="{'highlight': num }"></i>
            </div>
            <div class="num" v-show="num">{{num}}</div>
          </div>
          <div class="price" :class="{'highlight': num }">￥{{totalPrice}}</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" :class="{'highlight': isPrice }">
          <div class="pay" :class="{'highlight': isPrice }">
            {{payDesc}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          isPrice: 0
        };
      },
      props: {
          deliveryPrice: {
            type: Number,
            default: 0
          },
          minPrice: {
            type: Number,
            default: 0
          },
          selectFoods: {
            type: Array,
            default() {
              return [
                {price: 10, count: 2},
                {price: 20, count: 2}
              ];
            }
          }
      },
      computed: {
        totalPrice() {
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.price * food.count;
          });
          return total;
        },
        num() {
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.count;
          });
           return total;
        },
        payDesc() {
          if(this.totalPrice === 0){
            return `￥${this.minPrice}元起送`;
          }else if(this.totalPrice>0&&this.totalPrice<this.minPrice){
            let diff = this.minPrice - this.totalPrice;
            return `还差￥${diff}元起送`;
          }else{
            this.isPrice = 1;
            return '去结算';
          }
        }
      }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
.shopcat{
  position: fixed;
  left:0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content{
    display: flex;
    background-color: #141d27;
    font-size: 0;
    .content-left{
      flex:1;
      .logo-wrapper{
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        // ///////////
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background-color: #141d27;
        .logo{
          width: 100%;
          height: 100%;
          text-align: center;
          border-radius: 50%;
          background-color: #2b343c;
          &.highlight{
            background-color: rgb(0,160,220);
          }
          .icon-shopping_cart{
            font-size: 24px;
            color: #80858a;
            line-height: 44px;
            &.highlight{
              color: #ffffff;
            }
          }
        }
        .num{
          position: absolute;
          top:0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background-color: rgb(240,20,20);
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
        }
      }
      .price{
        display: inline-block;
        vertical-align: top;
        font-weight: 700;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        border-right: 1px solid rgba(255,255,255,0.1);
        font-size: 16px;
        color: #80858a;
        &.highlight{
          color: #ffffff;
        }
      }
      .desc{
        display: inline-block;
        margin-top: 12px;
        line-height: 24px;
        font-size: 12px;
        margin-left: 12px;
        color: #80858a;
      }
    }
    .content-right{
      flex:0 0 105px;
      width: 105px;
      background-color: #2b333b;
      &.highlight{
        background-color: #00b43c;
      }
      .pay{
        font-size: 12px;
        line-height: 48px;
        text-align: center;
        color: #80858a;
        &.highlight{
          color: #ffffff;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
