define('./guaguale', [
    'zepto',
    './g_canvas2d'
    ],  function($, Gcanvas2d) {
	let imgUrl = 'http://static.360buyimg.com/jdcsh/babel/dist/img/choujiang_guaguale_background.png';
  var Canvas2d = Gcanvas2d;
  let $front, $back;
  $front = new Canvas2d($('#front'));
  $back = new Canvas2d($('#back'));
  $front.drawImage(imgUrl, {
  	x: 0,
  	y: 220,
  	width: 660,
  	height:220,
  })
  console.log($('#front'), Gcanvas2d);
})