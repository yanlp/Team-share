/* 应用express */

let express = require('express');
let app = express();

app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Hello World !');
})
app.use('/static', express.static('public'));

app.listen(3000, () => {
    console.log('this is a express listen example  port 3000');
})