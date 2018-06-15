/**
 *
 *
 */

(function(owner){
	owner.postJson = function(url,data,callback){
		$.ajax({
			type:'post',
			url : url,
			dateType : 'json',
			data : data,
			async : false,
			success : function(res){
				callback(1,res);
			},
			error : function(err){
				callback(0,err);
			}
		})
	}
}(window.app = {}))     //加上(window.app = {})则在其他文件就可以使用app.function来调用改文件下的函数，否则提示app undefined

