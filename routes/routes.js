'use strict';

var create_image = require('../config/create_image');
var fs = require('fs');
var text2png = require('text2png');
var express = require('express');
var path = require('path');

module.exports = function(app) {
    
    app.get('/' ,  function(req ,  res) {
				
		var option = new Object();
		var quote;
		
		if(req.query.font!=null){
			option.font = req.query.font;
		}
		if(req.query.textColor!=null){
			option.textColor = req.query.textColor;
		}
		if(req.query.bgColor!=null){
			option.bgColor = req.query.bgColor;
		}
		if(req.query.lineSpacing!=null){
			option.lineSpacing = parseInt(req.query.lineSpacing);
		}
		if(req.query.padding!=null){
			option.padding = parseInt(req.query.padding);
		}else{
			option.padding = 100;
		}
		
		if(req.query.quote==null){
			quote = "Quote missing"
		}else{
			quote = req.query.quote;
		}
		
		fs.writeFileSync(__dirname+'/../public/output.png', text2png(quote,option));
		
		res.sendFile(path.join(__dirname+"/../public/output.png"),function(err){
			if(err){
				console.log("Error occured");
				res.end("Error");
			}
		});
    });
	
	app.post('/create_image' , function(req , res){
        console.log("In create_image \t"+JSON.stringify(req.body));
        var email = req.body.email;
        var quote = req.body.quote;
        var option = req.body.option;
		        
        create_image.create_image(email , quote , option , function (found) {
            console.log(found);
            res.json(found);
        });
    });
};