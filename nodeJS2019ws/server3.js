var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

var client = mysql.createConnection({
    user : "root",
    password : "1234",
    database : "company" // companyDB를 연결하면서 선택함
});

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));

//  라우팅
//  목록
app.get("/products",function(request,response){
    client.query("select * from products",function(error,data){
        response.send(data);
        // var query="update product set name='hkd',series='211121',";
        // console.log(query.substr(query.lastIndexOf(",")));
    });
});

//  상세보기
app.get("/products/:id",function(request,response){});

//  등록
app.post("/products",function(request,response){
    // 변수 선언
    var name = request.body.name;
    var modelnumber = request.body.modelnumber;
    var series = request.body.series;

    //  db요청 수행
    client.query('insert into products(name,modelnumber,series)values(?,?,?)',
    [name,modelnumber,series],function(error,data){
        console.log(data);
        response.send(data);
    });
});

//수정
app.put("/products/:id",function(request,response){
    // 변수선언
    var id = Number(request.params.id); // 매개변수로 받은것
    var name = request.body.name; // form에 입력된 정보를 받은것 
    var modelnumber = request.body.modelnumber;
    var series = request.body.series;
    var query = "UPDATE products SET ";
    
    //  쿼리 생성
    if(name){
        query += "  naem ='"+name+"' ,";
    }
    if(modelnumber){
        query += "  modelnumber ='"+modelnumber+"' ,";
    }
    if(series){
        query += "  series ='"+series+"' ,";
    }
    query = query.substr(0,query.lastIndexOf(','));
    
    query += " where id"+id;

    console.log(query);

    client.query(query,function(error,data){
        response.send(data);
    })

});

//삭제
app.delete("/products/:id",function(request,response){
    var id = Number(request.params.id);

    client.query("delete from products where id = ?",[id],function(){})
    response.send(data);
});

app.listen(52273,function(){
    console.log("Connected http://127.0.0.1:52273")
})