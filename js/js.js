// JavaScript Document
window.onload = function(){
	schTab();
	upDate();
	calendar();
	 BBS();
	 HOT();
	};

//切换搜索框
function schTab(){
	var oUl = document.getElementById('menu');
	var aLi = oUl.getElementsByTagName('li');
	var oSech = document.getElementById('search');
	var oText = document.getElementById('text1');;
	var num = 0;
	var arrText = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
	//tab切换
	oText.value =  arrText[num];
	for(var i=0; i<aLi.length; i++){
		aLi[i].index = i;
		aLi[i].onclick = function(){
			for(var i=0; i<aLi.length; i++){
				aLi[i].className = 'gradient';
				}
			this.className = 'active';
			oText.value =  arrText[this.index];
			num = this.index;
			};		
	}
	//鼠标焦点
	oText.onfocus = function(){
		if(this.value==arrText[num]){
			this.value = '';
			}
		};
	//失去焦点
	oText.onblur = function(){
		if(this.value==''){
			this.value = arrText[num];
			}
		};
}
//upDate文字上下滚动
function upDate(){	
	function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }
	function doMove(obj,attr,dir,target,endFn){
		dir=parseInt(getStyle(obj,attr))<target?dir : -dir;
		clearInterval(obj.timer);
		
		obj.timer=setInterval(function(){
			var speed=parseInt(getStyle(obj,attr))+dir;
			if(speed>target && dir>0||speed<target && dir<0){
				speed=target;
				}
			obj.style[attr] = speed + 'px';
			
			if ( speed == target ) {
				clearInterval( obj.timer );
				endFn && endFn();
			}
			},30);}	
	var oDiv =  document.getElementById('upDate');
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var oUp = document.getElementById('updateUpBtn');
	var oDown = document.getElementById('updateDownBtn');
	var str = '';
	var timer = null;
	var num = 0;
	var arrData = [
			{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
			{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
			{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
			{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
			{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
		];
	var oLi = document.createElement('li');
	for ( var i=0; i<arrData.length; i++ ) {
			str += '<li><a href="'+ arrData[i].url +'"><strong>'+ arrData[i].name +'</strong> <span>'+ arrData[i].time +'分钟前</span> 写了一篇新文章：'+ arrData[i].title +'…</a></li>';
		}
	oUl.innerHTML =str ;
	
	function fn(){
		timer=setTimeout(function () {				
			num++;
			doMove(oUl,'top',3,-30*num,function(){
				if(num==arrData.length){
					num=0;
					oUl.style.top = 0;
					}
				fn();
				});
		}, 2000);
	}
	fn();
	oDiv.onmousemove = function(){
		clearTimeout( timer );		
		};	
	oDiv.onmouseout = function(){
		fn();
		};
	oUp.onclick = function(){	
		num++;
		iNow =num;	
		if(iNow==arrData.length){
			iNow=0;		
					}	
		doMove(oUl,'top',3,-30*iNow);
		num=iNow;
		};
	oDown.onclick = function(){		
		num--;
		iNow =num;
		if(iNow==-1){
			iNow=arrData.length-1;
					}			
		doMove(oUl,'top',3,-30*iNow);
		num=iNow;
		};
}

//日历提示说明
function calendar(){
	var oCalend = document.getElementById('calend');
	var oH3 = oCalend.getElementsByTagName('h3')[0];
	var oOl = oCalend.getElementsByTagName('ol')[0];
	var aSpan = oH3.children;
	var aImg = oOl.getElementsByTagName('img');
	var oInfo = document.getElementById('todayInfo');
	var oImg = oInfo.getElementsByTagName('img')[0];
	var oStrong = oInfo.getElementsByTagName('strong')[0];
	var oP = oInfo.getElementsByTagName('p')[0];
	var str = ['迟到的荣誉——啦啦啦，现在还写电商网站，呃好吧，没词儿了~~',
				'这似乎是海参配燕窝，好味道~',
				'气质美女，陪谁去过明天的情人节？',
				'帅哥是谁？陪谁去过情人节？'
				]
		var src = ['img/today2.gif',
				'img/hot_list_pic2.gif',
				'img/hot10.gif',
				'img/hot11.gif'
				]
	for(var i=1; i<aImg.length; i++){
		aImg[i].index = i;
		aImg[i].onmouseover = function(){		
			var iTop = aImg[this.index].parentNode.offsetTop -30;
			var iLeft = aImg[this.index].parentNode.offsetLeft +60;
			oInfo.style.top = iTop	+'px';
			oInfo.style.left = iLeft +'px';		
			oInfo.style.display = 'block';
			oP.innerHTML = str[this.index-1];
			oImg.src = src[this.index-1];
			};
		aImg[i].onmouseout = function(){
			oInfo.style.display = 'none';
			};
		}	
	}
//BBS高亮显示
function BBS(){
	var oList = document.getElementById('sList');
	var aLi =oList.getElementsByTagName('li');
	var old=0;	
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aDiv = aLi[i].getElementsByTagName('div');
			aLi[i].onmouseover=function(){	
				//操作上一个li里面的div
             	var oldDiv = aLi[old].getElementsByTagName('div');
             	oldDiv[0].style.display = "block";
             	oldDiv[1].style.display = "none";
			 	//操作当前鼠标移入的li下面的两个div
			 	var aDiv = this.getElementsByTagName('div');
			 	aDiv[0].style.display = "none";
            	aDiv[1].style.display ="block";
				old = this.index;
				};
			}
	}
//HOT鼠标提示效果
function HOT(){
	var oHot = document.getElementById('hotArea');
	var aLi = oHot.getElementsByTagName('li');
	var str = '';
	var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
		
	 var oP = document.createElement('p');
	 for(var i=0; i<aLi.length; i++){
		aLi[i].index = i;		
		aLi[i].onmouseover = function(){
			if(this.index==0) return;			
			oP.style.width = (aLi[this.index].offsetWidth-12) +'px';
			oP.style.width = (aLi[this.index].offsetWidth-12) +'px';
			oP.innerHTML = arr[this.index];
			this.appendChild(oP);		
		}
		}
	}
$(function (){
	//Tab头部切换
	(function (){
		
		fnTab( $('.tabNav1'), $('.tabCon1'), 'click' );
		fnTab( $('.tabNav2'), $('.tabCon2'), 'click' );
		fnTab( $('.tabNav3'), $('.tabCon3'), 'mouseover' );
		fnTab( $('.tabNav4'), $('.tabCon4'), 'mouseover' );
		
		function fnTab( oNav, aCon, sEvent ) {
			var aElem = oNav.children();
			aCon.hide().eq(0).show();
			
			aElem.each(function (index){
				
				$(this).on(sEvent, function (){
					aElem.removeClass('active').addClass('gradient');

					$(this).removeClass('gradient').addClass('active');
					aElem.find('a').attr('class', 'triangleDownGray');
					$(this).find('a').attr('class', 'triangleDownRed');
					
					aCon.hide().eq( index ).show();
				});
				
			});
		}
	})();
	//自动播放的焦点图
	(function (){
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var oP = oDiv.find('p');
		var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
		var iNow = 0;
		var timer = null;		
		fnFade();	
		aOlLi.click(function (){
			iNow = $(this).index();
			fnFade();
		});
		oDiv.hover(function (){ clearInterval(timer); }, autoPlay);		
		function autoPlay() {
			timer = setInterval(function () {
				iNow++;
				iNow%=arr.length;
				fnFade();
			}, 2000);
		}
		autoPlay();
		
		function fnFade() {
			aUlLi.each(function (i){
				if ( i != iNow ) {
					aUlLi.eq(i).fadeOut().css('zIndex', 1);
					aOlLi.eq(i).removeClass('active');

				} else {
					aUlLi.eq(i).fadeIn().css('zIndex', 2);
					aOlLi.eq(i).addClass('active');
				}
			});
			oP.text(arr[iNow]);
		}
	})();
	});
