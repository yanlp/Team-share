/*  
    Date: 2017-11-09
    Resource github: https://github.com/alsotang/node-lessons/tree/master/lesson0
    author: yanliping
    nvm install path: curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.2/install.sh | bash
*/

/* start  express 的应用*/

var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
event.on('some_event', function() { 
    console.log('some_event 事件触发1'); 
}); 
setTimeout(function() { 
    event.emit('some_event'); 
}, 1000);
setTimeout(function() { 
    event.emit('some_event'); 
}, 2000);


