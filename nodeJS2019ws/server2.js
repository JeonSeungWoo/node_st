//  mysql 모듈을 사용하겠다. 
var mysql = require("mysql");

//   연결이 되면 client가 생성됨
var client = mysql.createConnection({
    user: 'root',
    password: "1234"
});

client.query("use company");

//  1번째 parameter가 쿼리문 2번째 parameter가 콜백 함수 
client.query("select * from products",function(error,result,fields){
    if(error){
        console.log(error);
    }else{
        console.log(result);
    }
})