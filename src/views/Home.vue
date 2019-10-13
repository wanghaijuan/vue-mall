<template>
  <div class="home">
    <!-- <router-link to="/login">Login</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/cart">Cart</router-link> -->
    <div class="outer">
    <!-- 轮播图 -->
    <div class="banner">
      <cube-slide :data="slider" :interval="3000">
      <cube-slide-item v-for="(item,index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img class="slider" :src="item.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>
    </div>
    

     <!-- 商品列表 -->
    <good-list :data="goods" @cartanim="startCartAnim" ></good-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import GoodList from "@/components/GoodList.vue";

export default {
  name: 'home',
  components: {
    GoodList
  },
  created() {
    this.fetchGoods();
    console.log()
  },
  computed: {
    ...mapState({slider: state => state.goods.slider}),
    ...mapGetters(['goods'])
  },
  methods: {
    ...mapActions(['fetchGoods']),
    startCartAnim(el) {

    }
  }
}
</script>

<style  lang='stylus' scoped >
.home
  position absolute
  top 0px
  bottom 47px
  width 100%
  overflow-x hidden 
  overflow-y auto

  .outer { 
    height: 100%; 
    padding: 226px 0 0; 
    box-sizing: border-box; 
  }

  //轮播图
  .banner { 
    height: 226px; 
    margin: -226px 0 0; 
    background: #BBE8F2; 
  }
  .cube-slide-item {
    a {
      img {
        width 100%
      }
    }
  }
        
  // 滚动条
  .goods-list { 
    width: 100%; 
    height: 100%; 
    overflow-y: auto;
  }
</style>