import axios from 'axios'
import {Message} from "element-ui";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencodeo'
axios.defaults.baseURL = 'https://note-server.hunger-valley.com'  //设置URL前半部分
axios.defaults.withCredentials = true  //允许跨域请求

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }
    axios(option).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        console.error(res.data)
        Message.warning(res.data.msg)
        reject(res.data)
      }
    }).catch(err=>{
      console.error({msg:'网络异常：'})
      reject({msg:'网络异常：'})
    })
  })
}



