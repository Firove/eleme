<template>
    <div class="shopcat">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay">
            ￥{{minPrice}}元起送
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
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
              return [];
            }
          }
      },
      computed: {
        totalPrice() {
          let total = 0;
          this.selectFoods.forEach((food) => {
            total = food.price * food.count;
          });
          return total;
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
          .icon-shopping_cart{
            font-size: 24px;
            color: #80858a;
            line-height: 44px;

          }
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
      .pay{
        font-size: 12px;
        line-height: 48px;
        text-align: center;
        color: #80858a;
      }
    }
  }
}
</style>
