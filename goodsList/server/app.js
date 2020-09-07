var express = require('express')
var path = require("path");
var app = express()

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//允许跨域访问

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Credentials", "true");  
    res.header("Access-Control-Allow-Methods", "*");  
    res.header("Access-Control-Allow-Headers", "x-requested-with,Cache-Control,Pragma,Content-Type,Token, Content-Type");//这里“Access-Token”是我要传到后台的内容key  
    res.header("Access-Control-Expose-Headers", "*");  
    next();
});

//数据源
var goods = [
  { id: 1, name: '奔驰', price:'12'},
  { id: 2, name: '宝马', price:'32'},
  { id: 3, name: '德玛', price:'42'}
]

//获取商品列表
app.get("/api/getgoodslist",function(req,res){
   	return res.status(200).json({
	   status: 0,
	   message: goods
	})
})

//添加一个商品
app.post("/api/goods/new",function(req,res){
	var name = req.body.name;
	var price = req.body.price;
	var id = goods[goods.length-1].id + 1;
	var obj = {
		id,
		name,
		price
	}
	goods.push(obj);
	return res.status(200).json({
	   status: 0,
	   message: "添加成功"
	})
})

//删除商品
app.get("/api/goods/del/:id",function(req,res){
	var id = req.params["id"];
	
	var index = goods.findIndex(item => {
        if (item.id == id) {
          return true;
        }
    })
	goods.splice(index, 1)
	
	return res.status(200).json({
	   status: 0,
	   message: "删除成功"
	})
})


app.listen(3000,function(){
    console.log("服务器启动了")
})
