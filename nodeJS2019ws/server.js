// 모듈 추출
var express = require('express');

//  create web server 
var app = express();

// webserver answer  
app.use(express.static("public"));//public folder 등록
//  doget(request)과 dopost(response)와 비슷함 
// app.use(function(request,response){
//     response.send("<h1>HELLO</h1>")
// })
var items = [{
    name:"우유",
    price: "2000",
},{
    name:"홍차",
    price:"5000",
},{
    name:"커피",
    price:"5000"
}];

app.all("/data.html",function(request,response){

    var output = "";
    output+="<!DOCTYPE html>";
    output += "<html>";
    output += "<head>";
    output += " <title>NODE.JS</title>";
    output += "</head>";
    output += "<body>";
    items.forEach(function(item){
        output += "<div>";
        output += "   <h1>" + item.name +"</h1>";
        output += "    <h2>" + item.price + "</h2>";
        output += "</div>";
    })
    output += "</body>";
    output += "</html>"
    response.send(output);
});
app.all("/data.json",function(request,response){
    // response.type("application/json")
    // response.send(JSON.stringify(items));

    // response.type("text/json")
    // response.send(items);

    response.send(items);
});
app.all("/data.xml",function(request,response){
    var output = "";
    output += '<?xml version="1.0" encoding = "UTF-8" ?>';
    output += '<prodoucts>';
    items.forEach(function(item){
        output += '<product>';
        output += '     <name>'+ item.name +'</name>';
        output += '     <price>'+ item.price+'</price>';
        output += '</product>'
    })
    output += '</prodoucts>';
    response.type("text/xml")
    response.send(output);
});

//  동적 라우팅
app.all("/parameter/:id",function(request,response){
    var id = request.params.id; // 보내는 쪽에서는 이름을 신경안쓰고 값만 보냄

    response.send("<h1>"+id+"</h1>");
})
app.all("/param/:id/:name",function(request,response){
    var id = request.params.id;
    var name = request.params.name;
    response.send("<h1>"+id+"</h1><h1>"+name+"</h1>"); // send는 1번만
});


//  play web server
app.listen(52273, function(){ // server를 시작시키는 것이 listen 포트번호
    console.log("서버가 시작됨 http://127.0.0.1:52273");
});