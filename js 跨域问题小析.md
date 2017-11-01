#### "前台"处理「JavaScript」几种跨域方式总结

#####  § WHY 会出现跨域问题？
<pre><p>  JavaScript出于安全方面的考虑，不允许跨域调用其他页面的对象。但在安全限制的同时也给注入iframe或是ajax应用上带来了不少麻烦。这里把涉及到跨域的一些问题简单地整理一下：</p></pre>

###### & 跨域是什么？

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

##### §、document.domain+iframe的设置

> 使用场景 

---- `主域相同，子域不同`(即仅适用于主域相同而二级域名不同)

> 使用步骤 

* 设置document.domain 如url分别 `http://mcbeta.jd.com/demo/index.html` 和 `http://beta-mcdata.jd.com/demo/iframeIndex.html` 为url的主域名`jd.com`;

* 在index.html文件中添加iframe，通过控制iframe的contentDocument，实现两个js文件之间的`交互`;

* [document.domain DEMO](http://mcbeta.jd.com/demo/index.html)

> ps:某一页面的domain默认等于window.location.hostname。主域名是不带mcbeta的域名，例如jd.com，
主域名前面带前缀的通常都为二级域名或多级域名，例如 mcbeta.jd.com其实是二级域名。 domain只能设置为主域名，不可以在mcbeta.jd.com中将domain设置为beta-mcdata.jd.com。


> 问题

* 安全性，当一个站点（b.a.com）被攻击后，另一个站点（c.a.com）会引起安全漏洞。
* 如果一个页面中引入多个iframe，要想能够操作所有iframe，必须都得设置相同domain。

##### §、window.name+iframe的设置
> 历史

* window.name 传输技术，原本是 Thomas Frank 用于解决 cookie 的一些劣势（每个域名 4 x 20 Kb 的限制、数据只能是字符串、设置和获取 cookie 语法的复杂等等）而发明的（详细见原文：《Session variables without cookies》），后来 Kris Zyp 在此方法的基础上强化了 window.name 传输 ，并引入到了 Dojo （dojox.io.windowName），用来解决跨域数据传输问题

> 优点：

* name 值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）
* 操作安全、传输快

> 操作步骤

* 有三个页面 
	* mcbeta.jd.com/app.html       应用页面
	* mcbeta.jd.com/proxy.html     代理文件（空白页面）
	* beta-mcdata.jd.com/index.php 应用页面需要获取数据的页面，可称为数据页面
* [window.name DEMO](http://mcbeta.jd.com/demo/app.html)

> 总结

* iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作

#####§、JSONP
