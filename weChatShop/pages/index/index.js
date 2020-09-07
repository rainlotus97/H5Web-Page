
import { request } from "../../request/index";

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    CateList:[],
    // 楼层数组
    floorList:[]
  },
  // 页面开始加载 就会触发
  onLoad: function () {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  getSwiperList() {
    // 发送异步请求获取轮播图数据
    request({ url: '/home/swiperdata'})
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  getCateList() {
    // 发送异步请求获取导航数据
    request({ url: '/home/catitems'})
      .then(result => {
        this.setData({
          CateList: result
        })
      })
  },
  getFloorList() {
    // 发送异步请求获取楼层数据
    request({ url: '/home/floordata'})
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  }
})
