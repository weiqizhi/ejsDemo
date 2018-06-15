var fs = require('fs');

function getJson (filePath,key){
	try{
		var configFile = fs.readFileSync(filePath,'utf-8');
		var fileJson = JSON.parse(configFile);
	}catch(err){
		
	}
	return fileJson[key];
}

exports.getJson = getJson;