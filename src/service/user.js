
import axios from 'axios'
import api from './api'

export default {
  login(user) {
    return axios.get(api.login, {params: user})
  }
}