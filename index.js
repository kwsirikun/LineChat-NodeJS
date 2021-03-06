const server = require('express');
const PORT = process.env.PORT || 9999;
const request = require('request');
const bodyParser = require('body-parser');
const lineMessaging = require('./src/classes/line-messaging');
const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");




firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://chatbot-eee95.firebaseio.com"
});

server()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-api running on PORT: ${ PORT }`))
    // เพิ่มส่วนของ Webhook เข้าไป
    .post('/webhook', function (req, res) {
        let replyToken = req.body.events[0].replyToken;
        let message = req.body.events[0].message.text;

        console.log(`Message token : ${ replyToken }`);
        console.log(`Message from chat : ${ message }`);
        const db = firebase.database();

        var data = '123';
        var ca = '012019243';
        // var ca = message ;


        switch (message) {

            case 'แจ้งปัญหา':

                lineMessaging.replyMessage(replyToken, 'http://ictcc/ticket-add.php').then(function (rs) {
                    console.log(`Reply message result : ${ rs }`);
                    res.json({
                        status: 200,
                        message: `Sent message!`
                    });
                });
                break;



            case 'ติดตามปัญหา':
                console.log("water")
                break;

            case 'ติดต่อเรา':

                lineMessaging.replyMessage(replyToken, 'กรุณาโทร 713-4888').then(function (rs) {
                    console.log(`Reply message result : ${ rs }`);
                    res.json({
                        status: 200,
                        message: `Sent message!`
                    });
                });
                break;




            default:

               //data = '456';

                //var request = require('request');
                //request.post({
                  // url: process.env.URL_ESERVICE,
                 
                   // form: {
                   //     req: "MEACA" + ca + "MEATSTH"
                   // }
                //}, function (error, response, body) {
                                        
               //     data = '456';
                                                      
               // });

            
                
                
                
                //////////////Reply Message /////////////
                lineMessaging.replyMessage(replyToken, data).then(function (rs) {
                    console.log(`Reply message result : ${ rs }`);
                    res.json({
                        status: 200,
                        message: `Sent message!`
                    });
                });
                ////////End of Reply Message ///////////////////////

                







        }















    })


    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
