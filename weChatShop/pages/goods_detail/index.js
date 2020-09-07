import { request } from "../../request/index";

Page({

  data: {
    goodsObj:{},
    isCollect:false
  },
  GoodsInfo:{},

  onShow: function () {
    let pages= getCurrentPages();
    let currentPage=pages[pages.length-1]
    let options=currentPage.options
    const {goods_id}=options;
    this.getGoodsDetail(goods_id)


  },

  getGoodsDetail(goods_id){
    request({url:'/goods/detail',data:{goods_id}})
    .then(res=>{
     let goodsObj=res;
     this.GoodsInfo=res;
     // 获取缓存中商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)
      this.setData({
        goodsObj:{
          goods_name:goodsObj.goods_name,
          goods_price:goodsObj.goods_price,
          goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:goodsObj.pics
        },
        isCollect
      })
    })
  },
  // 预览轮播图的图片
  handlePreviewImage(e){
    // 先构造要预览的图片数组
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current=e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    });
  },
  handleCartAdd(){
    // 先获取缓存中的购物车 数组
    let cart=wx.getStorageSync("cart")||[];
    // 判断 商品对象是否存在于购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index===-1){
      this.GoodsInfo.num=1
      this.GoodsInfo.checked=true
      cart.push(this.GoodsInfo)
    }else{
      cart[index].num++
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500,
      mask: true
    });

  },
  // 点击收藏商品
  handleCollect(){
    let isCollect=false;
    let collect=wx.getStorageSync("collect")||[];
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index!=-1){
      collect.splice(index,1)
      isCollect=false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        image: '',
        duration: 1500,
        mask: true
      });
    }else{
      collect.push(this.GoodsInfo)
      isCollect=true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        image: '',
        duration: 1500,
        mask: true
      });
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    })
  }
})