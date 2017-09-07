# VUE 1.0 迁移 2.0 所遇到的洼地
## 1、生命周期对比表格
<div style="display: block;width: 700px;max-height: 800px;white-space: nowrap;">
	<span style="display: inline-block; width: 300px">
		<img src="./assets/img/lifecycle-vue1.png" alt="vue1.x 生命周期图" width="400" height="600">
	</span>
	<span style="display: inline-block; width: 300px">
		<img src="./assets/img/lifecycle-vue2.png" alt="vue2.x 生命周期图" width="400" height="600">
	</span>
</div>

|	vue1.x		| 	vue2.x   	|	 		基本描述															|
|	:---		|		---	 	|		     ---															|
|	init		| beforeCreate  |	组件实例刚被创建，其属性如data等计算之前										|
|	created		|	created		|	组件实例创建完毕，	属性已绑定，但dom还未生成,Vue.$el属性暂不存在				|
| beforeCompile |    - 			|	模板编译之前																|
|	-			| beforeMount   |	模板挂载之前																|
|  complied		|	 -			|	模板编译之后																|
|  ready		|   mounted 	|	模板编译/挂载之后（不能保证组件完全在document里）							|
|	-			|	beforeUpdate|	组件更新之前																|
|	-			|	updated		|	组件更新之后																|
|	-			|	activated	|	for keep-alive,组件被激活使用												|
|	—			|	deactivated |	for keeo-alive,组件被移除使用												|
|	attached	|	-			|	废弃																		|
|	deattached	|	-			|	废弃																		|
| beforeDestroy | beforeDestroy |	组件被销毁前调用															|
| destroy 		| destroy 		|	组件被销毁后调用															|

---
## 2、探究生命周期
vue 生命周期图及表格依然醒目的展示了，各钩子函数的执行顺序，现在探究具体钩子函数的执行过程；
```
<code javascript>
	<script>
		data(){
	    	return {
	    		message:"this is a test Data!!",
	            isDestroy:false
	    	}
	    }, 
	    beforeCreate: function () {
	        console.group('beforeCreate 组件创建前状态===============》');
	        console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
	        console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
	        console.log("%c%s", "color:red","message: " + this.message);// undefined
	    },
	    created: function () {
	        console.group('created 组件创建完毕状态===============》');
	        console.log("%c%s", "color:red","el     : " + this.$el); //undefined
	        console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
	        console.log("%c%s", "color:red","message: " + this.message); //已被初始化
	    },
	    beforeMount: function () {
	        console.group('beforeMount 挂载前状态===============》');
	        console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
	        console.log(this.$el);
	        console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
	        console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
	    },
	    mounted: function () {
	        console.group('mounted 挂载结束状态===============》');
	        console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
	        console.log(this.$el);    
	        console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
	        console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
	    },
	    beforeUpdate: function () {
	        console.group('beforeUpdate 更新前状态===============》');
	        console.log("%c%s", "color:red","el     : " + this.$el);
	        console.log(this.$el);   
	        console.log("%c%s", "color:red","data   : " + this.$data); 
	        console.log("%c%s", "color:red","message: " + this.message); 
	    },
	    updated: function () {
	        console.group('updated 更新完成状态===============》');
	        console.log("%c%s", "color:red","el     : " + this.$el);
	        console.log(this.$el); 
	        console.log("%c%s", "color:red","data   : " + this.$data); 
	        console.log("%c%s", "color:red","message: " + this.message); 
	    },
	    beforeDestroy: function () {
	        console.group('beforeDestroy 销毁前状态===============》');
	        console.log("%c%s", "color:red","el     : " + this.$el);
	        console.log(this.$el);    
	        console.log("%c%s", "color:red","data   : " + this.$data); 
	        console.log("%c%s", "color:red","message: " + this.message); 
	    },
	    destroyed: function () {
	        console.group('destroyed 销毁完成状态===============》');
	        console.log("%c%s", "color:red","el     : " + this.$el);
	        console.log(this.$el);  
	        console.log("%c%s", "color:red","data   : " + this.$data); 
	        console.log("%c%s", "color:red","message: " + this.message)
	    }
	</script>
</code>

```

> 总结console结果
	<font color="red">beforeCreate:</font>
