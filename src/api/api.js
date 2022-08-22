import axios from 'axios'

export function bookcontent(id) {

  return axios.get(`https://apis.netstart.cn/yunyuedu/store/show.json?type=recommend&uuid=${id}`)
}