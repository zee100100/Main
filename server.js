/*
 * Write your server code in this file.

Name: Ziyad Alghanmi
onid: alghanmz@oregonstate.edu
GitHub username: zee100100

 */

  var fs = require("fs");
  var http = require("http");
  var port = process.env.port || 3000;

  function requestHandler (req, res){

    console.log("method:", req.method);
    console.log("url:", req.url);
    var theWeb = req.url.replace('/','');
    console.log(theWeb);

    var public = 'public/';

    if ( theWeb.match('^public/') ){

      theWeb = theWeb.replace(public,'');

    }


    if ( theWeb == 'index.html'){

      var fileRead = fileCache (public+theWeb);
      res.writeHead(200,{
        'Content-Type':'text/html'

      });

      console.log('read '+fileRead);
      res.write(fileRead);
      res.end();

    }

    else if (theWeb == 'index.js'){

      var fileRead = fileCache (public+theWeb);
      res.writeHead(200,{
        'Content-Type':'text/js'
      });
      res.write(fileRead);
      res.end();
    }

    else if (theWeb == 'style.css'){

      var fileRead = fileCache (public+theWeb);
      res.writeHead(200,{

          'Content-Type':'text/css'

        });

        res.write(fileRead);
        res.end();
    }

    else if (theWeb == ''){
      console.log(req.url);
      var fileRead = fileCache ('public/index.html');
      res.writeHead(200,{
        'Content-Type':'text/html'
      });

      res.write(fileRead);
      res.end();

    }

    else {

      if ( fs.existsSync (public+theWeb) ){

        var fileRead = fileCache (public+theWeb);
        res.writeHead(200,{

            'Content-Type':'text/html'

          });
        res.write(fileRead);

      } else {

      var fileRead = fileCache ('public/404.html');
      res.writeHead(404,{
        'Content-Type':'text/html'
      });
      res.write(fileRead);
    }


      res.end();

    }

  }

    var cache = {};

    function fileCache (fileName){

      if ( cache[fileName] !== undefined){

        console.log('using cache for '+fileName);
        return cache[fileName];

      }

      var contents = fs.readFileSync(fileName ,'utf8');

      cache[fileName] = contents;

      return contents;

    }

    var server = http.createServer(requestHandler);

    server.listen(port, function (err) {

    console.log("Server running on port "+port);

     });

