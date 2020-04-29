const express = require('express')
const router = express.Router();
const Url = require('../models/url');

//@route GET /:code
//@desc  redirect to long/original url

router.get('/:code',async(req,res) => {
    try {
        const url = await Url.findOne({ urlCode : req.params.code});
        if(url){
            res.redirect(url.longUrl);
        }else{
            res.status(404).json('No url found ')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('server error');
    }
})

module.exports = router;