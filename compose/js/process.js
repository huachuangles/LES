myApp.controller('processInfo',
		function($scope,$http) {
			$http.get('./cale.json').success(function(d){
				$scope.caleList=d;
//				console.log($scope.caleList);
			}).error(function(e){
				console.log(e)
			})
			$scope.thisName='';
			$scope.thisPreview='';
			$scope.treeIndex=[];
			$scope.isAsynchronous='';
			$scope.thisTr='1';
			$scope.processBtn=true;
			$scope.thisPreviewCale='';
			$scope.selectedTree = function(i, $index) {
				var name=i.processName||i.testName||i.stepName;
				var preview=i.preview||'';
				$scope.thisPreview=preview;
				$scope.thisName=name;
				/*if($scope.thisTr == i){
					$scope.thisTr ='1';
				}else{
					$scope.thisTr = i;
				}*/	
				$scope.thisTr = i;
				$scope.isAsynchronous=i.asynchronous||'';
			};
			/*$scope.$watch('thisPreview',function(newNum,oldNum){
				var preStr=newNum;
				$scope.thisPreviewCale=newNum;
			})*/
			$scope.addBefor=function(){
				var processIndex,testIndex,stepIndex;
				if($scope.treeIndex.length==1){
					processIndex=$scope.treeIndex[0];
					var newProcess={processName: '新建项目',testList : []};
					$scope.treeItem.splice(processIndex-1,0,newProcess);
				}else if($scope.treeIndex.length==2){
					processIndex=$scope.treeIndex[0];
					testIndex=$scope.treeIndex[1];
					var newTest={testName: '新建测试',stepList : [],asynchronous: false};
					$scope.treeItem[processIndex-1].testList.splice(testIndex-1,0,newTest);
				}else if($scope.treeIndex.length==3){
					processIndex=$scope.treeIndex[0];
					testIndex=$scope.treeIndex[1];
					stepIndex=$scope.treeIndex[2];
					var newStep={"stepName":"新建步骤"};
					$scope.treeItem[processIndex-1].testList[testIndex-1].stepList.splice(stepIndex-1,0,newStep);
				}
				/*重定位选中节点的index*/
				$scope.treeIndex.length=0;
				var trIndex=document.querySelector('.tree-item-tr-selcted').children[0].children;
				for (var i=0;i<trIndex.length;i++) {
					$scope.treeIndex.push(trIndex[i].innerHTML);
				}
				$scope.treeIndex[$scope.treeIndex.length-1]=parseInt($scope.treeIndex[$scope.treeIndex.length-1])+1;
			}
			$scope.addAfter=function(){
				var processIndex,testIndex,stepIndex;
				if($scope.treeIndex.length==1){
					processIndex=$scope.treeIndex[0];
					var newProcess={processName: '新建项目',testList : []};
					$scope.treeItem.splice(processIndex,0,newProcess);
				}else if($scope.treeIndex.length==2){
					processIndex=$scope.treeIndex[0];
					testIndex=$scope.treeIndex[1];
					var newTest={testName: '新建测试',stepList : [],asynchronous: false};
					$scope.treeItem[processIndex-1].testList.splice(testIndex,0,newTest);
				}else if($scope.treeIndex.length==3){
					processIndex=$scope.treeIndex[0];
					testIndex=$scope.treeIndex[1];
					stepIndex=$scope.treeIndex[2];
					var newStep={"stepName":"新建步骤"};
					$scope.treeItem[processIndex-1].testList[testIndex-1].stepList.splice(stepIndex,0,newStep);
				}
			}
			$scope.addInner=function(){
//				alert($scope.treeIndex);
				var processIndex,testIndex;
				if($scope.treeIndex.length==1){
					processIndex=$scope.treeIndex[0];
					var newTest={testName: '新建测试',stepList : [],asynchronous: false};
					$scope.treeItem[processIndex-1].testList.push(newTest)
				}else if($scope.treeIndex.length==2){
					processIndex=$scope.treeIndex[0];
					testIndex=$scope.treeIndex[1];
					var newStep={"stepName":"新建步骤"};
//					console.log($scope.treeItem[processIndex-1].testList[testIndex].stepList);
					$scope.treeItem[processIndex-1].testList[testIndex-1].stepList.push(newStep);
				}else if($scope.treeIndex.length==3){
					alert('添加错误');
				}
			}
			$scope.addAsynchronous=function(){
				var processIndex,testIndex;
				var newTest={testName: '新建测试',stepList : [],asynchronous: true};
				processIndex=$scope.treeIndex[0];
				testIndex=$scope.treeIndex[1];
				if($scope.treeItem[processIndex-1].testList[testIndex-1].asynchronous==true){
					$scope.treeItem[processIndex-1].testList.splice(testIndex-1,0,newTest);	
				}
				else{
					$scope.treeItem[processIndex-1].testList[testIndex-1].asynchronousEnd=true;	
					$scope.treeItem[processIndex-1].testList[testIndex-1].asynchronous=true;	
					$scope.treeItem[processIndex-1].testList.splice(testIndex-1,0,newTest);
				}
				/*重定位选中节点的index*/
				$scope.treeIndex.length=0;
				var trIndex=document.querySelector('.tree-item-tr-selcted').children[0].children;
				for (var i=0;i<trIndex.length;i++) {
					$scope.treeIndex.push(trIndex[i].innerHTML);
				}
				$scope.treeIndex[$scope.treeIndex.length-1]=parseInt($scope.treeIndex[$scope.treeIndex.length-1])+1;
				$scope.isAsynchronous=true;
			}
			$scope.remove=function(){
				var processIndex,testIndex,stepIndex;
				if($scope.treeIndex.length==1){
					processIndex=$scope.treeIndex[0];
					$scope.treeItem.splice(processIndex-1,1);
				}else if($scope.treeIndex.length==2){
					processIndex=$scope.treeIndex[0];
					testIndex=$scope.treeIndex[1];
					$scope.treeItem[processIndex-1].testList.splice(testIndex-1,1);
				}else if($scope.treeIndex.length==3){
					processIndex=$scope.treeIndex[0];
					testIndex=$scope.treeIndex[1];
					stepIndex=$scope.treeIndex[2];
//					console.log($scope.treeItem[processIndex-1].testList[testIndex-1].stepList);				
					$scope.treeItem[processIndex-1].testList[testIndex-1].stepList.splice(stepIndex-1,1);
				}
				$scope.treeIndex.length=0;
			}
			$scope.$watch('thisName',function(newNum,oldNum){
				if(newNum!=''){
					if($scope.treeIndex.length==1){
						$scope.treeItem[$scope.treeIndex[0]-1].processName=newNum;
					}else{
						$scope.treeIndex[2]? $scope.treeItem[$scope.treeIndex[0]-1].testList[$scope.treeIndex[1]-1].stepList[$scope.treeIndex[2]-1].stepName=newNum:$scope.treeItem[$scope.treeIndex[0]-1].testList[$scope.treeIndex[1]-1].testName=newNum;
					}
//					console.log(newNum);
				}
			})
			$scope.$watch('thisPreview',function(newNum,oldNum){
				if(newNum!=''){
					if($scope.treeIndex.length==1){
						$scope.treeItem[$scope.treeIndex[0]-1].preview=newNum;
					}else{
						$scope.treeIndex[2]? $scope.treeItem[$scope.treeIndex[0]-1].testList[$scope.treeIndex[1]-1].stepList[$scope.treeIndex[2]-1].preview=newNum:$scope.treeItem[$scope.treeIndex[0]-1].testList[$scope.treeIndex[1]-1].preview=newNum;
					}
				}
				var preStr=newNum;
				for (var each in $scope.caleList) {
					preStr=preStr.replace(each,$scope.caleList[each])
				}
					try{
						$scope.thisPreviewCale=eval(preStr)
					}catch(e){
						$scope.thisPreviewCale=preStr;
					}
			})
			$scope.MateEquBoo=true;
			$scope.MateEqu=function(d){
				$scope.MateEquBoo=d;	
			}
			$scope.showEquipment=function(i){
				angular.element(document.querySelectorAll('.motai-box'))[i].style.display='block';
			}
			$scope.closeEquipment=function(i){
				angular.element(document.querySelectorAll('.motai-box'))[i].style.display='none';
			};
			/*点击排序*/
			$scope.orderClick=function(d){
				$scope.orderName=d;
				if($scope.orderState==false){
					$scope.orderState=true;
				}else{
					$scope.orderState=false;
				}
				if(d == 'name'){
					$scope.typeOrder='';
					$scope.nameOrder=!$scope.orderState;
				}else if(d == 'type'){
					$scope.nameOrder='';
					$scope.typeOrder=!$scope.orderState;
				}
			};
			/*双击添加仪器*/
			$scope.EquipmentListitems=[];
			$scope.addEquipmentList=function(d){
				if($scope.EquipmentListitems.indexOf(d)==-1){
					$scope.EquipmentListitems.push(d);
					angular.element(document.querySelectorAll('.motai-box'))[0].style.display='none';
					console.log($scope.EquipmentListitems,"$scope.EquipmentListitems");
				}else{
					alert('你已经加入过改器材')
				}
			};
			/*双击添加MeterialsList*/
			$scope.MeterialsListitems=[];
			$scope.addMeterialsList=function(d){
				if($scope.MeterialsListitems.indexOf(d)==-1){
					$scope.MeterialsListitems.push(d);
					angular.element(document.querySelectorAll('.motai-box'))[1].style.display='none';
				}else{
					alert('你已经加入过改器材')
				}
			}
			/*双击选择Equipment下的role*/
			$scope.roleChange=function(a,b){
				angular.element(document.querySelectorAll('.Material-role'))[b].style.display='none';
				angular.element(document.querySelectorAll('.role-box'))[b].style.display='block';
				angular.element(document.querySelectorAll('.role-box select'))[b].focus();
			}
			$scope.roleBlur=function(a,b){
				angular.element(document.querySelectorAll('.Material-role'))[b].style.display='block';
				angular.element(document.querySelectorAll('.role-box'))[b].style.display='none';
			}
			/*双击选择Meterials下的role*/
			$scope.MeterialsroleChange=function(a,b){
				angular.element(document.querySelectorAll('.process-meterials-role'))[b].style.display='none';
				angular.element(document.querySelectorAll('.process-meterials-role-box'))[b].style.display='block';
				angular.element(document.querySelectorAll('.process-meterials-role-box select'))[b].focus();
			}
			$scope.MeterialsroleBlur=function(a,b){
				angular.element(document.querySelectorAll('.process-meterials-role'))[b].style.display='block';
				angular.element(document.querySelectorAll('.process-meterials-role-box'))[b].style.display='none';
			}
			
		})
myApp.directive('ngShowtree',function(){
	return {
		link : function(scope,element,attrs){
			element[0].addEventListener('click',function(e){
				var ev=e||event;
				window.event? window.event.cancelBubble = true : ev.stopPropagation();
				var thisTr=this.parentNode.parentNode.parentNode;
				thisTr.className='treeBox-hid';
			});
		}
	}
})
myApp.directive('ngHidetree',function(){
	return {
		link : function(scope,element,attrs){
			element[0].addEventListener('click',function(e){
				var ev=e||event;
				window.event? window.event.cancelBubble = true : ev.stopPropagation();
				var thisTr=this.parentNode.parentNode.parentNode;
				thisTr.className='';
			});
		}
	}
})
myApp.directive('ngTrindex',function(){
	return{
		link : function(scope,element,attrs){
			element[0].addEventListener('click',function(){
				scope.treeIndex.length=0;
				var trIndex=this.children[0].children;
				for (var i=0;i<trIndex.length;i++) {
					scope.treeIndex.push(trIndex[i].innerHTML);
				}
			})
		}
	}
})