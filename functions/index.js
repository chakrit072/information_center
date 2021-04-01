
const region = 'asia-northeast1';
const functions = require('firebase-functions');
const request = require('request-promise');
const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_HEADER = {
    "Content-Type": "application/json",
    "Authorization": "Bearer etg6oeEwLoqqcUqXxpasDLYj3H0OE7ht55hmckH3ijLeA/dkXAXN5oIy6Nvn1jQzi9j6OfGZVZ39uM7eGghj7cyVtIjck0UVOv5u9hsmpEqZbY1DnYYwEp51ScpoMKzNjk1aR1ZlY5ECuwv3Wk7RpQdB04t89/1O/w1cDnyilFU="
};
const DATABASE_API = "https://sheet.best/api/sheets/3a6d321c-131d-4b94-8c62-16da51d15b34/tabs"
const DATABASE_HEADER = {
    "Content-Type": "application/json",
    "x-api-key": "NQ_ZPNNDxTAuAV#yhEYNP97CqrBJHbif-rDPlm8Q5tbwegaFji36bz!hQAo$hO8P"
};
const dialogflow = require('dialogflow')
const projectId = 'newagent-ogindf'
const sessionClient = new dialogflow.SessionsClient({
    projectId,
    keyFilename: 'dialogflow-service-account.json',
})

exports.webhookDetectIntent = functions.region(region).https.onRequest(async (req, res) => {
    console.log('debugevents: '+JSON.stringify(req.body.events[0]))
    if (req.body.events[0].type !== 'message') {
        return
    }
    if (req.body.events[0].message.type !== 'text') {
        return
    }
    
    const event = req.body.events[0]
    const userId = event.source.userId
    const message = event.message.text
    const keymessage = message.charAt(0)
    const message_cut = message.slice(1);

    console.log('message_cut: '+JSON.stringify(message_cut))

    // query database ที่ดัก message แลัวตัดเอาตัวแรกที่เป็น '!'= newdata,'$' = location,'&'= contact แล้วไป query data
    if(keymessage === '!'){
        const get_data = await request({
            method: "GET",
            uri: `${DATABASE_API}/LocationPlan/Id/${message_cut}`,
            headers: DATABASE_HEADER,
        })

        if(get_data){
            console.log('apidata: '+JSON.stringify(get_data))
            const flextemplate = require('./flextemplate')
            const resultmessage = flextemplate.flexlocation(get_data)
            console.log('resultmessage: '+JSON.stringify(resultmessage))
    
            request({
                method: "POST",
                uri: `${LINE_MESSAGING_API}/reply`,
                headers: LINE_HEADER,
                body: JSON.stringify({
                    "type": "template",
                    "altText": "this is an image carousel template",
                    "template": {
                        "type": "image_carousel",
                        "columns": resultmessage
                    }
                })
            })
            
            
            res.status(200).end()
        }
        return 
    }

        
    if(keymessage === '&'){
        // const get_data_all = await request({
        //     method: "GET",
        //     uri: `${DATABASE_API}/Contact`,
        //     headers: DATABASE_HEADER,
        // })
    
        // const get_province = get_data_all.filter(x=>x.Province= message_cut)
    
            
        const get_data = await request({
            method: "GET",
            uri: `${DATABASE_API}/Contact/Id/${message_cut}`,
            headers: DATABASE_HEADER,
        })

        // if(get_province){
        //     console.log('apidata: '+JSON.stringify(get_province))
        //     const flextemplate = require('./flextemplate')
        //     const resultmessage = flextemplate.flexcontact(get_province)
        //     console.log('resultmessage: '+JSON.stringify(resultmessage))
        
        //     request({
        //         method: "POST",
        //         uri: `${LINE_MESSAGING_API}/reply`,
        //         headers: LINE_HEADER,
        //         body: JSON.stringify({
        //             replyToken: event.replyToken,
        //             messages: resultmessage
        //         })
        //     })
                
        //     res.status(200).end()
        // }


        if(get_data){
            console.log('apidata: '+JSON.stringify(get_data))
            const flextemplate = require('./flextemplate')
            const resultmessage = flextemplate.flexcontact(get_data)
            console.log('resultmessage: '+JSON.stringify(resultmessage))
        
            request({
                method: "POST",
                uri: `${LINE_MESSAGING_API}/reply`,
                headers: LINE_HEADER,
                body: JSON.stringify({
                    replyToken: event.replyToken,
                    messages: resultmessage
                })
            })
                
            res.status(200).end()
        }
        return 
    }
  
    // if(keymessage === '&'){

    // }

    const intentResponse = await detectIntent(userId, message, 'th')
    const structjson = require('./structjson');
    const intentResponseMessage = intentResponse.queryResult.fulfillmentMessages
    const replyMessage = intentResponseMessage.map( (messageObj) => {
    let struct
    if (messageObj.message === "text") {
        
        return {type: "text", text: messageObj.text.text[0] }
        } else if(messageObj.message === "payload") {
            struct = messageObj.payload
            return structjson.structProtoToJson(struct)
        }
         return null
    })

    console.log('replyMessage : '+JSON.stringify(replyMessage))
    request({
        method: "POST",
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: event.replyToken,
            messages: replyMessage
        })
    })
    
    res.status(200).end()
})

const detectIntent = async (userId, message, languageCode) => {
    const sessionPath = sessionClient.sessionPath(projectId, userId)

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
    }
    const responses = await sessionClient.detectIntent(request)
return responses[0]
}
