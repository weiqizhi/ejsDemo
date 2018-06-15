jQuery(document).ready(function(){
	$("#mybutton").click(function(){
			$("#hidep").hide();
		})
		
	$("#pd").click(function(){
		var json = {"name":"wqz","old":"18"};
		$.ajax({
			type:'post',
			url : '/test',
			dateType : 'json',
			data : json,
			async:false,
			success:function(request){
				alert('post success');
			},
			error:function(err){
				alert(JSON.stringify(err));
			}
			
		})
	})
	
	
	$("#jumpTo").click(function(){
		window.location.href = "/test/jump";
	})
	
	
	$("#jumpTo2").click(function(){
		postJson('/test/jumpTo2',' ',function(){
			
		})
	})
	/**
	 *上传图片
	 *before submit execute click action
	 */
	 $("#btnSub").click(function(){
		 var fulAvatarVal = $("#fulAvatar").val();
		 if(fulAvatarVal.length == 0){
			 alert('请选择要上传的文件');
			 return false;
		 }
		 return true;
	 })
	
	//post数据函数接口
	function postJson(url,data,callback){
		var json = data;
		$.ajax({
			type:'post',
			url : url,
			dateType : 'json',
			data : 'json',
			async : false,
			success : function(res){
				callback(res);
			},
			error : function(err){
				callback()
			}
		})
	}
	
	/*
	 *bootstrap-table
	 */
	$("#search").click(function(){
		//$('#table').bootstrapTable('refreshOptions',{pageNumber:1,pageSize:10});//解决可能出现的一个问题便可以了
		$("#table").bootstrapTable("refresh","/test/search");
		//document.getElementById("showText").innerText = JSON.stringify(response);
		//$("#table").bootstrapTable("load",response);  //载入数据
		//$(‘#mytab’).bootstrapTable(‘refreshOptions’,{pageNumber:1,pageSize:10});//解决可能出现的一个问题便可以了
			
		
	})
	
	//启用bootstrap-table
	$("#table").bootstrapTable({
		toolbar:"#toolbar",
		toolbarAlign:"right",    //
		//showRefresh:true,	    //显示刷新
		striped:true,           //隔行变色
		url:"/test/search",
		method:'post',
		//contentType: "application/x-www-form-urlencoded",//必须要有！！！！
		queryParams:queryParams,
		search:false,
		columns :[{
			field:"id",
			title:"title ID"
		},{
			field:"title",
			title:"title Name"
		},{
			field:"date",
			title:"other Param"
		}],
		data:[{
			id:1,
			name:"Item1",
			param1:"80px"
		},{
			id:2,
			name:"Item2",
			param1:"90cm"
		}]
	})
	
	function queryParams(params){          //params参数是table提供的
	  params.param1 = $("#searchInput").val();  //  
      params.name = "I love";   
      return params;    
	}
	
})





















