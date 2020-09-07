"use strict";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    tabs: [{
      id: 0,
      value: "商品收藏",
      isActive: true
    }, {
      id: 1,
      value: "品牌收藏",
      isActive: false
    }, {
      id: 2,
      value: "店铺收藏",
      isActive: false
    }, {
      id: 3,
      value: "浏览足迹",
      isActive: false
    }]
  },
  onShow: function onShow() {
    var collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect: collect
    });
  },
  handleTabsItemChange: function handleTabsItemChange(e) {
    var index = e.detail.index;
    var tabs = this.data.tabs;
    tabs.forEach(function (v, i) {
      return i === index ? v.isActive = true : v.isActive = false;
    });
    this.setData({
      tabs: tabs
    });
  }
});