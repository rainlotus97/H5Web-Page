"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "体验问题",
      isActive: true
    }, {
      id: 1,
      value: "商品、商家投诉",
      isActive: false
    }],
    chooseImgs: [],
    textVal: ""
  },
  UploadImgs: [],
  handleTabsItemChange: function handleTabsItemChange(e) {
    var index = e.detail.index;
    var tabs = this.data.tabs;
    tabs.forEach(function (v, i) {
      return i === index ? v.isActive = true : v.isActive = false;
    });
    this.setData({
      tabs: tabs
    });
  },
  handleChooseImg: function handleChooseImg() {
    var _this = this;

    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function success(result) {
        _this.setData({
          chooseImgs: [].concat(_toConsumableArray(_this.data.chooseImgs), _toConsumableArray(result.tempFilePaths))
        });
      }
    });
  },
  handleRemoveImg: function handleRemoveImg(e) {
    var index = e.currentTarget.dataset.index;
    var chooseImgs = this.data.chooseImgs;
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs: chooseImgs
    });
  },
  handleTextInput: function handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    });
  },
  handleFormSubmit: function handleFormSubmit(e) {
    var _this2 = this;

    var _this$data = this.data,
        textVal = _this$data.textVal,
        chooseImgs = _this$data.chooseImgs;

    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return;
    }

    wx.showLoading({
      title: "正在上传中",
      mask: true
    });

    if (chooseImgs.length != 0) {
      chooseImgs.forEach(function (v, i) {
        wx.uploadFile({
          url: 'https://media.mogu.com/image/scale?appKey=15m&w=500&h=500&quality=100',
          filePath: v,
          name: "image",
          formData: {},
          success: function success(result) {
            var url = JSON.parse(result.data).result.url;

            _this2.UploadImgs.push(url);

            if (i === chooseImgs.length - 1) {
              wx.hideLoading();
              console.log("把文本的内容和外网的图片数组 提交到后台中");

              _this2.setData({
                textVal: "",
                chooseImgs: []
              });

              wx.showToast({
                title: '全部上传成功',
                icon: 'none',
                duration: 1500,
                mask: true
              });
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      });
    } else {
      wx.hideLoading();
      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });
    }
  }
});