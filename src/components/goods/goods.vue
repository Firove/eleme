<template>
<div class="goods">
  <div class="menu-wrapper">
    <ul>
      <li v-for="item in goods" class="goodType border-1px">
        <span class="text">
          <span class="icon" v-show="item.type > 0"></span>
          {{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper">
    <ul>
      <li v-for="item in goods" class="food-list">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item">
            <div class="icon">
              <img :src="food.icon"/>
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span>月售{{food.sellCount}}份</span>
                <span>好评率{{food.rationg}}%</span>
              </div>
              <div class="price">
                <span>￥{{food.price}}</span>
                <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
  const ERR_OK=0;
  export default {
    pro: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: []
      };
    },
    created(){
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if(response.errno === ERR_OK){
          this.goods = response.data;
        }
      });
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../common/less/mixin.less';
.goods{
  color: #000;
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width:100%;
  overflow: hidden;
  .menu-wrapper{
    flex: 0 0 80px;// flex-grow/flex-shrink/flex-basis
    width: 80px;
    background-color: #f3f5f7;
    .goodType{
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      font-size: 0;
      .icon{
        line-height: 14px;
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: top;
        background-image: url('./special_1@2x.png');
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }
      .text{
        line-height: 14px;
        display: table-cell;
        width: 56px;;
        vertical-align: middle;
        .mixin(rgba(7,17,27,0.1));
        font-size: 12px;
      }
    }
  }
  .foods-wrapper{
    flex:1;
  }
}
</style>
