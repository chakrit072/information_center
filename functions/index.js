const provinces = require('./provinces.json');
const region = 'asia-northeast1';
const functions = require('firebase-functions');
const request = require('request-promise');
const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_HEADER = {
    "Content-Type": "application/json",
    "Authorization": "Bearer etg6oeEwLoqqcUqXxpasDLYj3H0OE7ht55hmckH3ijLeA/dkXAXN5oIy6Nvn1jQzi9j6OfGZVZ39uM7eGghj7cyVtIjck0UVOv5u9hsmpEqZbY1DnYYwEp51ScpoMKzNjk1aR1ZlY5ECuwv3Wk7RpQdB04t89/1O/w1cDnyilFU="
};
const DATABASE_API = "https://sheet.best/api/sheets/a89c093d-1ae5-476c-acc4-9dc599153fae/tabs"
const DATABASE_HEADER = {
    "Content-Type": "application/json",
    "x-api-key": "5VEIa9NMHRVVTSN3Z%2RR4kRgBcHs9_-tGPHwZ%Qov_rgF6$juQA--Fg@BhGR85R"
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

    if(message === 'imcContact'){

        if(message){
            console.log('apidata: '+JSON.stringify(message))
            // const provincesjs = JSON.parse(provinces)
            const gt = []
            const np = []
            const py = []
            const sh = []
            const o = []
            provinces.forEach(element=>{
                if(element.Sub_id === "imc_g"){
                    const result = {
                        type: "button",
                        action: {
                            type: "message",
                            label: element.Province,
                            text: `&${element.Id}`
                        },
                        style: "primary",
                        height: "sm"
                    }
                    gt.push(result)
                }else if(element.Sub_id === "imc_n"){
                    const result = {
                        type: "button",
                        action: {
                            type: "message",
                            label: element.Province,
                            text: `&${element.Id}`
                        },
                        style: "primary",
                        height: "sm"
                    }
                    np.push(result)
                }else if(element.Sub_id === "imc_p"){
                    const result = {
                        type: "button",
                        action: {
                            type: "message",
                            label: element.Province,
                            text: `&${element.Id}`
                        },
                        style: "primary",
                        height: "sm"
                    }
                    py.push(result)
                }else if(element.Sub_id === "imc_s"){
                    const result = {
                        type: "button",
                        action: {
                            type: "message",
                            label: element.Province,
                            text: `&${element.Id}`
                        },
                        style: "primary",
                        height: "sm"
                    }
                    sh.push(result)
                }else if(element.Sub_id === "imc_o"){
                    const result = {
                        type: "button",
                        action: {
                            type: "message",
                            label: element.Province,
                            text: `&${element.Id}`
                        },
                        style: "primary",
                        height: "sm"
                    }
                    o.push(result)
                }
            })

            const test = [{
                type: "flex",
                altText: "altText",
                contents: {
                    type: "carousel",
                    contents: [
                        {
                            type: "bubble",
                            body: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "Imformation Contect",
                                        weight: "bold",
                                        color: "#1DB446",
                                        size: "sm"
                                    },
                                    {
                                        type: "text",
                                        text: "จังหวัดขึ้นต้น ก-ต",
                                        weight: "bold",
                                        size: "xxl",
                                        margin: "md",
                                        color: "#3a0ca3"
                                    },
                                    {
                                        type: "text",
                                        text: "เลือกจังหวัดที่ต้องการค้นหา",
                                        size: "xs",
                                        color: "#aaaaaa",
                                        wrap: true
                                    },
                                    {
                                        type: "separator",
                                        margin: "xxl"
                                    },
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        margin: "xxl",
                                        spacing: "sm",
                                        contents: gt
                                    }
                                ]
                            },
                            styles: {
                                footer: {
                                    separator: true
                                }
                            }
                        },
                        {
                            type: "bubble",
                            body: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "Imformation Contect",
                                        weight: "bold",
                                        color: "#1DB446",
                                        size: "sm"
                                    },
                                    {
                                        type: "text",
                                        text: "จังหวัดขึ้นต้น น-ป",
                                        weight: "bold",
                                        size: "xxl",
                                        margin: "md",
                                        color: "#3a0ca3"
                                    },
                                    {
                                        type: "text",
                                        text: "เลือกจังหวัดที่ต้องการค้นหา",
                                        size: "xs",
                                        color: "#aaaaaa",
                                        wrap: true
                                    },
                                    {
                                        type: "separator",
                                        margin: "xxl"
                                    },
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        margin: "xxl",
                                        spacing: "sm",
                                        contents: np
                                    }
                                ]
                            },
                            styles: {
                                footer: {
                                    separator: true
                                }
                            }
                        },
                        {
                            type: "bubble",
                            body: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "Imformation Contect",
                                        weight: "bold",
                                        color: "#1DB446",
                                        size: "sm"
                                    },
                                    {
                                        type: "text",
                                        text: "จังหวัดขึ้นต้น พ-ย",
                                        weight: "bold",
                                        size: "xxl",
                                        margin: "md",
                                        color: "#3a0ca3"
                                    },
                                    {
                                        type: "text",
                                        text: "เลือกจังหวัดที่ต้องการค้นหา",
                                        size: "xs",
                                        color: "#aaaaaa",
                                        wrap: true
                                    },
                                    {
                                        type: "separator",
                                        margin: "xxl"
                                    },
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        margin: "xxl",
                                        spacing: "sm",
                                        contents: py
                                    }
                                ]
                            },
                            styles: {
                                footer: {
                                    separator: true
                                }
                            }
                        },
                        {
                            type: "bubble",
                            body: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "Imformation Contect",
                                        weight: "bold",
                                        color: "#1DB446",
                                        size: "sm"
                                    },
                                    {
                                        type: "text",
                                        text: "จังหวัดขึ้นต้น ร-ส",
                                        weight: "bold",
                                        size: "xxl",
                                        margin: "md",
                                        color: "#3a0ca3"
                                    },
                                    {
                                        type: "text",
                                        text: "เลือกจังหวัดที่ต้องการค้นหา",
                                        size: "xs",
                                        color: "#aaaaaa",
                                        wrap: true
                                    },
                                    {
                                        type: "separator",
                                        margin: "xxl"
                                    },
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        margin: "xxl",
                                        spacing: "sm",
                                        contents: sh
                                    }
                                ]
                            },
                            styles: {
                                footer: {
                                    separator: true
                                }
                            }
                        },
                        {
                            type: "bubble",
                            body: {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "Imformation Contect",
                                        weight: "bold",
                                        color: "#1DB446",
                                        size: "sm"
                                    },
                                    {
                                        type: "text",
                                        text: "จังหวัดขึ้นต้น ส-อ",
                                        weight: "bold",
                                        size: "xxl",
                                        margin: "md",
                                        color: "#3a0ca3"
                                    },
                                    {
                                        type: "text",
                                        text: "เลือกจังหวัดที่ต้องการค้นหา",
                                        size: "xs",
                                        color: "#aaaaaa",
                                        wrap: true
                                    },
                                    {
                                        type: "separator",
                                        margin: "xxl"
                                    },
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        margin: "xxl",
                                        spacing: "sm",
                                        contents: o
                                    }
                                ]
                            },
                            styles: {
                                footer: {
                                    separator: true
                                }
                            }
                        }
                    ]
                }
            }] 
            console.log(`test:${JSON.stringify(test)}`)
            request({
                method: "POST",
                uri: `${LINE_MESSAGING_API}/reply`,
                headers: LINE_HEADER,
                body: JSON.stringify({
                    replyToken: event.replyToken,
                    messages:test
                })
            })
            
            
            res.status(200).end()
        }
        return 
    }

    if(keymessage === '!'){
        const get_data = await request({
            method: "GET",
            uri: `${DATABASE_API}/DataNew/Status/TRUE`,
            headers: DATABASE_HEADER,
        })
        

        if(get_data){
            console.log('apidata: '+JSON.stringify(get_data))
            const flextemplate = require('./flextemplate')
            const resultmessage = flextemplate.flexnewsdata(get_data)
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

    if(keymessage === '$'){
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
                    replyToken: event.replyToken,
                    messages: resultmessage
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

    if(keymessage === '#'){
        const get_data = await request({
            method: "GET",
            uri: `${DATABASE_API}/DataNew/Id/${message_cut}`,
            headers: DATABASE_HEADER,
        })
        

        if(get_data){
            console.log('apidata: '+JSON.stringify(get_data))
            const flextemplate = require('./flextemplate')
            const resultmessage = flextemplate.flextext(get_data)
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
    
    console.log("Do not qualify")
    res.status(204).end()
})
