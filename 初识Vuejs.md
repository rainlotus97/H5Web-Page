# 一、Vuejs概念

1.Vue是一个渐进式的框架。

渐进式：意味着你可以把Vue作为你应用的一部分嵌入其中，带来更丰富的交互体验。

2.Vue的高级功能：

1. 解耦视图和数据
2. 可复用的组件
3. 前端路由技术
4. 状态管理
5. 虚拟DOM

# 二、Vue.js安装

方式一：直接CDN引入

```html
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
```

方式二：下载和引入

```
开发版本：https://cn.vuejs.org/js/vue.js
生产版本：https://cn.vuejs.org/js/vue.min.js
```

方式三：NPM安装

```bash
npm install vue
```

# 三、Vue初体验

### 1.Vue的初使用

第一个Vue小程序，体验一下Vue的响应式。

```html
<--引入Vue-->
<head>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>

<body>
    <div id="app">
        <h2>{{message}}</h2>
        <h1>{{name}}</h1>
    </div>

    <script>
        // 编程范式：声明式编程
        const app = new Vue({
            el: "#app",  //用于挂载要管理的元素
            data: {      //定义数据
                message: '你好啊，李银河！',
                name: 'rainlotus'
            }
        })
    </script>
</body>
```

页面显示截图:

![](https://i.loli.net/2020/08/28/KYk4hgXZ5DT3ucf.jpg)

### 2.Vue列表展示

```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <ul>
            <li v-for="item in movies">{{item}}</li>
        </ul>
    </div>
    <script>
        const app=new Vue({
            el:'#app',
            data:{
                message:'你好啊',
                movies:['星期穿越','大话西游','盗梦空间','海王']
            }
        })
    </script>

</body>
```

![](https://i.loli.net/2020/08/28/qBDJlZvcLOdkCTG.jpg)

### 3.案例:计数器

```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <h2>当前计数:{{counter}}</h2>
        <button @click='increament'>+</button>
        <button @click='subtraction'>-</button>
    </div>

    <script>
        const app=new Vue({
            el:'#app',
            data:{
                counter:0
            },
            methods:{   //方法
                increament(){
                    this.counter++
                },
                subtraction(){
                    this.counter--
                }
            }
        })

    </script>

</body>
```

![](https://i.loli.net/2020/08/28/YglCcOAqxmPjd4b.jpg)

新增属性:methods(方法)，以及v-on和其语法糖@等知识点

### 4.MVVM

M-model：数据层，数据一般是我们从服务器或者网络上请求下来的固定数据。

V-view：视图层，在前端开发中，通常就是DOM层，主要作用是给用户展示各种信息。

VM-view model:视图模型层，是view和model沟通的桥梁，一方面它实现了数据绑定，将Model的改变反映到view中；另一方面它实现了DOM监听，当DOM发生一些事件(点击、滚动、touch等)时，可以监听到，并在需要的情况下改变对应的data。

# 四、Vue的生命周期

生命周期图：

![](https://images2015.cnblogs.com/blog/812815/201609/812815-20160901184143824-1244680096.png)

# 五、定义vue模板

### 1.vscode的html模板

![](https://i.loli.net/2020/08/28/Iu4ErXzpC1ZPRH9.jpg)

然后配置以下代码即可:

```json
"vue-template": {
			"prefix": "vu",
			"body": [
				"<div id=\"app\">",
				"    <h2>{{message}}</h2>",
    			"</div>",
    			"<script src=\"https://cdn.jsdelivr.net/npm/vue/dist/vue.js\"></script>",
				"<script>",
				"    const app = new Vue({",
				"        el: '#app',",
				"        data: {",
                "            message: 'Hello World'",
				"        },", 
            	"    })",
   				"</script>"
			],
			"description": "vue模板"
		}
```

### 2.vscode的vue模板

在首选项-用户片段-vue.json.code-snippets(前提是安装过Vetur插件,装好vue使用)中输入以下代码即可：

```json
"Print to console": {
			"prefix": "vue",
			"body": [
				"<template>",
				"  <div id=\"app\"></div>",
				"</template>",
				"",
				"<script>",
				"export default {",
				"  name: 'App',",
				"  data () {",
				"    return {",
				"      ",
				"    };",
				"  },",
				"  components: {},","  mounted () {},",
				"  methods: {}",
				"}",
				"</script>",
				"",
				"<style>",
				"",
				"</style>"
		],
			"description": "Log output to console"
		}
```

# 六、v-指令的使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        [v-cloak] {
  			display: none;
		}
    </style>
</head>
<body>
    <div id="app" v-cloak>  //v-cloak:这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。
        <h2>{{message}}</h2>
        <h2 v-once>{{message}}</h2> //只渲染元素和组件一次
        <h2 v-html="url"></h2>      //可以解析html标签
        <h2 v-text='message'>你好啊</h2>    //不建议使用，没有mustache语法好用
        <h2 v-pre>{{message}}</h2>      //原封不动显示，不解析
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello World',
                url:'<a href="https://www.baidu.com">百度一下</a>'
            },
        })
    </script>
</body>
</html>
```

# 七、v-bind动态绑定

### 1.动态绑定class

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active {
            color: red;
        }

        .line {
            color: rgb(0, 217, 255);
        }

        [v-cloak] {
            display: none;
        }
    </style>
</head>

<body>
    <div id="app" v-cloak>
        <!-- <h2>{{message}}</h2>
        <img :src="imgUrl" alt="" style="width: 500px;height: 350px;">
        <a :href="aHref">百度一下</a> -->
        
        <!-- 点击切换变色 -->
        <!-- <h2 :class="{active:isActive,line:isLine}">{{message}}</h2>
        <button @click="btnClick">变色</button> -->
        <!-- 点击高亮 -->
        <ul>
            <li v-for="(item,index) in movies" 
            :class="{active:currentIndex===index}"
            @click="handleClick(index)">{{item}}</li>
        </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello World',
                imgUrl: 'https://i.loli.net/2020/08/28/Iu4ErXzpC1ZPRH9.jpg',
                aHref: 'https://www.baidu.com',
                isActive: true,
                isLine: false,
                movies:['海王','海贼王','洛神赋','火箭鸟'],
                currentIndex:-1
            },
            methods: {
                btnClick() {
                    this.isActive = !this.isActive
                    this.isLine = !this.isLine
                },
                handleClick(index){
                   this.currentIndex=index
                }
            }
        })
    </script>
</body>

</html>
```

![](https://i.loli.net/2020/08/28/qYI8lNxnWtBpahH.gif)

### 2.动态绑定style

```
 <div id="app" v-cloak>
        <h2 :style="{fontSize: '30px'}">{{message}}</h2>
        <h2 :style="getStyles()">{{message}}</h2>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello World',
                finalSize:100,
                finalColor:'red'
            },
            methods:{
                 getStyles(){
                    return {fontSize: this.finalSize+'px',backgroundColor:this.finalColor}
                }
            }
              
        })
    </script>
```

# 八、计算属性

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <h2>{{fullName}}</h2>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                firstName:'Lebron',
                lastName:'James'
            },
            computed:{
                fullName(){
                    return this.firstName+' '+this.lastName
                }
            }
        })
    </script>
</body>
</html>
```

计算属性和methods的区别：

在多次调用时，methods会调用多次，而computed因为会进行缓存只会调用一次，性能更高。

# 九、v-on修饰符

v-on的语法糖是@，

修饰符：

- .stop-调用event.stopPropagation()

- .prevent-调用event.preventDefault()

-  .{keyCode|keyAlias}-只当事件是从特定键触发时才触发回调

  ```html
  <button @keyup.enter='onEnter'></button>
  <button @keyup.13='onEnter'></button>
  ```

- .native-监听组件根元素的原生事件

- .once-只触发一次回调

- .capture-事件捕获阶段，与冒泡触发相反

- .self-只有发生在自己身上的事件才会执行，子元素冒泡到当前元素的事件不执行

  self和stop的区别：self是只有触发在自己身上的事件才会执行，但是该事件仍然会有事件冒泡

  ​				 stop是阻止事件冒泡，它自身以及所有父元素都不会触发事件冒泡(ps.父元素仍有冒泡行	为)

- .passive-提前告诉浏览器你不想阻止事件的默认行为，主用于提高移动端性能。

  意义：**浏览器无法预先知道一个监听器会不会调用 preventDefault()**，它能做的只有等监听器执行完后再去执行默认行为，而监听器执行是要耗时的，有些甚至耗时很明显，这样就会导致页面卡顿。 

# 十、登录切换input框复用问题

```html
 <span v-if="isUser">
      <label for="username">用户账号：</label>
      <input type="text" placeholder="用户账号" id="username" key="username">     
</span>
<span v-else>
     <label for="email">用户邮箱：</label>
     <input type="text" placeholder="用户邮箱" id="email" key="email">
</span>
```

添加key可以解决此问题。

问题产生原因：

vue在进行DOM渲染时，出于性能考虑，会尽可能的复用已存在的元素，而不是创建新的元素。

在上面案例中，vue内部会发现原来的input元素不再使用，直接作为else中的input来使用了

# 十一、v-if与v-show的区别

```html
<div id="app">
        <!-- 
       v-if:当条件为false时，包含v-if指令的元素，根本不会存在dom中
	   v-if:有更高的初始渲染消耗,当不需要频繁的切换隐藏和显示的时候使用v-if
    -->
        <h2 v-if="isShow" id="aaa">{{message}}</h2>
        <!-- 
        v-show:当条件为false时，v-show只是给元素添加一个行内元素：display:none
	    v-show：有更高的切换渲染消耗，当需要频繁的切换隐藏和显示的时候使用v-show
     -->
        <h2 v-show="isShow" id="bbb">{{message}}</h2>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello World',
                isShow: false
            },
        })
    </script>
```

# 十二、v-for

```html
 <div id="app">
        <!-- 1.在遍历对象的过程中，如果只是获取一个值，那么获取的是value -->
        <ul>
            <li v-for="item in info">{{item}}</li>
        </ul>
        <!-- 2.获取key和value 格式：(value,key) -->
        <ul>
            <li v-for="(value,key) in info">{{value}}-{{key}}</li>
        </ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                info:{
                    name:"zhangsan",
                    age:19,
                    sex:"male"
                }
            },
        })
</script>
```

# 拓展1：数组中哪些方法是响应式的

- push-在数组后面添加元素
- pop-删除数组中最后一个元素
- shift-删除数组中第一个元素
- unshift-在数组前面添加元素
- splice-删除元素/插入元素/替换元素
- sort-数组排序
- reverse-数组翻转
- Vue.set(要修改的对象,索引值,修改后的值)

# 十三、v-model

### 1.v-model的实现原理

![](https://i.loli.net/2020/08/29/ZxFw8so63YXD1R2.jpg)

### 2.v-model结合radio类型

```html
<div id="app" v-cloak>
       <label for="male">
           <input type="radio" id="male" value="男" v-model="sex">男
       </label>
       <label for="female">
        <input type="radio" id="female" value="女" v-model="sex">女
       </label>
       <h2>您选择的性别是：{{sex}}</h2>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello World',
                sex:'男'
            },
        })
    </script>
    <style>
        [v-cloak]{
            display: none;
        }
    </style>
```

3.v-model结合checkbox类型

```html
<div id="app">
     <!-- checkbox单选框 -->
     <!-- <label for="license">
         <input type="checkbox" id="license" v-model="isAgree">同意协议
     </label>
     <h2>您选择的是:{{isAgree}}</h2>
     <button :disabled="!isAgree">下一步</button> -->

     <!-- checkbox多选框 -->
     <input type="checkbox" name="" id="" v-model="hobbies" value="篮球">篮球
     <input type="checkbox" name="" id="" v-model="hobbies" value="足球">足球
     <input type="checkbox" name="" id="" v-model="hobbies" value="乒乓球">乒乓球
     <input type="checkbox" name="" id="" v-model="hobbies" value="羽毛球">羽毛球
     <input type="checkbox" name="" id="" v-model="hobbies" value="排球">排球
     <h2>您的爱好是:{{hobbies}}</h2>
</div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello World',
                isAgree: false, //单选框
                hobbies: []    //多选框
            },
        })
    </script>
```

### 3.v-model结合select类型

```html
<div id="app">
         <!-- 选择一个 -->
        <select name="abc" id="" v-model="fruit">
            <option value="苹果">苹果</option>
            <option value="香蕉">香蕉</option>
            <option value="榴莲">榴莲</option>
            <option value="葡萄">葡萄</option>
        </select>
        <h2>您选择的水果是:{{fruit}}</h2>
        <!-- 选择多个 -->
        <select name="abc" id="" v-model="fruits" multiple>
            <option value="苹果">苹果</option>
            <option value="香蕉">香蕉</option>
            <option value="榴莲">榴莲</option>
            <option value="葡萄">葡萄</option>
        </select>
        <h2>您选择的水果是:{{fruits}}</h2>
</div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello World',
                fruit:'香蕉',
                fruits:[]
            },
        })
    </script>
```

### 4.v-model修饰符

##### 1.lazy修饰符

​	默认情况下，v-model是在input事件中同步输入框的数据的。

​	lazy修饰符可以让数据失去焦点或者回车时才会更新。

##### 2.number修饰符

​	默认情况下，在输入框中我们输入的是字母还是数字，都会被当做字符串类型进行处理

​	number修饰符可以让在输入框中输入的内容自动转换成数字类型

##### 3.trim修饰符

​	如果输入的内容首尾有很多空格，通常我们希望将其去除

​	trim修饰符可以过滤内容左右两边的空格

##### 代码

```html
<div id="app">
        <!-- 修饰符：lazy -->
        <input type="text" name="" id="" v-model.lazy="message">
        <h2>{{message}}</h2>
        <!-- 修饰符:number -->
        <input type="bumber" name="" id="" v-model.number="age">
        <h2>{{age}}-{{typeof age}}</h2>
        <!-- 修饰符:trim -->
        <input type="text" name="" id="" v-model.trim="name">
        <h2>您输入的名字：{{name}}</h2>
</div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello World',
                age:'',
                name:''
            },
        })
    </script>
```

##### 效果图

<img src="https://i.loli.net/2020/08/29/yT78s3oMLGtnbdR.gif" width="372px" height="615px"></img>

# 十四、组件化

### 1.组件化思想

- 它提供了一种抽象，让我们可以开发出一个个独立可复用的小组件来构造我们的应用
- 任何的应用都会被抽离成一棵组件树

### 2.组件化的基本使用

```html
 	<div id="app">
        <h2>{{message}}</h2>
        <my-cpn></my-cpn>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 创建组件构造器对象
        const cpn=Vue.extend({
            template:`
            <div>
            <h2>我是标题</h2>
            <h4>我是内容</h4>
            <h5>我是页脚，哈哈哈</h5>
            </div>
            `
        })

        // 注册组件
        Vue.component('my-cpn',cpn)
        
        // 使用组件
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello World'
            },
        })
    </script>
```

### 3.父组件和子组件



