
# 一、 Virtual-Dom 初识

### 前言

自从接触了vue2.X、React之后，Virtual-Dom（V-D）的概念越来越多被提出了，它的使用更加高效地更新dom节点，提升渲染性能。

### why choose V-D？ 

> V-D Vs Nature-Dom

    1、innerHTML: render html string + 重新创建所有 DOM 元素
    2、V-D: render Virtual DOM + diff + 必要的 DOM 更新

总结: 降低了调用dom的渲染次数的开销、提高了页面渲染性能；
> V-D Vs MVVM

### 基本概念

> vNode 
    VNode 虚拟节点，它可以代表一个真实的 dom 节点。通过 createElement 方法能将 VNode 渲染成 dom 节点。
> vText
    VText 虚拟文本节点，代表了一个真实的文本节点。内容中若有 HTML 会被转义。

### V-D算法
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

<==> 生成html文件
```html
    <ul id='list'>
      <li class='item'>Item 1</li>
      <li class='item'>Item 2</li>
      <li class='item'>Item 3</li>
    </ul>
```

总结: DOM 树的信息都可以用 JavaScript 对象来表示，反过来，可根据这个用js对象表示的树结构来构建一棵真正的DOM树
渲染不同点： 1>、 原生dom方式，重新渲染整个视图
           2>、V-D: 首先重新渲染这个JS的对象结构，其次，对比新老树的差异，记录差异， 最后，作用到真正dom，渲染有变更的dom;
> 算法总结

    1、用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
    2、当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
    3、把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

### 算法实现

> 步骤一：用JS对象模拟DOM树

用 JavaScript 来表示一个 DOM 节点是很简单的事情，你只需要记录它的节点类型、属性，还有子节点:

element.js
```javascript
    function Element (tagName, props, children) {
      this.tagName = tagName
      this.props = props
      this.children = children
    }

    module.exports = function (tagName, props, children) {
      return new Element(tagName, props, children)
    }
```
<==> 利用上述方法，dom可描述如下：
```javascript
    var el = require('./element')

    var ul = el('ul', {id: 'list'}, [
      el('li', {class: 'item'}, ['Item 1']),
      el('li', {class: 'item'}, ['Item 2']),
      el('li', {class: 'item'}, ['Item 3'])
    ])
```
<==> 将js表示的dom对象，渲染成真正的dom树
```javascript
    Element.prototype.render = function () {
      var el = document.createElement(this.tagName) // 根据tagName构建
      var props = this.props

      for (var propName in props) { // 设置节点的DOM属性
        var propValue = props[propName]
        el.setAttribute(propName, propValue)
      }

      var children = this.children || []

      children.forEach(function (child) {
        var childEl = (child instanceof Element)
          ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
          : document.createTextNode(child) // 如果字符串，只构建文本节点
        el.appendChild(childEl)
      })

      return el
    }
```

<==> 利用render方法，渲染将js对象结构渲染到真正的dom树；
```javascript
    var ulRoot = ul.render()
    document.body.appendChild(ulRoot)

    /* 生成dom
    <ul id='list'>
      <li class='item'>Item 1</li>
      <li class='item'>Item 2</li>
      <li class='item'>Item 3</li>
    </ul>
    */
```

> 步骤二：比较两棵虚拟DOM树的差异

比较两棵DOM树的差异是 V-D 算法最核心的部分，这也是所谓的 Virtual DOM 的 diff 算法。两个树的完全的 diff 算法是一个时间复杂度为 O(n^3) 的问题。但是在前端当中，你很少会跨越层级地移动DOM元素。所以 Virtual DOM 只会对同一个层级的元素进行对比

<div>
    <img src="./diff.png" alt="" width="500">
</div>