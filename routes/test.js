var express = require('express');
var path =require('path');
var util = require('util');
var fs = require('fs');
var url = require('url');
var router = express.Router();
var mysqldb = require('../database/mysql.js');

/**
 *upload file need
 */
var formidable = require('formidable');
 
//use log4js
var log4js = require('../log/log4.js');
const logger = log4js.getLogger()//使用default的，默认用于debug
const mLogger = log4js.getLogger('module');  //可使用debug、info、warn、error
const vLogger = log4js.getLogger('view');
const cLogger = log4js.getLogger('control');
logger.debug('打印调试信息');

mLogger.error('error in module');
vLogger.info('info in view');
cLogger.warn('warn in control');

var testUtil = util.format('weiqizhi test %s','nihao'); 

console.log(testUtil);
/**
 *use 数据库模块
 *
 */
//var mysql = mysqldb.connection();
//执行插入
/*var insSql = 'INSERT INTO mytable(title,date) VALUES (?,?)';
var insParam = ['test insert','2018-05-01'];
mysql.query(insSql,insParam,function(err){
	if(err){
		console.log('test insert error');
	}else{
		console.log('test insert success');
	}
})*/

router.get('/',function(req,res,next){
	res.render('test',{title:'My test page'});
})

router.post('/',function(req,res,next){
	console.log(JSON.stringify(req.body));
	res.send({state:'ok',message:'收到'});
})

router.all('/jump',function(req,res,next){
	console.log('收到');
	res.render('jump',{title:'跳转'});
})

router.post('/jumpTo2',function(req,res,next){
	console.log('收到请求');
	res.render('jump',{title:'后台控制跳转'});
})
router.post('/search',function(req,res,next){
	console.log(req.body);
	var selSql = "SELECT *FROM mytable WHERE id = ?";
	
	console.log(req.body.param1);
	var param = [req.body.param1];
	mysql.query(selSql,param,function(err,result){
		if(err){
			console.log(err.message);
		}else{
			res.send(result);
			console.log(result);
		}
	})
})

router.post('/upload',function(req,res,next){
	var form = new formidable.IncomingForm();  //创建上传表单
	form.encoding = 'utf-8';  					//设置编码
	form.uploadDir = 'public/images';    		//设置上传目录
	form.keepExtensions = true;    				//保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024;		//文件大小
	form.parse(req,function(err,fields,files){
		if(err){
			res.send({state:'505',message:'form.parse() error'});
		}
		
		var fileTmpName = files.fulAvatar.path;
		console.log(fileTmpName);
		var newPath = form.uploadDir + '/' + Date.now() + path.parse(fileTmpName).base;
		console.log(newPath);
		fs.renameSync(files.fulAvatar.path,newPath);   //文件重命名
	});
	res.send({state:'200',message:'success'});
	
})


module.exports = router;







