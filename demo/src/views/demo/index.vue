<style lang="scss">
    a{
        display:inline-block;
        padding:5px 10px;
        color:#0a62b5;
        text-decoration: none;
        cursor: pointer;
    }
</style> 
<template>
<div>
    <div class="node">message:{{message}}</div>
    <a href="javacript:;" @click="update">更新</a>
    <a href="javacript:;" @click="destroy">销毁</a>
    <div id="container" @click="changeColor" style="widht:100%; height:100%; background-color:rgb(204, 102, 0);">
             click to change color
         </div>
</div>
</template>
<script>
import Axios from 'axios' ;     // 这是一个轻量级的ajax库，import是es6模块导入的语法。
export default {
    data(){
    	return {
    		message:"this is a test Data!!",
            isDestroy:false,
            container:null
    	}
    },  
    beforeCreate: function () {
        console.group('this is beforeCreate ===============》');
        console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
        console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
        console.log("%c%s", "color:red","message: " + this.message);// undefined
    },
    created: function () {
        console.group('this is created ===============》');
        console.log("%c%s", "color:red","el     : " + this.$el); //undefined
        console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
        console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    beforeMount: function () {
        console.group('this is beforeMount ===============》');
        console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
        console.log(this.$el);
        console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
        console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
    },
    mounted: function () {
        console.group('this is mounted ===============》');
        console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
        console.log(this.$el);    
        console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
        console.log("%c%s", "color:red","message: " + this.message); //已被初始化 

        this.$nextTick(function(){
            this.container=document.getElementById('container');
            window.addEventListener('message',function(e){
                if(e.source!=window.parent) return;
                var color = container.style.backgroundColor;
                window.parent.postMessage(color,'*');
            },false);
            
        })
    },
    beforeUpdate: function () {
        console.group('this is beforeUpdate ===============》');
        console.log("%c%s", "color:red","el     : " + this.$el);
        console.log(this.$el);   
        console.log("%c%s", "color:red","data   : " + this.$data); 
        console.log("%c%s", "color:red","message: " + this.message); 
    },
    updated: function () {
        console.group('this is updated ===============》');
        console.log("%c%s", "color:red","el     : " + this.$el);
        console.log(this.$el); 
        console.log("%c%s", "color:red","data   : " + this.$data); 
        console.log("%c%s", "color:red","message: " + this.message); 
    },
    beforeDestroy: function () {
        console.group('this is beforeDestroy ===============》');
        console.log("%c%s", "color:red","el     : " + this.$el);
        console.log(this.$el);    
        console.log("%c%s", "color:red","data   : " + this.$data); 
        console.log("%c%s", "color:red","message: " + this.message); 
    },
    destroyed: function () {
        console.group('this is destroyed ===============》');
        console.log("%c%s", "color:red","el     : " + this.$el);
        console.log(this.$el);  
        console.log("%c%s", "color:red","data   : " + this.$data); 
        console.log("%c%s", "color:red","message: " + this.message)
    },
    methods: {
        update(e){
            e.preventDefault();
            if(!this.isDestroy){
                console.log("数据本正常更新")
                console.log("%c%s","color:green",this.$el)
                console.log(this.$el,this.$data);
            } else {
                console.log("组件被销毁~~")
                console.log("%c%s","color:red",this.$el);
                console.log(this.$el,this.$data);
            }
            this.message = "这是更新后的数据~~"
        },
        destroy(e){
            e.preventDefault();
            this.message = "数据被销毁了~~";
            setTimeout(function(){
                this.$destroy();
                this.isDestroy = true;
            }.bind(this),1000)
        },
        changeColor (e) {            
             var color= this.container.style.backgroundColor;
             if(color=='rgb(204, 102, 0)'){
                 color='rgb(204, 204, 0)';
             }else{
                 color='rgb(204,102,0)';
             }
             this.container.style.backgroundColor=color;
             window.parent.postMessage(color,'http://localhost:3000');
         }
    }
}

</script>
