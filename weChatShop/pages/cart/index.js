import { request } from "../../request/index";
import { getSetting, chooseAddress, openSetting,showModal,showToast } from "../../utils/asyncWx";
Page({

  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const address=wx.getStorageSync("address");
    const cart=wx.getStorageSync("cart")||[];
    // const allChecked=cart.length?cart.every(v=>v.checked):false
    this.setData({address})
    this.setCart(cart)
  },

  onLoad: function (options) {

  },
  // 点击 收货地址
  handleChooseAddress() {
    try {
      getSetting().then(res => {
        const scopAddress = res.authSetting["scope.address"]
        if (scopAddress === false) {
          openSetting()
        }else{
          chooseAddress().then(res=>{
            res.all=res.provinceName+res.cityName+res.countyName+res.detailInfo
           wx.setStorageSync("address", res);
          })
        }

      })
    } catch (error) {
      console.log(error);
    }
  },

  //商品的选中
  handleItemChange(e){
    const goods_id=e.currentTarget.dataset.id
    // console.log(goods_id);
    let {cart}=this.data;
    let index=cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].checked=!cart[index].checked
    this.setCart(cart)

  },

  setCart(cart){
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price
        totalNum+=v.num;
      }else{
        allChecked=false
      }
    })
    allChecked=cart.length!=0?allChecked:false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },
  // 商品全选功能
  handleItemAllCheck(){
    let {cart,allChecked}=this.data
    allChecked=!allChecked
    cart.forEach(v=>v.checked=allChecked)
    this.setCart(cart)
  },
  // 商品数量的编辑功能
  handleItemNumEdit(e){
    let {operation,id}=e.currentTarget.dataset
    let {cart} = this.data
    const index=cart.findIndex(v=>v.goods_id===id)
    if(cart[index].num===1&&operation===-1){
      showModal({content:"您是否要删除？"}).then(res=>{
        if(res.confirm){
          cart.splice(index,1)
          this.setCart(cart)
        }
      })
    }else{
      cart[index].num+=operation
      this.setCart(cart)
    }
   
  },
  // 商品结算
  handlePay(){
    const {address,totalNum}=this.data;
    if(!address.userName){
      showToast({title:"您还没有选择收货地址"})
      return
    }
    if(totalNum===0){
      showToast({title:"您还没有选购商品"})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }

})