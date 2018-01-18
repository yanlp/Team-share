#一、 Virtual-Dom 初识

## 前言

自从接触了vue2.X、React之后，Virtual-Dom（V-D）的概念越来越多被提出了，它的使用更加高效地更新dom节点，提升渲染性能。

## why choose V-D？ 

> V-D Vs Nature-Dom

    1、innerHTML: render html string + 重新创建所有 DOM 元素
    2、V-D: render Virtual DOM + diff + 必要的 DOM 更新

总结: 降低了调用dom的渲染次数的开销、提高了页面渲染性能；
> V-D Vs MVVM

## 基本概念

> vNode 
    VNode 虚拟节点，它可以代表一个真实的 dom 节点。通过 createElement 方法能将 VNode 渲染成 dom 节点。
> vText
    VText 虚拟文本节点，代表了一个真实的文本节点。内容中若有 HTML 会被转义。

## V-D算法
> 用js实现dom对象, dom树的结构、属性、文本可用js表示如下：

```javascript
    var element = {
      tagName: 'ul', // 节点标签名
      props: { // DOM的属性，用一个对象存储键值对
        id: 'list'
      },
      children: [ // 该节点的子节点
        {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
        {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
        {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
      ]
    }
```

==> 生成html文件
```html
    <ul id='list'>
      <li class='item'>Item 1</li>
      <li class='item'>Item 2</li>
      <li class='item'>Item 3</li>
    </ul>
```