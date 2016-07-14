myApp.controller('detailsInfo',function($scope,$compile,$rootScope){
	$scope.dateVerification='-- '+$scope.lang.noSignatureRequired+' --';
	$scope.outOfLimits='-- '+$scope.lang.noSignatureRequired+' --';
	$scope.dateEntry='-- '+$scope.lang.noSignatureRequired+' --';
	$scope.dateModdification='-- '+$scope.lang.noSignatureRequired+' --';
	$scope.reportTemplate='Recipe Datails';
	$rootScope.detailName;
	$rootScope.detailDescription;
	
	$scope.minDate=new Date();//日期控件能选择的最小时间
	/*Effective Date部分日期控件*/
	$scope.effectiveDate = new Date();
	$scope.effectiveSelShow = false;
	$scope.$watch('effectiveDate', function() {
		$scope.effectiveSelShow = false;
	})
	$scope.showEffectiveSel = function() {
		$scope.effectiveSelShow = !$scope.effectiveSelShow;
	}
	/*Effective Date部分日期控件*/
	$scope.expirationDate = new Date();
	$scope.expirationSelShow = false;
	$scope.$watch('expirationDate', function() {
		$scope.expirationSelShow = false;
	})
	$scope.showExpirationSel = function() {
		$scope.expirationSelShow = !$scope.expirationSelShow;
	}
	/*点击页面其他地方隐藏日期控件*/
	$scope.hidDateSel=function($event){
		var str=$event.target.outerHTML.split(" ")[0].slice(1).split(">")[0];
		if(str=="div"||str=="span"||str=="input"||str=="textarea"||str=="select"||str=="td"){
			$scope.effectiveSelShow = false;
			$scope.expirationSelShow = false;
		}
	}
	
	$scope.thisTr;
	$scope.thisTd;
	/*新增表格行   */
	$scope.addTableItem=function(){
		var html="<div class='details-body-extended-table-tr' ng-getelement>"
					+"<div class='details-body-extended-table-td' ng-dblclicktd ng-dblclick='tdInpStart()'>"
					+"测试"
					+"</div>"
					+"<div class='details-body-extended-table-td' ng-dblclicktd ng-dblclick='tdInpStart()'></div>"
				+"</div>";
		var template = angular.element(html);
		var mobileDialogElement = $compile(template)($scope);
		angular.element(document.querySelector('.details-body-extended-table .details-body-extended-table-tbody')).append(mobileDialogElement);
	}
	/*点击表格开始输入*/
	$scope.tdInpStart=function(){
//		console.log($scope.thisTd.children);
		if($scope.thisTd.children.length==0){
			var tdVal=$scope.thisTd.innerHTML;
			$scope.thisTd.innerHTML='';
			var html="<input type='text' class='td-change-inp' autofocus='autofocus' ng-blurinp/>"
			var template = angular.element(html)[0];
			var mobileDialogElement = $compile(template)($scope);
			angular.element($scope.thisTd).append(mobileDialogElement);	
			console.log(template);
			template.focus();
			template.value=tdVal;
		}
		
	}
	/*删除选中表格行*/
	$scope.removeTableItem=function(){
		$scope.thisTr.remove();
	}
	
});
myApp.directive('ngGetelement',function(){
	return {
		link : function(scope,element,attrs){//选中表格行
			element[0].addEventListener("click",function(){
				scope.thisTr=this;
				var silbing=this.parentNode.children;
				for(var i=0;i<silbing.length;i++){
					silbing[i].style.backgroundColor='';
				}
				this.style.backgroundColor='#eff8fc';
			})
		}
	}
});
myApp.directive('ngDblclicktd',function(){
	return {
		link : function(scope,element,attrs){
			element[0].addEventListener('dblclick',function(){
				scope.thisTd=this;
			});
		}
	}
})
myApp.directive('ngBlurinp',function(){
	return{
		link : function(scope,element,attrs){
			element[0].addEventListener('blur',function(){
				var thisVal=this.value;
				this.remove();
				scope.thisTd.innerHTML=thisVal;
			});
		}
	}
})
