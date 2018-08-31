/* 引入依赖 */
let express = require('express');
/* 实现对字符串的加密 */
let utility = require('utility');

// 实例 instance
let app = express();

app.get('/', (req, res) => {
    let queryStr = req.query.tab;
    let md5Str = utility.md5(queryStr);

    res.send(`my name is ${md5Str}`);
});

app.listen('3000', (req, res) => {
    console.log('app is listen port 3000')
});