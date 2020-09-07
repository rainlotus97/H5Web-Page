"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("../../request/index"),
    request = _require.request;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: [{
      id: 0,
      value: "全部",
      isActive: true
    }, {
      id: 1,
      value: "待付款",
      isActive: false
    }, {
      id: 2,
      value: "待收货",
      isActive: false
    }, {
      id: 3,
      value: "退款/退货",
      isActive: false
    }]
  },
  onShow: function onShow(options) {
    var token = wx.getStorageSync("token");

    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }

    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    var type = currentPage.options.type;
    this.changeTitleByIndex(type - 1);
    this.getOrders(type);
  },
  // 获取列表的方法
  getOrders: function getOrders(type) {
    var _this = this;

    request({
      url: "/my/orders/all",
      data: {
        type: type
      }
    }).then(function (res) {
      _this.setData({
        orders: res.orders.map(function (v) {
          return _objectSpread({}, v, {
            create_time_cn: new Date(v.create_time * 1000).toLocaleString()
          });
        })
      });
    });
  },
  // 根据标题索引来激活选中 标题数组
  changeTitleByIndex: function changeTitleByIndex(index) {
    var tabs = this.data.tabs;
    tabs.forEach(function (v, i) {
      return i === index ? v.isActive = true : v.isActive = false;
    });
    this.setData({
      tabs: tabs
    });
  },
  handleTabsItemChange: function handleTabsItemChange(e) {
    var index = e.detail.index;
    this.changeTitleByIndex(index);
    this.getOrders(index + 1);
  }
});