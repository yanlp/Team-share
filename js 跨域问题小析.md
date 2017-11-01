## "前台"处理「JavaScript」几种跨域方式总结

###  § WHY 会出现跨域问题？
<pre><p>  JavaScript出于安全方面的考虑，不允许跨域调用其他页面的对象。但在安全限制的同时也给注入iframe或是ajax应用上带来了不少麻烦。这里把涉及到跨域的一些问题简单地整理一下：</p></pre>

#### & 跨域是什么？

> 简言之，由于js同源策略的限制，如a.com域名下的js无法操作b.com或是c.a.com域名下的对象。具体表格:


|   URL          |   说明      |          是否允许通信              |
|   :---        |       :---:     |            :---  |
|   http://www.a.com/a.js <br/>http://www.a.com/b.js                | 同一域名下  						   	|  允许      |
|   http://www.a.com/lab/a.js <br/>http://www.a.com/script/b.js     | 同一域名下不同文件夹        	|  允许      |
|   http://www.a.com:8000/a.js<br/>http://www.a.com/b.js     				| 同一域名，不同端口          	|  不允许    |
|   http://www.a.com/a.js<br/>http://70.32.92.74/b.js               | 域名和域名对应ip            |  不允许    |
|  	http://www.a.com/a.js<br/>http://script.a.com/b.js              | 主域相同，子域不同	          |  不允许    |
|   http://www.a.com/a.js<br/>http://a.com/b.js                     | 同一域名，不同二级域名       	|  不允许    |
|   http://www.a.com/a.js<br/>https://a.com/a.js                    | 同一域名，不同协议          	|  不允许    |
|   http://www.cnblogs.com/a.js<br/>http://www.a.com/b.js           | 不同域名                		|  不允许    |

> PS 跨域特别注意两点：

* 第一，如果是协议和端口造成的跨域问题“前台”是无能为力的，
* 第二，在跨域问题上，域仅仅是通过“URL的首部”来识别而不会去尝试判断相同的ip地址对应着两个域或两个域是否在同一个ip上。

> URL的首部: `window.location.protocol + window.location.host` <=> `Domain, protocols and ports must match`;

### §、document.domain+iframe的设置

> 使用场景 

---- `主域相同，子域不同`(即仅适用于主域相同而二级域名不同)

> 使用步骤 

* 设置document.domain 如url分别 `http://mcbeta.jd.com/demo/index.html` 和 `http://beta-mcdata.jd.com/demo/iframeIndex.html` 为url的主域名`jd.com`;

* 在index.html文件中添加iframe，通过控制iframe的contentDocument，实现两个js文件之间的`交互`;

* [document.domain DEMO](http://mcbeta.jd.com/demo/index.html)

> ps:某一页面的domain默认等于window.location.hostname。主域名是不带mcbeta的域名，例如jd.com，
主域名前面带前缀的通常都为二级域名或多级域名，例如 mcbeta.jd.com其实是二级域名。 domain只能设置为主域名，不可以在mcbeta.jd.com中将domain设置为beta-mcdata.jd.com。


> 缺点

* 安全性，当一个站点（b.a.com）被攻击后，另一个站点（c.a.com）会引起安全漏洞。
* 如果一个页面中引入多个iframe，要想能够操作所有iframe，必须都得设置相同domain。

### §、window.name+iframe的设置
> 历史

* window.name 传输技术，原本是 Thomas Frank 用于解决 cookie 的一些劣势（每个域名 4 x 20 Kb 的限制、数据只能是字符串、设置和获取 cookie 语法的复杂等等）而发明的（详细见原文：《Session variables without cookies》），后来 Kris Zyp 在此方法的基础上强化了 window.name 传输 ，并引入到了 Dojo （dojox.io.windowName），用来解决跨域数据传输问题

> 使用场景

---- 完全跨域

> 使用步骤

* 有三个页面 
	* mcbeta.jd.com/app.html       应用页面
	* mcbeta.jd.com/proxy.html     代理文件（空白页面）
	* beta-mcdata.jd.com/index.php 应用页面需要获取数据的页面，可称为数据页面
* [window.name DEMO](http://mcbeta.jd.com/demo/app.html)

> 优点：

* name 值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）
* 操作安全、传输快

> 总结

* iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作
* iframe标签的跨域能力

* window.name属性值在文档刷新后依旧存在的能力


### §、利用iframe和location.hash

> 使用场景

---- 完全跨域

> 使用步骤及原理

* 原理， 利用location.hash传值;在url:`http://mcbeta.jd.com/hash.html#code` 中的‘#code’ 就是 location.hash ， 改变 hash 并不会 导致页面刷新，所以可以利用hash值来进行数据传递，当然数据容量是有限的;

* 以`http://mcbeta.jd.com/hash.html` 和`http://beta-mcdata.jd.com/iframeHash.html` 之间的数据通信为例

	* hash.html 首先创建自动创建一个隐藏的iframe，iframe的src指向beta-mcdata.jd.com域名下的 iframeHash.html页面，这时的hash值可以做参数传递用;
	
	* iframeHash.html响应请求后再将通过修改hash.html的hash值来传递数据（由于两个页面不在同一个域下,IE、Chrome不允许修改parent.location.hash的值，所以要借助于mcbeta.jd.com域名下的一个代理iframe；Firefox可以修改）

	* 与此同时，hash.html上加一个定时器，隔一段时间来判断location.hash的值有没有变化，一点有变化则获取获取hash值;

* [location Hash DEMO](http://mcbeta.jd.com/hash.html)

> 缺点

* 数据容量、类型有限、数据暴露在url上

### §、动态创建script

> 使用场景

---- 完全跨域

> 原理

* 虽然浏览器默认禁止了跨域访问，但并不禁止在页面中引用其他域的JS文件，并可以自由执行引入的JS文件中的function（包括操作cookie、Dom等等）。根据这一点，可以方便地通过创建script节点的方法来实现完全跨域的通信；

> 典型应用 JSONP

* 简述
	*  由于同源策略的限制，XmlHttpRequest只允许请求当前源（域名、协议、端口）的资源，为了实现跨域请求，可以通过script标签实现跨域请求，然后在服务端输出JSON数据并执行回调函数，从而解决了跨域的数据请求

	* jsonp的实现核心就是利用script标签的跨域能力，而与xhr或者说传统意义上的ajax并没有关系;

	* jsonp提供的url（即动态生成的script标签的src），无论看上去是什么形式，最终生成返回的都是一段js代码


### 使用HTML5 postMessage

> 使用背景

* HTML5中最酷的新功能之一就是 跨文档消息传输Cross Document Messaging。下一代浏览器都将支持这个功能：Chrome 2.0+、Internet Explorer 8.0+, Firefox 3.0+, Opera 9.6+, 和 Safari 4.0+ 。 Facebook已经使用了这个功能，用postMessage支持基于web的实时消息传递。

####  otherWindow.postMessage(message, targetOrigin);

* otherWindow: 对接收信息页面的 window的引用。可以是页面中iframe的contentWindow属性； window.open的返回值；通过name或下标从 window.frames 取到的值。

* message: 所要发送的数据，string类型。
* targetOrigin: 用于限制otherWindow，“*”表示不作限制


