const log4js = require('log4js')
 
log4js.configure({
    replaceConsole: true,
    appenders: {
        stdout: {//控制台输出
            type: 'stdout'
        },
		debug : {
			type : 'dateFile',
			filename : './logs/debug/',
			pattern : 'debug-yyyy-MM-dd.log',
			alwaysIncludePattern : true
		},
        module: {//调试日志
            type: 'dateFile',
            filename: './logs/moudlelog/',
            pattern: 'm-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        view: {//错误日志
            type: 'dateFile',
            filename: './logs/viewlog/',
            pattern: 'v-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        control: {//常规日志
            type: 'dateFile',
            filename: './logs/controllog/',
            pattern: 'c-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['stdout', 'debug'], level: 'debug' },//appenders:采用的appender,取appenders项,level:设置级别
		module : {appenders: ['module'],level : 'debug'},
		view: { appenders: ['view'], level: 'debug' },
        control: { appenders: ['control'], level: 'debug' }
    }
})
 
 
exports.getLogger = function (name) {//name取categories项
    return log4js.getLogger(name || 'default')
}
 
exports.useLogger = function (app, logger) {//用来与express结合
    app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'//自定义输出格式
    }))
}