$(function(){
	var toplist;
	var contacts;
$.ajax({
	url:'http://kdhlianxiren.duapp.com/getalluser',
	dataType:'jsonp',
}).done(function(userlist){
    contacts=userlist;
	render(contacts);
	function render(data){
		$('.userlist,.zimulist,fixed span').empty();
		var obj = {};
		$.each(data,function(i,v){
			var _index = v.pinyin[0].toUpperCase();
		    if(!obj[_index]){
			obj[_index] = []
			}
		    obj[_index].push(v);
		})
		var zimu=Object.keys(obj).sort();
		$('.fixed span').text(zimu[0]);
		$.each(zimu,function(i,v){
         $('<li>').text(v).appendTo('.zimulist');
		 $('<dt>').text(v).appendTo('.userlist');
		 var list=obj[v];
		 $.each(list,function(i,v){
		 	$('<dd>'+v.uname+'<a href="tel:'+v.phone+'"></a></dd>')
		 	.appendTo('.userlist');
		 })
		})
		toplist=$('.userlist dt').map(function(i,v){
		return{
			top:$(v).offset().top,
			zimu:zimu[i],
		 }
	   }).get();
	   $('.userlist dt').prev().css({
	   	border:'none'
	   })
	   $('.zimulist').css({
	      top:80+(($(window).height()-80-$('.zimulist').height())/2)
	   })
	}
//	var obj = {};
//	for(var i = 0; i<userlist.length;i++){
//		var v = userlist[i];
//		var _index = v.pinyin[0].toUpperCase();
//		if(!obj[_index]){
//			obj[_index] = []
//					
//		}
//	   console.log(obj)
//   obj[_index].push(v);	
//	}
//	var zimu = Object.keys(obj).sort();
//	$('.fixed span').text(zimu[0]);
//	for(var i = 0 ; i<zimu.length;i++){
//		$('<li>').text(zimu[i]).appendTo('.zimulist');
//		$('<dt>').text(zimu[i]).appendTo('.userlist');
//		for(var j=0;j<obj[zimu[i]].length;j++){
//			var v=obj[zimu[i]][j];
//			$("<dd>").text(v.uname).appendTo('.userlist')
//				
//		}
//	}

	   $(window).on('resize',function(){
	   	render(contacts);
	   })
	   $(window).on('scroll',function(){
	   	var wtop=$(window).scrollTop()+110;
	   	$.each(toplist,function(i,v){
	   		if(wtop>v.top){
	   			$('.fixed span').text(v.zimu);
	   			return;
	   		}
	   	})
	   })
	   
	   $('.zimulist').on('click','li',function(){
	   	   $(window).scrollTop(toplist[$(this).index()].top-80);
	   })
	   $('.zimulist').on('touchstart touchmove',function(e){
	   	    var y=e.originalEvent.changedTouches[0].clientY;
	   	    var off=y-$(this).position().top;
	   	    var index=Math.floor(off/30);
	   	    if(index<0||index>toplist.length){
	   	    	return;
	   	    }
	   	     $(window).scrollTop(toplist[index].top-80);
	   	     e.preventDefault();
	   })
	   
	   $('.sub-header').on('touchstart',function(){
	   	$(window).scrollTop(0);
	   })
	   $('.sub-header input').on('input',function(){
	   	var key=$(this).val().trim();
	   	var arr=[];
	   	$.each(contacts,function(i,v){
	   		if(v.pinyin.indexOf(key)!==-1||v.uname.indexOf(key)!==-1||v.phone.indexOf(key)!==-1){
	   			arr.push(v);
	   		}
	   	})
	   	render(arr);
	   })
})

	
})
