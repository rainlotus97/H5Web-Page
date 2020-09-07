import {request} from "../../request/index"
Page({
  data: {
    goods:[],
    isFocus:false,
    inpValue:""
  },
  TimeId:-1,
  handleInput(e){
    const {value}=e.detail
    if(!value.trim()){
      clearTimeout(this.TimeId)
      this.TimeId=setTimeout(()=>{
        this.setData({
          goods:[],
          isFocus:false
        })
      },1000)
      
      return
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value)
    },1000)
  },
  qsearch(query){
    request({url:"/goods/qsearch",data:{query}}).then(res=>{
      this.setData({
        goods:res
      })
    })
  },
  handleCancel(){
    this.setData({
      inpValue:"",
      goods:[]
    })
  }
})