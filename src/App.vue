<template>
  <div id="app">
    <router-view/>
    <!-- <button v-if="$store.state.user.isLogin" @click="logout">注销</button>
   -->
    <cube-tab-bar v-model="selectLabel" :data="tabs" @change="onChangeTab">
      <cube-tab v-for="(item, index) in tabs" 
                :icon="item.icon" :label="item.value" :key="index">
        <div>{{item.label}}</div>
        <!-- <span class="badge" v-if="item.label === 'Cart'">{{cartTotal}}</span> -->
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      transitionName: 'route-forward',
      selectLabel: "/",
      tabs: [
        {
          label: "Home",
          value: "/",
          icon: "cubeic-home"
        },
        {
          label: "Cart",
          value: "/cart",
          icon: "cubeic-mall"
        },
        {
          label: "User",
          value: "/about",
          icon: "cubeic-person"
        }
      ]
    }
  },
  components: {
    // HelloWorld
  },
  created() {

  },
  watch: {
    $route(route) { // 监听路由变化并动态设置页面的选中状态
      this.selectLabel = route.path;
      this.transitionName = this.$router.transitionName;
    }
  },
  computed: {
    // ...mapGetters([cartTotal])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    onChangeTab(val) {
      this.$router.push(val)
    }
  }
}
</script>

<style lang='stylus' >
html, body 
  width 100%
  height 100%

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width:100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.cube-tab-bar 
  position absolute;
  width 100%
  bottom 0px

</style>
