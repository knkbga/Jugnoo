var text2png = require('text2png');
var fs = require('fs');
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP",{
    auth: {
			user: "bagga.kanak1@gmail.com",
			pass: "1Direction"
        }
});

exports.create_image =function(email,quote,option,callback){
	
	console.log("\n\noption:\t"+JSON.stringify(option));
	
//	fs.writeFileSync('output.png', text2png(quote, {textColor: 'blue',font: '80px Futura',bgColor: 'white',padding: 130}));
	fs.writeFileSync('output.png', text2png(quote, 
				{
					font : option.font,
					textColor : option.textColor,
					bgColor : option.bgColor,
					lineSpacing : parseInt(option.lineSpacing),
					padding : parseInt(option.padding),
					
				}
				));
	
	var mailOptions = {
				from: "<bagga.kanak1@gmail.com>",
				to: email,
				subject: "Converted Image",
				text: "Picture with written code is attached with this email.",
				attachments: [
				{
					filename: 'Output.png',
					path: __dirname+'/output.png'
				}]
			};

	smtpTransport.sendMail(mailOptions, function(error, response)
	{
		if(error)
		{
			console.log("Email not sent");
			callback({'response':"Error While sending email. Try Again !",'success':false});
		}
		else
		{
			callback({'response':"Check your Email.",'success':true});
		}
	});
};

