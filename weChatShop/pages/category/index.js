import { request } from "../../request/index";
Page({

  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },
  // 接口的返回数据
  Cates:[],
  onLoad: function (options) {

    // 1.获取本地存储中的数据
    const Cates=wx.getStorageSync("cates");
    // 2.判断
    if(!Cates){
      this.getCates();
    }else{
      // 有旧的数据 定义过期时间 10s 改成 5分钟
      if(Date.now()-Cates.time>1000*300){
        // 重新发送请求
        this.getCates()
      }else{
        // 可以使用旧的数据
        this.Cates=Cates.data;
        this.dealListCont();
      }
    }

  },
  // 获取分类数据
  getCates(){
    request({
        url:"/categories"
    }).then(res=>{
        this.Cates=res;

        // 把接口的数据存入到本地存储中
        wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});

        this.dealListCont();
    })

  },
  // 初始页面数据分装
  dealListCont(){
    // 构造左侧的大菜单数据
    let leftMenuList=this.Cates.map(v=>v.cat_name)
    // 构造右侧的商品内容
    let rightContent=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 左侧菜单点击事件
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })


  }
})