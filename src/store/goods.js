import gs from '@/service/goods'

export default {
  state: {
    slider: [],
    keys: [],
    goodsInfo: {}
  },
  mutations: {
    setGoodsInfo(state, { goodsInfo, slider, keys }) {
      state.goodsInfo = goodsInfo;
      state.slider = slider;
      state.keys = keys;
    }
  },
  getters: { // 对state进行处理修改在此处设置
    goods: state => {  // 添加一个goods属性，转换对象形式为数组形式以便于渲染
      // console.log(state)
      return state.keys
      .map(key => state.goodsInfo[key])
      .reduce((prev, next) => prev.concat(next), []);
    }
  },
  // 只要是异步行为都要在actions执行
  actions: {
    fetchGoods({state, commit}) {
      // 没有数据则去采取
      if(!state.keys.length) {
        return gs.fetchGoodsInfo().then(info => {
          commit('setGoodsInfo', info)
        })
      }
    },
  }
}
