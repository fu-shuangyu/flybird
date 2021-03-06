window.onload = function(){
	var niao = document.querySelector('.niao')
	var bird = {
		x:167.5,
		y:293.5,
		w:40,
		h:40
	};
	var guandao = [
	{top:{x:375,y:0,w:80,h:300},bottom:{x:375,y:400,w:80,h:300}},
	{top:{x:600,y:0,w:80,h:300},bottom:{x:600,y:400,w:80,h:300}},
	]
	var sheed = 1;
	var W = 375,H = 627;
	//只有在鸟过柱子的时候才检测是否发生碰撞的
	vs = false;
	var r;
	var ctx = document.querySelector('#canvas').getContext('2d');
	// 检测矩形之间的碰撞
	var recvsrec =  function(rect0,rect1){
	  if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
	    return false;
	  } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
	    return false;
	  } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
	    return false;
	  } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
	    return false;
	  }
	  return true;
	};
	//像素鸟的下落

	var draw = function(){
		//清理画布
		ctx.clearRect(0,0,375,627);
		//画小鸟
		bird.y += sheed;
		sheed +=0.001;
		ctx.drawImage(niao,0,0,50,50,bird.x,bird.y,50,50);
		//画管道
		for (var i = 0; i < guandao.length; i++) {
			var z = guandao[i];
			z.top.x -=3;
			z.bottom.x -=3;
			ctx.fillRect(z.top.x,z.top.y,z.top.w,z.top.h);
			ctx.fillRect(z.bottom.x,z.bottom.y,z.bottom.w,z.bottom.h);
			if(z.top.x < (bird.x+bird.w)  && z.top.x > (bird.x - z.top.w) ){
				if( recvsrec(bird,z.top) || recvsrec(bird,z.bottom) ){
				  vs = true;
				}
			}
			if( bird.y > H-bird.h || bird.y < 0 || vs ){
			  return;
			}
			if(z.top.x <= (-z.top.w)){
				z.top.x = 375;
				z.bottom.x = 375;

				z.top.h = Math.random()*200+150;
				z.bottom.y = z.top.h+120;
				z.bottom.h = 627-z.top.h -120;
			}
		};
		//边界判断
		if(bird.y >= 587){
			ctx.fillRect(167,587,bird.w,bird.h);
		}else if(bird.y <= 0){
			ctx.fillRect(167,0,bird.w,bird.h);
		}else{
			r = window.requestAnimationFrame(draw);
		}
		
	}
	
	r=requestAnimationFrame(draw);
	canvas.onclick = function(e){
		ctx.clearRect(0,0,375,627);
		bird.y -=40;
		ctx.fillRect(bird.x,bird.y,bird.w,bird.h);
		if(bird.y <= 0){
			ctx.fillRect(167,0,bird.w,bird.h);
		}
	}
	canvas.addEventListener('touchend',function(e){
	   bird.y -= 40;
	 },false)
	
}