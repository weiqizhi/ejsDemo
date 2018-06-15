jQuery(document).ready(function(){
	
	//用户名
	var userName = document.getElementById("username");
	//密码
	var password = document.getElementById("password");
	
	
	$("#loginBtn").click(function(){

		var postData = {
		   userName:userName.value,
		   password:password.value
		};
		
		app.postJson("/login/login",postData,function(state,res){
			//state为1，标识post成功
			if(state && res.state){
				//alert("登录成功！");
				window.location.href = "/homepage"
			}else{
				alert("登录失败");
			}
		})
	})
})
