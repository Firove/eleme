<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count > 0" @click="decCount($event)">
            <span class="icon-remove_circle_outline"></span>
        </div>
      </transition>
      <div class="count" v-show="food.count > 0">{{food.count}}</div>
      <div class="cart-add" @click="addCount($event)">
        <i class="icon-add_circle"></i>
      </div>
    </div>
</template>

<script>
//  import Vue from 'vue';
    export default {
      props: {
        food: {
          type: Object
        }
      },

      methods: {
        addCount(event){
          if(!event._constructed){
            return;
          }
          if(!this.food.count) {
            this.$set(this.food, 'count', 1);
          }else{
            this.food.count ++;
          }
        },
        decCount(event) {
          if(!event._constructed){
            return;
          }
          if(this.food.count > 0){
            this.food.count --;
          }
        }
      }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
.cartcontrol{
  font-size: 0;
  .cart-decrease{
    display: inline-block;
    padding: 6px;
    .icon-remove_circle_outline{
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0,160,220);
    }
  }
  .count{
    display: inline-block;
    font-size: 10px;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    color: rgb(147, 153, 159);

  }
  .cart-add{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0,160,220);
  }

  .move-enter-active, .move-leave-active{
    transition: all .3s linear;
    .icon-remove_circle_outline{
      transition: all .3s linear;

    }
  }
  .move-enter, .move-leave-active {
    transform: translate3D(24px,0,0);
    opacity: 0;
    .icon-remove_circle_outline{
      transform: rotate(180deg);
    }
  }
  /*.roll-enter-active,.roll-leave-active{*/
    /*transition: all .3s linear;*/
  /*}*/
  /*.roll-enter, .roll-leave-active{*/
    /*transform: rotate(180deg);*/
  /*}*/
}


</style>
