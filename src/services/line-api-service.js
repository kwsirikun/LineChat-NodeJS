const request = require('request');
const apiToken = 'bK9JGXo5u4sFzy0dT0G/nHoCWCex4eevXxRxaP8YkvlJZiOUIYdlRqk2PBBV6U/9dZP3mQd1Vy7E38DpT0NcnkvV6Fdo3x0LytmLq0DvbExVJAS0PIm2PQGX2IuCRmd53jmcPUCqwE9J2Qi0Q1kyZgdB04t89/1O/w1cDnyilFU=';
const apiRoute = 'https://api.line.me/v2/bot/message/reply';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + apiToken
};

class LineAPIService {
	constructor() {}
    
    reply(replyToken, messages) {
        return new Promise(function (resolve, reject) {
            try {
                let body = JSON.stringify({
                    replyToken: replyToken,
                    messages: messages
                })
                return request.post({
                    url: apiRoute,
                    headers: headers,
                    body: body
                }, (err, res, body) => {
                    console.log('status = ' + res.statusCode);
                    return resolve(res.statusCode);
                });
            }
            catch (e) {
                return reject(e);
            }
        });
    }
}
module.exports = new LineAPIService();
