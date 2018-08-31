/*  使用 superagent 与 cheerio 完成简单爬虫*/
let  express = require('express');
let request = require('superagent');
let cheerio = require('cheerio');
/* 并发模块 */
let eventProxy = require('eventproxy');
let url = require('url');

let reqUrl = 'https://cnodejs.org/';

/* 实例化 */
let app = express();

app.get('/', (req, res, next) => {
    request.get(reqUrl)
            .end((err, sres) => {
                if (err) {
                    return next(err);
                }
                let $ = cheerio.load(sres.text);
                let [items, topics] = [[], []];
                $('#allDynamicDiv .item-content-wrapper').each((index, item) => {
                    items.push({
                        title: $(item).attr('title'),
                        author: $(item).attr('href'),
                    })
                    let href = url.resolve(reqUrl, $(item).attr('href'));
                    topics.push(href);
                });
                res.send(items);
            });
})

app.listen('3000', (req, res) => {

})