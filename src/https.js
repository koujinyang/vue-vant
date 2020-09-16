import axios from 'axios'
import qs from 'qs'
var root=process.env.API_ROOT;
axios.defaults.timeout = 5000;                        //响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'

axios.defaults.baseURL = root;   //配置接口地址
if (process.env.NODE_ENV == 'development') {//开发环境
  axios.defaults.baseURL = 'http://182.92.117.160:8080/';
} else if (process.env.NODE_ENV == 'production') {//生产环境
  axios.defaults.baseURL = 'http://182.92.117.160:8080/';
}
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if(config.method  === 'post'){
    // config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  console.log('错误的传参')
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  const code = res.data.code;
  if (code === 401) {
    // 判断res.data.res_code 是否是401 如果是则跳转到登录，如果不是则正常返回
    // ElementUI.Message({
    //   message: '请登录',
    //   type: 'warning'
    // });
    // router.push('/login')
    // // 删除token以及user
    // localStorage.removeItem('user')
    // localStorage.removeItem('token')
    return false;
  } else if (code === -104) {
    // ElementUI.Message({
    //   message: '系统异常',
    //   type: 'warning'
    // });
    return false;
  }
  return res;
  // return Promise.resolve(res.data);
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params,parmas1) {
  let dateTime=new Date();
  let timestamp=dateTime.getTime();
  let nonce =dateTime.getTime();
  let stringSignTemp="accesskey=apiuser&nonce="+nonce+"&timestamp="+timestamp+"&secretkey=bb9e490d4dd335b96aed228dc6e6156fi8l3u"
  let sign=this.$md5(stringSignTemp).toUpperCase();
  // params.accesskey="apiuser";
  // params.timestamp=timestamp;
  // params.nonce=nonce;
  // params.sign=sign;
  var Authorization="Bearer "+localStorage.getItem("access_token");
  // var Authorization="Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMiIsImV4cCI6MTYwMDMxMTYxNywiaWF0IjoxNjAwMjI1MjE3fQ.3-Q9Kh3t5O9iBDfpZeHd0pk3rPJXPPxDWCbcQ68DzhpBctkuPYKkCE0rYMc-LTiDIURLodhoH5fOoXm3EyztWQ";
  console.log(Authorization);
  let queryData=""
  if(parmas1 && parmas1.limit){
    queryData+="&limit="+parmas1.limit
  }
  if(parmas1 && parmas1.page){
    queryData+="&page="+parmas1.page
  }
  if(parmas1 && parmas1.querytype){
    queryData+="&querytype="+parmas1.querytype
  }
  console.log(params);
  return new Promise((resolve, reject) => {
    // axios({
    //   method:"post",
    //   url:url+"?accesskey=apiuser&nonce="+nonce+"&timestamp="+timestamp+"&sign="+sign+""+queryData,
    //   headers:{
    //     Authorization:Authorization
    //   },
    //   data:params
    // }).then(response => {
    //   resolve(response);
    // }, err => {
    //   reject(err);
    // }).catch((error) => {
    //     reject(error)
    //   })
    axios.post(url+"?accesskey=apiuser&nonce="+nonce+"&timestamp="+timestamp+"&sign="+sign+""+queryData,params,{
      headers:{
        Authorization:Authorization
      }
    }).then(response => {
      resolve(response);
    }, err => {
      reject(err);
    }).catch((error) => {
      reject(error)
    })


  })
}

////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  let dateTime=new Date();
  let timestamp=dateTime.getTime();
  let nonce =dateTime.getTime();
  let stringSignTemp="accesskey=apiuser&nonce="+nonce+"&timestamp="+timestamp+"&secretkey=bb9e490d4dd335b96aed228dc6e6156fi8l3u"
  let sign=this.$md5(stringSignTemp).toUpperCase();
  param.accesskey="apiuser";
  param.timestamp=timestamp;
  param.nonce=nonce;
  param.sign=sign;

  return new Promise((resolve, reject) => {
    axios.get(url, {params: param})
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  fetchPost,
  fetchGet,
}
