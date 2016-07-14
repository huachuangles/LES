myApp.controller('flowcol',function($scope,$http,$interval){
	$http.get('process.json').success(function(d){
		$scope.flowData=d;
	}).error(function(e){
		console.log(e);
	});
	var timer=$interval(function(){
		if($scope.flowData){
			$interval.cancel(timer);
			$scope.setFlow($scope.flowData);
		}else{
			console.log('error');
		}
	},100)
	$scope.setFlow=function(d){//绘制流程图
		console.log(d);
		var star=new OrgNode();
		star.customParam.tit="Process";
		star.customParam.info="";
		var processItem=[],testList=[],stepList=[];
		for (var i=0;i<d.items.length;i++) {
			processItem[i]=new OrgNode();
			processItem[i].customParam.tit=d.items[i].processName;
			processItem[i].customParam.info=d.items[i].preview||'';
			star.Nodes.Add(processItem[i]);
			testList[i]=[];
			for (var k=0;k<d.items[i].testList.length;k++) {
				testList[i][k]=new OrgNode();
				testList[i][k].customParam.tit=d.items[i].testList[k].testName;
				testList[i][k].customParam.info=d.items[i].testList[k].preview||'';
				processItem[i].Nodes.Add(testList[i][k]);
			}
		}
		
		var OrgShows=new OrgShow(star);
		OrgShows.Top=10;
		OrgShows.Left=50;
		OrgShows.IntervalWidth=10;
		OrgShows.IntervalHeight=20;
		OrgShows.BoxTemplet="<div id=\"{Id}\" class=\"OrgBox\"><span>{tit}</span><div>{info}</div></div>"
		OrgShows.Run()
	}
})
