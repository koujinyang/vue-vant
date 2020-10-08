import axios from 'axios'
import { Toast } from 'vant';
import router from './router'
let Base64 = require('js-base64').Base64
import qs from 'qs'
var root=process.env.API_ROOT;
axios.defaults.timeout = 30*1000;                        //响应时间
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'

axios.defaults.baseURL = root;   //配置接口地址
axios.defaults.baseURL = 'http://182.92.117.160:8080/';
// if (process.env.NODE_ENV == 'development') {//开发环境
//   axios.defaults.baseURL = 'http://182.92.117.160:8080/';
// } else if (process.env.NODE_ENV == 'production') {//生产环境
//   axios.defaults.baseURL = 'http://oa.zaimingchaiqian.com/';
// }
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
  if (code === 700) {
    Toast("后端出现未知错误")
    return false;
  } else if (code === 701) {
    Toast("验证过期，重新登录");
    router.push({ path:'/login'})
    return false;
  } else if (code === 702) {
    Toast("验证失败，重新登录");
    router.push({ path:'/login'})
    return false;
  } else if (code === 703) {
    Toast("签名验证失败");
    return false;
  } else if (code === 704) {
    Toast("accesskey错误，重新登录");
    router.push({ path:'/login'})
    return false;
  } else if (code === 705) {
    Toast("请求时间超时");
    return false;
  } else if (code === 707) {
    Toast("IP地址不匹配");
    return false;
  } else if (code === 708) {
    Toast("随机数重复");
    return false;
  } else if (code === 709) {
    Toast("权限错误");
    return false;
  } else if (code === 710) {
    Toast("body参数解析失败");
    return false;
  } else if (code === 711) {
    Toast("body参数为空");
    return false;
  } else if (code === 712) {
    Toast("accesskey不能为空");
    return false;
  } else if (code === 713) {
    Toast("timestamp不能为空");
    return false;
  } else if (code === 714) {
    Toast("nonce不能为空");
    return false;
  } else if (code === 715) {
    Toast("sign不能为空");
    return false;
  } else if (code === 716) {
    Toast("解析数据失败");
    return false;
  } else if (code === 717) {
    Toast("客户姓名不能为空");
    return false;
  } else if (code === 718) {
    Toast("客户姓名最大字符长度为200个字符");
    return false;
  } else if (code === 719) {
    Toast("客户联系电话不能为空");
    return false;
  } else if (code === 720) {
    Toast("客户联系电话最大字符长度为20个字符");
    return false;
  } else if (code === 721) {
    Toast("案情描述不能为空");
    return false;
  } else if (code === 722) {
    Toast("案情描述最大字符长度为2000个字符");
    return false;
  } else if (code === 723) {
    Toast("客户联系电话重复");
    return false;
  } else if (code === 724) {
    Toast("用户名和token不匹配");
    return false;
  } else if (code === 725) {
    Toast("登记时间错误");
    return false;
  } else if (code === 726) {
    Toast("信息来源不能为空");
    return false;
  } else if (code === 727) {
    Toast("渠道分类不能为空");
    return false;
  } else if (code === 728) {
    Toast("信息来源匹配错误");
    return false;
  } else if (code === 729) {
    Toast("渠道分类匹配错误");
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
  let accesskey='apiuser';
  let secretkey='bb9e490d4dd335b96aed228dc6e6156fi8l3u';
  // if (process.env.NODE_ENV == 'development') {//开发环境
  //   accesskey = 'apiuser';
  //   secretkey = 'bb9e490d4dd335b96aed228dc6e6156fi8l3u';
  // } else if (process.env.NODE_ENV == 'production') {//生产环境
  //   accesskey = 'apiuser_mobile';
  //   secretkey = '59dbb575a2abc63596cdf820ae9e2e52dwm2p';
  // }
  let stringSignTemp="accesskey="+accesskey+"&nonce="+nonce+"&timestamp="+timestamp+"&secretkey="+secretkey+""
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
    axios.post(url+"?accesskey="+accesskey+"&nonce="+nonce+"&timestamp="+timestamp+"&sign="+sign+""+queryData,params,{
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
  // let dateTime=new Date();
  // let timestamp=dateTime.getTime();
  // let nonce =dateTime.getTime();
  // let stringSignTemp="accesskey=apiuser&nonce="+nonce+"&timestamp="+timestamp+"&secretkey=bb9e490d4dd335b96aed228dc6e6156fi8l3u"
  // let sign=this.$md5(stringSignTemp).toUpperCase();
  // param.accesskey="apiuser";
  // param.timestamp=timestamp;
  // param.nonce=nonce;
  // param.sign=sign;

  let dateTime=new Date();
  let timestamp=dateTime.getTime();
  let nonce =dateTime.getTime();
  let accesskey='apiuser';
  let secretkey='bb9e490d4dd335b96aed228dc6e6156fi8l3u';
  // if (process.env.NODE_ENV == 'development') {//开发环境
  //   accesskey = 'apiuser';
  //   secretkey = 'bb9e490d4dd335b96aed228dc6e6156fi8l3u';
  // } else if (process.env.NODE_ENV == 'production') {//生产环境
  //   accesskey = 'apiuser_mobile';
  //   secretkey = '59dbb575a2abc63596cdf820ae9e2e52dwm2p';
  // }
  let stringSignTemp="accesskey="+accesskey+"&nonce="+nonce+"&timestamp="+timestamp+"&secretkey="+secretkey+""
  let sign=this.$md5(stringSignTemp).toUpperCase();
  param.password=Base64.encode(param.password+nonce);
  param.accesskey=accesskey;
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
