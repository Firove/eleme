<template>
<div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="(item , index) in goods" class="goodType border-1px" :class="{'current': currentIndex === index}" @click="selectMenu(index,$event)">
        <span class="text">
          <span class="icon" v-show="item.type > 0"></span>
          {{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodWrapper">
    <ul>
      <li v-for="item in goods" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item border-1px">
            <div class="icon">
              <img :src="food.icon" width="57" height="57"/>
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="control-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
</div>
</template>

<script>
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';
  const ERR_OK=0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    created(){
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if(response.errno === ERR_OK){
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    computed: {
      currentIndex() {
        for(let i = 0;i<this.listHeight.length;i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(!height2|| (this.scrollY>=height1 && this.scrollY<height2)){
            return i;
          }
        }
        return 0;
      }
    },
    methods: {
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          // 派发自定义的单击事件
          click: true
        });
        this.foodScroll= new BScroll(this.$refs.foodWrapper, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight(){
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height=0;
        this.listHeight.push(height);
        for(let i = 0;i < foodList.length;i++){
          let item = foodList[i];
          height+=item.clientHeight;
          this.listHeight.push(height);
        }

      },
      selectMenu(index, event){
        // 自定义的单击事件里面有_constructed属性，而原生js事件中没有该_constructed属性
        if(!event._constructed){
          return;
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      }
    },
    components: {
      shopcart,
      cartcontrol
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
      &.current{
        background-color: white;
        font-weight: 700;
        margin-top: -1px;
        z-index: 10;
        .text{
          .border-none();
        }
      }
    }
  }
  .foods-wrapper{
    flex:1;
    .title{
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147,153,159);
      background-color: #f3f5f7;
    }
    .food-item{
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      .mixin(rgba(7,17,27,0.1));
      &:last-child{
        .border-none();
        margin-bottom: 0;
      }
      .icon{
        flex:0 0 57px;
        margin-right: 10px;
      }
      .content{
        flex:1;
        .name{
          margin:2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .desc{
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .extra{
          /*margin-bottom: 8px;*/
          line-height: 10px;
          font-size: 10px;
          color: rgb(147,153,159);
          .count{
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
        .control-wrapper{
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }

    }
  }
}
</style>
