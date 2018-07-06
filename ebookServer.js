var http=require('http');
var url=require('url');
var fs=require('fs');
var express=require('express');
var multer=require('multer');
var path=require('path');


var app=express();
var imageFile='/images/';
var img_storage=multer.diskStorage(
    {destination:function(req,file,callback){
        callback(null,'./images');
    },
    filename:function(req,file,callback){
        imageFile=imageFile+file.originalname;
        callback(null,file.originalname);
    }
});

var video_storage=multer.diskStorage(
    {destination:function(req,file,callback){
        callback(null,'./videos');
    },
    filename:function(req,file,callback){
        imageFile=imageFile+file.originalname;
        callback(null,file.originalname);
    }
});

var upload_img = multer({ storage : img_storage}).single('img');
var upload_video = multer({ storage : video_storage}).single('video');

var mime={
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript',
    mp4:'video/mp4',
}

app.get('*',function(req,res){

    var file = path.join(__dirname, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(__dirname + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
})

app.post('/upload/img',function(req,res){
    console.log('i m uploading image');
    upload_img(req,res,function(err) {  
        if(err) {
            console.log(err);  
            return res.end("Error uploading file.");  
        }
        res.end("Image is uploaded successfully!");  
    });

}); 
app.post('/upload/video',function(req,res){
    console.log('i m uploading video');
    upload_video(req,res,function(err) { 
        if(err) {
            console.log(err);  
            return res.end("Error uploading file.");  
        }
        res.end("Video is uploaded successfully!");  
    });
})

app.post('/upload/ebook',function(req,res){
    req.setEncoding('utf8')
    req.on('data',function(chunk){

        fs.writeFile('test_ebook.html',chunk,function(err){
            if(err)console.log(err);
        })
    })
})

app.listen(8000,'192.168.34.175',function(){
    console.log('server running on port: 8000');
})