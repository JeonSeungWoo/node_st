// 2019-11-29 nodejs 채팅 프로그램

//모듈을 추출합니다
var http = require('http');
var fs=require('fs');
var socketio=require('socket.io');

//웹서버 생성
var server = http.createServer(function(request,response){
    //HTMLPage.html파일읽기
    fs.readFile('HTMLPage.html',function(error,data){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end(data);
    });
}).listen(52273,function(){
    console.log('Server running at http://127.0.0.1:52273');
});

//소켓서버만들기
var io=socketio.listen(server);
io.sockets.on('connection',function(socket){
    //클라이언트의 메시지수신
    socket.on('message',function(data){
        //모든 클라이언트에게 메시지 전송
        io.sockets.emit('message',data);
    });
});