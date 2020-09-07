import { request } from "../../request/index";
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx";
Page({

  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked)

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },

  onLoad: function (options) {

  },
  handleOderPay() {
    try {
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return
      }
      // const header = { Authorization: token };
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = []
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = { order_price, consignee_addr, goods }
      request({ url: "/my/orders/create", method: "POST", data: orderParams})
        .then(res => {
          const order_number = res.order_number
          request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } })
            .then(res => {
              showToast({ title: "支付成功！" }).then(res => {
                console.log({ errMsg: "requestPayment:ok" });
              })
              // 支付流程
              // const pay={...res.pay}
              // requestPayment(pay).then(res=>{
              //   console.log(res);
              // })
              let newCart=wx.getStorageSync("cart");
              newCart=newCart.filter(v=>!v.checked)
              wx.setStorageSync("cart", newCart);
              wx.redirectTo({
                url: '/pages/order/index',

              });
            })
        })
    } catch (error) {
      showToast({ title: "支付失败" }).then(res => {
        console.log({ errMsg: "requestPayment:cancel" });
      })
    }

  }


})