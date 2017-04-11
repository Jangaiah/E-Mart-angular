var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 2020,
    users=[{"username":"admin","password":"admin"}];

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
  
    , filename = path.join(process.cwd(), uri);   
    
function checkUsers(name){
    var i=0;
    for(i=0;i<users.length;i++){ if(name == users[i].username) return i;}
    return -1;
}
  
 var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript",
    '.jpg': 'image/jpeg'
  };
    if(request.method == 'POST'){
        var body="",temp;
        request.on('data',function(data){body+=data;});
        request.on('end',function(){
            temp=JSON.parse(body);
            setTimeout(function(){
            if(temp.signUp){
                if(checkUsers(temp.username)==-1){
                users.push({"username":temp.username,"password":temp.password});
                console.log("\n\nRegistered Users \n",users);
                response.writeHead(200);
                response.write("Sucess");
                response.end();
                }else{response.writeHead(401);response.end();}
            }else{
                var i=checkUsers(temp.username);
                if(i>=0 && temp.u){
                    response.writeHead(200);
                    response.write("Sucess");
                    response.end(); 
                }
                else if(i>=0 && temp.p && temp.password == users[i].password){
                response.writeHead(200);
                response.write("Sucess");
                response.end();                   
            }else{response.writeHead(401);response.end();}
            }},500);
            });
        request.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        
    }else{
  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += 'public/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });
  }); 
    }
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");