var myApp=angular.module('myApp',['ngAnimate']);
myApp.controller('brewseInfo',function($scope,$http,orderByFilter){
	$http.get('./browse.json').success(function(d){
		$scope.browserInfo=d.item;
	}).error(function(e){
		console.log(e)
	});
	
	$scope.typeSel='';
	$scope.stateSel='';
	$scope.nameInput='';
	$scope.fullNameInput='';
	$scope.userNameInput='';
	$scope.typeFile='';
	$scope.stateFile='';
	$scope.orderName='';
	$scope.activeitem ='';
	$scope.nameOrder='';
	$scope.authorOrder='';
	$scope.typeOrder='';
	$scope.stateOrder='';
	$scope.orderState=true;
	$scope.mainLeft=false;
	$scope.lastScroll;
	/*点击清除文本框里的内容*/
	$scope.clear=function(d){
		if(d == 'name'){
			$scope.nameInput='';
		}else if(d == 'fullname'){
			$scope.fullNameInput='';
		}else if(d == 'username'){
			$scope.userNameInput='';
		}
	};
	/*下拉框点击*ALL会显示*/
	$scope.$watch('typeSel',function(newValue,oldValue,scope){
        if(newValue=='*ALL'){
        	$scope.typeFile='';
        }else{
        	$scope.typeFile=newValue;
        }
	});
	$scope.$watch('stateSel',function(newValue,oldValue,scope){
        if(newValue=='*ALL'){
        	$scope.stateFile='';
        }else{
        	$scope.stateFile=newValue;
        }
	});
	/*点击后排序*/
	$scope.orderClick=function(d){
		$scope.orderName=d;
		if($scope.orderState==false){
			$scope.orderState=true;
		}else{
			$scope.orderState=false;
		}
		if(d == 'name'){
			$scope.authorOrder='';
			$scope.typeOrder='';
			$scope.stateOrder='';
			$scope.nameOrder=!$scope.orderState;		
		}else if(d == 'author'){
			$scope.nameOrder='';
			$scope.typeOrder='';
			$scope.stateOrder='';
			$scope.authorOrder=!$scope.orderState;
		}else if(d == 'type'){
			$scope.nameOrder='';
			$scope.authorOrder='';
			$scope.stateOrder='';
			$scope.typeOrder=!$scope.orderState;
		}else if(d == 'state'){
			$scope.nameOrder='';
			$scope.authorOrder='';
			$scope.typeOrder='';
			$scope.stateOrder=!$scope.orderState;
		}
	};
	/*左边过滤栏的显示隐藏*/
	$scope.leftShow=function(){
		$scope.mainLeft=!$scope.mainLeft;
	};
	$scope.open = function(item, $index) {
		if($scope.activeitem == item){
			$scope.activeitem ='1';
		}else{
			$scope.activeitem = item;
		}		
	};
	angular.element(document.querySelector('.browse-main-right-tbody')).bind('scroll',function(e){
//		console.log("滚动条位置",this.scrollTop,"总高度",this.scrollHeight,"可视区域高度",this.offsetHeight);
		var _scrollTop=this.scrollTop;//滚动条位置
		var _scrollHeight=this.scrollHeight;//总高度
		var _offsetHeight=this.offsetHeight;//可视区域高度
		var barLong=_scrollTop/(_scrollHeight-_offsetHeight)*100;
		document.querySelector('.browse-main-right-tfoot-show').style.width= barLong+'%';
		/*if(_scrollTop-$scope.lastScroll>0){
			$scope.showBtn=true;
		}else{
			$scope.showBtn=false;
		}
		$scope.lastScroll=_scrollTop;*/
	});
	$scope.scrollTo=function(n){
		var ele=angular.element(document.querySelector('.browse-main-right-tbody'))[0];
		if(n){
			ele.scrollTop=0;
		}else{
			ele.scrollTop=ele.scrollHeight-ele.offsetHeight;
		}
	}
})
myApp.controller('getUserName',function($scope){
	$scope.username=sessionStorage.getItem('name');
})
/*myApp.controller('setLanguage',function($scope,$http){
	$http.get('../language/lang.json').success(function(d){
		console.log(d);
		$scope.lang=d.ch;
		$scope.inputStateSel=$scope.lang.currentState+":"+$scope.lang.draft;
	}).error(function(d){
		console.log(d);
	})
})*/
myApp.controller('setLanguage',function($scope,$http){
	$http.get('../language/lang.json').success(function(d){
		console.log(d);
		$scope.allLang=d;
		if(localStorage.getItem("lang")==null||localStorage.getItem("lang")=="ch"){
			$scope.lang=$scope.allLang.ch;
		}else if(localStorage.getItem("lang")=="en"){
			$scope.lang=$scope.allLang.en;
		}
		$scope.inputStateSel=$scope.lang.currentState+":"+$scope.lang.draft;
	}).error(function(d){
		console.log(d);
	})
	$scope.setLang=function(i){
		if(i=="ch"){
			$scope.lang=$scope.allLang.ch;
			localStorage.setItem("lang","ch");
		}else if(i=="en"){
			$scope.lang=$scope.allLang.en;
			localStorage.setItem("lang","en");
		}
		$scope.inputStateSel=$scope.lang.currentState+":"+$scope.lang.draft;
	}
})

