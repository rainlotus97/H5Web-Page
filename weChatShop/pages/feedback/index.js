Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgs:[],
    textVal:""
  },
  UploadImgs:[],
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  handleChooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      }
    });
  },
  handleRemoveImg(e){
    const {index}=e.currentTarget.dataset
    let {chooseImgs}=this.data
    chooseImgs.splice(index,1)
    this.setData({
      chooseImgs
    })
  },
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  handleFormSubmit(e){
    const {textVal,chooseImgs}=this.data
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      });
      return
    }
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });
    if(chooseImgs.length!=0){
      chooseImgs.forEach((v,i)=>{
        wx.uploadFile({
          url: 'https://media.mogu.com/image/scale?appKey=15m&w=500&h=500&quality=100',
          filePath: v,
          name: "image",
          formData: {},
          success: (result)=>{
            let url=JSON.parse(result.data).result.url
            this.UploadImgs.push(url)
            if(i===chooseImgs.length-1){
              wx.hideLoading();
              console.log("把文本的内容和外网的图片数组 提交到后台中");
              this.setData({
                textVal:"",
                chooseImgs:[]
              })
              wx.showToast({
                title: '全部上传成功',
                icon: 'none',
                duration: 1500,
                mask: true,
              });
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      })
    }else{
      wx.hideLoading();
      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });
    }
    
    
  }
})