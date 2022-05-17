const express = require('express');
const bodyParser = require('body-parser'); // post 사용하기 위해 사용
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    res.render('index');
});

app.post('/', function(req, res){
    var tkidx = req.body.tkidx;
    var name = req.body.name;
    var description = req.body.description;
    var img = req.body.img;
    var aniUrl = req.body.aniUrl;
    var creator = req.body.creator;
    var productType = req.body.productType;

    var metadata = {
        "name":name,
        "description":description,
        "image":img,
        "external_url":"https://aftmarket.tv/",
        "animation_url":aniUrl,
        "animation_type":"cmaf",
        "attributes":[
            {
                "trait_type":"Creator",
                "value":creator
            },
            {
                "trait_type":"Product type",
                "value":productType
            }
        ]
    }

    fs.writeFile(tkidx + '.json', JSON.stringify(metadata), function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })
})

app.listen(3000, function(){
    console.log('Connectec 3000 port!')
});
