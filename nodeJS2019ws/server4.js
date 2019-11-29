var express = require("express");
var fs = require('fs'); //  file system
var ejs = require("ejs");
var app = express();

app.use("/ejs",function(require,response){
    // read file
    fs.readFile("sample.html",'utf-8',function(error,data){
        response.send(ejs.render(data,{
            title: "ejs 연습",
            name:"홍길동",
            list: [{name:"홍길동",id:"hkd"},{name:"이순신",id:"lss"}]
        }));
    });
    
});

app.listen(52273,function(){
    console.log("서버 연결됨 http://127.0.0.1:52273")
})