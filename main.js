var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');
    imageDir = 'static/img/';

//create http server listening on port 3333
http.createServer(function (req, res) {
    //use the url to parse the requested url and get the image name
    var query = url.parse(req.url,true).query;
        pic = query.pic;
        thumbnail = query.thumbnail;
        console.log(`pic ${pic}`);
        console.log(`thumbnail ${thumbnail}`);
    if (!thumbnail)
    {
        if (!pic) {
            pic = 'default';
        } else 
        {
            pic = 'spot'+ pic.charAt(pic.length-1);
        }   
    } else {
            pic = 'thumbnails/spot'+ thumbnail.charAt(thumbnail.length-1);
    }
    //read the image using fs and send the image content back in the response
    fs.readFile(imageDir + pic + ".jpg", function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'});
            console.log(err);
            res.end("No such image");    
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }
    });
}).listen(3333);

console.log("Server running at http://localhost:3333/");