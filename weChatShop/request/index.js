let ajaxTimes=0;
export const request = (params) => {
    // 判断url中是否带有/my/请求的私有路径 带上header token
    let header={...params.header}
    if(params.url.includes("/my/")){
        header["Authorization"]=wx.getStorageSync("token");
    }


    ajaxTimes++
    // 显示加载中 效果
    wx.showLoading({
        title: '加载中',
        mask: true
    })

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--;
                if(ajaxTimes===0){
                    wx.hideLoading()
                }
            }
        });
    })
}
// export const request2 = (params) => {
//     ajaxTimes++
//     // 显示加载中 效果
//     wx.showLoading({
//         title: '加载中',
//         mask: true
//     })

//     const baseUrl = "http://localhost:3000"
//     return new Promise((resolve, reject) => {
//         wx.request({
//             ...params,
//             url: baseUrl + params.url,
//             success: (result) => {
//                 resolve(result)
//             },
//             fail: (err) => {
//                 reject(err)
//             },
//             complete: () => {
//                 ajaxTimes--;
//                 if(ajaxTimes===0){
//                     wx.hideLoading()
//                 }
//             }
//         });
//     })
// }