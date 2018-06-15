var mysql = require('mysql');
var path = require('path');
var util = require('util');
var config = require('../config/config.js');

//读取数据库配置信息
const current_diretory = path.dirname(__dirname);
var sqlConfig = config.getJson(current_diretory + '/config/config.json','db');
var host = sqlConfig.localhost;
var us = sqlConfig.user;
var pw = sqlConfig.password;
var db = sqlConfig.database;

var connectDB = '';
exports.connection = function(){
	try{
		connectDB = mysql.createConnection({
			host : host,
			user : us,
			password : pw,
			database : db
		})
		connectDB.connect();
		console.log('====数据库连接成功! database :'+db+'====');
		//excute create table
		createTable();
	}catch(err){
		
	}
	return connectDB;
}


function createDatabase(){
	
}


function createTable(){
	try{
		var insSql = 'CREATE TABLE IF NOT EXISTS mysql2 (id int)';
		var creaSql = 'CREATE TABLE IF NOT EXISTS mytable '
			+' (id INT UNSIGNED AUTO_INCREMENT,'    //自增，UNSIGNED 非负
			+'title VARCHAR(100) NOT NULL,'			//非空
			+'date DATE,'
			+'PRIMARY KEY(id))ENGINE=InnoDB DEFAULT CHARSET=utf8';  //ENGINE指定存储引擎 CHARSET 设置字符集
		connectDB.query(creaSql,function(err){
			if(err){
				console.log('创建失败');
				console.log(err);
			}else{
				console.log('创建成功');
			}
		})
	}catch(err){
		console.log(err.message);
	}
	
}