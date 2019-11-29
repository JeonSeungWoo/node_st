// 모듈을 추출합니다.
var fs = require('fs'); // file system
var ejs = require('ejs'); // ejs template
var mysql = require('mysql'); 
var express = require('express');
var bodyParser = require('body-parser');

// Connection Database
var client = mysql.createConnection({
    user : 'root',
    password : '1234',
    database : 'Company'
});

// server생성
var app = express();
app.use('/css',express.static('css')); //    use css folder
app.use(bodyParser.urlencoded({extended:false}));

// palay server
app.listen(52273,function(){
    console.log('server running at  http://127.0.0.1:52273');
})

//  라우트(url 이동)를 수행합니다.
app.get('/',function(request,response){
    //  read file
    fs.readFile('board_list.html','utf8',function(error,html){
        // play database query
        client.query('select*from board order by id desc',function(error,results){
            response.send(ejs.render(html,{
                data:results
            }));
        });
    });
});

// 등록을 클릭했을때 
app.get('/insert',function(request,response){
    // read file 
    fs.readFile('board_insert.html','utf8',
    function(error,html){
        //응답해랏!
        response.send(html);
    });
});

//form에 데이터 입력후 submit버튼을 눌렀을 때
app.post('/insert',function(request,response){
    //create variable
    var body = request.body;
    var d = new Date();
    var year = d.getFullYear(); 
    var month = d.getMonth()+1;
    var date = d.getDate();
    if(month<10){
        month = "0" + month;
    }
    if(date<10){
        date = "0" + date;
    } 
    var ymd = year + "-" + month + "-" + date;

    // play database query
    client.query ('insert into board (title,content, wdate) values(?,?,?)',[
        body.title, body.content,ymd
    ],function(){
        // 응답합니다.
        response.redirect('/'); //  목록으로 이동
    });
});

//  edit link를 클릭했을 때
app.get('/edit/:id',function(request,response){
    //read file
    fs.readFile('board_edit.html','utf8',function(error,html){
        //play dbquery
        client.query('select*from board where id = ?',[
            request.params.id
        ],function(error,result){
            //응답
            response.send(ejs.render(html,{
                data:result[0] // 한 건을 봐야 하기 때문에 인덱스로 넘겨야함(얘는 배열이라서)
            }));
        });
    });
});

//edit form에 데이터 입력후 submit을 클릭했을 때
app.post('/edit/:id',function(request,response){
    // create variable
    var body = request.body;

    // play DB qudry
    client.query('update board set title = ?, content=? ,wdate=? where id =?',[
        body.title, body.content, body.wdate, request.param('id')
    ],function(){
        //anwer
        response.redirect('/');
    })
})

//title link click
app.get('/content/:id',function(request,response){
    //read file
    fs.readFile('board_content.html','utf8',function(error,html){
        //play dbquery
        client.query('select*from board where id = ?',[
            request.params.id
        ],function(error,result1){
           client.query(
               'select*from board_repl where parent_id=?',
               [
                   request.param('id')
               ],
               function(error,result2){
                   // answer
                   response.send(
                       ejs.render(html,{
                           data:result1[0],
                           data2:result2
                       })
                   );
               })
        });
    });
});

//  delete
app.get('/delete/:id',function(request,response){
    // play dbqeury
    client.query('delete from board where id = ?',
        [request.param('id')],function(){
            // anwser
            response.redirect('/');
        })
})






