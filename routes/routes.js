var create_image = require('../config/create_image');
 
module.exports = function(app) {
    
    app.get('/' ,  function(req ,  res) {
        console.log("Get Requested");
        res.end("Node-Android-Project");
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