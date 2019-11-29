// 모듈을 변수에 저장
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

//  make web server
var server = http.createServer(function(require,response){
    //  read HTMLPage.html 
    fs.readFile('HTMLPage.html',function(error,data){   //    html정보를 읽어들여서
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end(data); //   서버로 보내버림
    });
}).listen(52273,function(){
    console.log('Server running at http://127.0.0.1:52273');
});