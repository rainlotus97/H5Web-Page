"use strict";

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {},
  handleGetUserInfo: function handleGetUserInfo(e) {
    // console.log(e);
    var userInfo = e.detail.userInfo;
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
});