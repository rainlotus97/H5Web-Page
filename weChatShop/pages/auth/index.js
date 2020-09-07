import { request,request2 } from "../../request/index";
import { login } from "../../utils/asyncWx";
Page({

  data: {

  },

  onLoad: function (options) {

  },
  handleGetUserInfo(e) {
   try {
    const { encryptedData, rawData, iv, signature } = e.detail
  //   request2({url:"/api/login",data:{
  //     "username":"root",
  //     "password":"123456"
  // },method:"post"}).then(res=>{
  //   wx.setStorageSync("token", res.data.token);
  //   request2({url:'/api/profile',header:{'Authorization':res.data.token}})
  //     .then(res=>{
  //       wx.navigateBack({
  //         delta: 1
  //       });
  //     })
  // })
    // login().then(res=>{
    //   const {code}=res;
    //   console.log(code);
    //   wx.request({
    //     url: 'https://api.it120.cc/dhqm/user/wxapp/login',
    //     data: {code},
    //     header: {'content-type':'application/x-www-form-urlencoded'},
    //     method: 'POST',
    //     dataType: 'json',
    //     responseType: 'text',
    //     success: (result)=>{
    //       console.log("登陆成功",result);
    //     }
    //   });
    login().then(res=>{
      const {code}=res;
      const loginParams={ encryptedData, rawData, iv, signature ,code}
      request({url:'/users/wxlogin',data:loginParams,method:"POST"})
      .then(res=>{
        // 伪装token
        wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo");
        wx.navigateBack({
          delta: 1
        });
      })
    })
    
    // })
   } catch (error) {
     console.log(error);
   }
  }

})