// var output="";
// for(var i = 0; i < 10; i++){
//     console.log(output += "*");
// }

// var os = require("os");
// console.log(os.hostname());
// console.log(os.platform());
// console.log(os.cpus());

var request = require('request');
request("http://www.google.co.kr",function(error,response,body){
    console.log(body);
});