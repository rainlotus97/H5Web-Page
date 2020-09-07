# HTML内容

## 1.元素

##### 元素就是标签

1.行内元素（行级元素）：在每一行的最后不会自动换行，后面内容会追加。

2.块级元素：每一个标签的最后都会自动换行，如果追加就会换行，以独立的结构支撑页面模块。

3.行内块级元素：一般都是将行级元素转换成行内块级元素的方式构成，代码如下：

```css
display:inline-block
```

## 2.文本标签

#### 1.格式化标签

一般用于文本中控制格式，以及字体的样式等等作用。

**格式化标签基本上都是行内元素**

举例：

1. 加粗标签：<b>、<strong>
2. 字体倾斜：<i>、<em>
3. 添加删除线：<s>、<del>
4. 添加下划线：<u>、<ins>

#### 2.base标签是一个单标签

作用之一：可以一次性将所有的属性都默认的添加，比如：

```html
target="_blannk"
```

意义：如果需要操作网页中的同样属性，可以使用base标签统一处理。

```html
<base target="_blank" />
```

## 3.列表表格表单文本域

#### 列表

1. 有序列表：ol标签
2. 无序列表：ul标签，dl标签

#### 表格

table,一个块级元素

属性：border、cellspacing、cellpadding和align:"center"

colspan：和并列

rowspan：合并行

#### label

label元素不会向用户呈现任何特殊效果，不过它会为鼠标用户改进了可用性。

当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。

**<label>标签的for属性应当与相关元素的id属性相同**

**for属性设置一个绑定值，与其他元素绑定，需要被绑定的元素可以使用id调用**

```html
<label for="text">用户：<input type="text" id="text"></label>
```

![](https://i.loli.net/2020/07/30/2PG4icIXNaxwCfL.png)

#### placeholder

文本框中placeholder属性可以自动替换原来的值，用户体验很好。

```html
<input placeholder="请输入信息" type="text" id="username" />
```

#### 单(复)选框/按钮框

单选框：radio 互斥性 (name设置相同)

复选框： checkbox

按钮框：button、submit、reset、image

#### 下拉框

```html
 <select name="" id="">
        <option value="">选择年份</option>
        <option value="">1990</option>
        <option value="">1991</option>
        <option value="">1992</option>
        <option value="">1993</option>
        <option value="">1994</option>
    </select>
```

![](https://i.loli.net/2020/07/30/mR3a5EFoWDj76yM.png)

#### 表单域

form表单是html中用于提交给后端的一个表单域，是一个双标签

```html
 <form action="" method="GET"></form>
 <form action="" method="POST"></form>
```

#### 文本域

在这个文本域中可以写很多的文本，相当于是一个区域，可以设置行和列

textarea标签：文本域从开始标签往后就开始计算字符，如果有空格也算是一个字符。

属性：cols表示最大列数，rows表示最大行数，超出部分自动转换为拉条。

以下分别为代码以及，网页显示图：

```html
    <textarea name="" id="" cols="30" rows="10">Hello World</textarea>
```

![文本域](https://i.loli.net/2020/07/30/hydO2RSENZLiozC.png)

# CSS内容

## 1.css样式

#### css书写格式

1. 内嵌式
2. css写在style标签中，整体嵌套在head标签中
3. 外部引入<link href="xxxx" />

#### css选择器

1. 元素选择器
2. id选择器
3. 类选择器

#### 设置组合边距

```css
<style>
        table{
            border-collapse: collapse;
            border: 1px solid black;
        }
        table tr td{
            width: 40px;
            height: 20px;
            border: 1px solid red;
        }
    </style>
```

![组合边距](https://i.loli.net/2020/07/30/s7ZiUCfxtpEKmDB.png)

在表格中，使用此方法，会合并表格外边框和td边框。

## 2.浮动

#### 父盒子

子级div在进行浮动时，依赖于父级div的大小，与padding无关

#### 对齐

将多个div同时进行浮动时，会默认对齐

#### 隐式转换

可以让元素默认转换成行内块级元素，div(块级元素)=>行内块级元素

#### 清除浮动

1. clear:both

2. overflow:hidden (定位到需要清除浮动的父元素)

3. after伪元素

   以下为部分代码

   ```css
    .dv::after{
               content: "";
               display: table;
               clear: both;
           }
   ```

   ```html
    <div class="dv">
           <ul class="ul">
               <li>高考加油</li>
               <li class="li2">设置
                   <ul id="hiddenBox">
                       <li>1</li>
                       <li>2</li>
                       <li>3</li>
                       <li>4</li>
                   </ul>
               </li>
               <li>登录</li>
           </ul>
       </div>
   ```

   ![下拉框](https://i.loli.net/2020/07/30/mR3a5EFoWDj76yM.png )

## 3.定位

#### 相对定位

```css
position:realitive;  //相对与原文档流的位置进行定位
```

#### 绝对定位

```css
position:absolute; //相对于与其上一个已经定位好的父亲元素定位，往往和相对定位出现
```

**块级元素垂直居中的三个方法**

1. ```css
   position:absolute;
   left:0;
   right:0;
   top:0;
   bottom:0;
   ```

2. ```css
   position:absolute;
   left:50%;
   top:50%;
   transform:translate(-50%,-50%);
   ```

3. ```css
   display:flex;
   justify-content:center;
   align-items:center;
   ```

#### 固定定位

不会受父级定位的影响，只和浏览器的窗口有关系

## 4.样式补充

#### 圆角边框

```css
border-radius: left-top right-top right-bottom left-bottom;
border-radius:50%;  //圆形
```

#### 调色盘

```css
rgba(红，绿，蓝，透明度);
```

#### 层次堆叠

```css
z-index: 12;
```

#### 鼠标样式

```css
cursor:pointer; //手
cursor:text; //文本 I
cursor:move; //移动拖拽
cursor:default; //默认初始
```



