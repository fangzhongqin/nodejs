const joinPath=require('path').join //加载JoinPath进行路径的拼接
const fs=require('fs')
const mime=require('mime')

const publicPath=joinPath(__dirname,'../public')
console.log(publicPath)
module.exports=function(req,res){
    var path=req.params[1]
    path=joinPath(publicPath,path)
    fs.readFile(path,function(err,data){ //读取path路径下的文件内容
    	if(err){
    		if(errCode='ENOENT'){
    			res.writeHead(404)
    			res.end('Not Found')
    			return
    		}
    		res.writeHead(500)
    	    res.end(err.message)
    	}
    	var mimeType=mime.lookup(path)
    	var charset=mime.charsets.lookup(mimeType)
    	console.log('mimeType',mimeType,'charset',charset)
    	res.setHeader('Content-Type',+mimeType+(charset?';charset:='+charset:''))
    	res.end(data)
    })
}