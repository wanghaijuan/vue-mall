import axios from 'axios'
import api from './api'

export default {
  fetchGoodsInfo() {
    return axios.get(api.goods)
    .then(res => {
      if(res.data.code) {
        const { data: goodsInfo, slider, keys} = res.data;
        return { goodsInfo, slider, keys };
      } else {
        return null;
      }
    })
  }
}