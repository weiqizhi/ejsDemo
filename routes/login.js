var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	res.render('login');
})

router.post('/login',function(req,res,next){
	if(req.body.userName == req.body.password && req.body.password == "123"){
		res.send({state:1,message:'success'});
	}else{
		res.send({state:0,message:'failed'});
	}
	
})
module.exports = router; 