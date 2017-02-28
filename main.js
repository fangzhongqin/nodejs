var http=require('http')
var controllers=require('./controllers')
var parseURL=require('url').parse

function notFoundController(req,res){
	res.writeHead(404)
	res.end('404')
}
function find(arr,match){
    for(var i=0;i<arr.length;i++){
    	if(match(arr[i])) {
    		return arr[i]
    	}
    }
}
const rules=[
	{path:'/',controller:controllers.home},
	{path:'/user',controller:controllers.user},
	{path:'/static/',controller:controllers.static}
]

var server=http.createServer(function(req,res){
	var UrlInfo=parseURL(req.url);
	var rule=find(rules,function(rule){
		return rule.path==UrlInfo.pathname
	})
	var controller=rule&&rule.controller||notFoundController
	controller(req,res)
})

server.listen(3000)
console.log('server run at 127.0.0.1:3000')