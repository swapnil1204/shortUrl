const express = require('express')
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/url');

//@route POST /api/url/shorten
//@desc to create short url

router.post('/shorten',async (req,res) => {
    const { longUrl } = req.body;
    //const baseUrl = config.get('baseUrl'); 
    const baseUrl = "http://localhost:4000";
    console.log("hello ");

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('invalid base url');
    }

    //create short id
    const urlCode = shortid.generate();

    //long url
    if(validUrl.isUri( longUrl )){
        try {
            let url = await Url.findOne({ longUrl });
            if(url){
                res.json(url);
            }else{
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date : new Date()
                });
               await url.save();
               res.json(url);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('server error');
        }
    } else{
         res.status(500).json('long url is not valid');
    }

});

module.exports = router;