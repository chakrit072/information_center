
'use strict';

function flexnewsdata(data){
    const parsed = JSON.parse(data)
    let [...new_data] = [...parsed]
    const get = []
    console.log(typeof new_data)
    new_data.forEach((element) => {
        const id = element.Id
        const date = element.Date
        const topic = element.Topic
        const detail = element.Detail
        const url = element.Url
        console.log(url)
        const result =  {
            type: "bubble",
            hero: {
                type: "image",
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover",
                url: url
            },
            body: {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                contents: [
                    {
                        type: "text",
                        text: topic,
                        wrap: true,
                        weight: "bold",
                        size: "xl"
                    },
                    {
                        type: "box",
                        layout: "baseline",
                        contents: [
                            {
                                type: "text",
                                text: detail
                            }
                        ]
                    }
                ]
            },
            footer: {
                type: "box",
                layout: "horizontal",
                spacing: "sm",
                contents: [
                    {
                        type: "button",
                        style: "primary",
                        action: {
                            type: "uri",
                            label: "Image",
                            uri: url
                        },
                        height: "sm",
                        adjustMode: "shrink-to-fit",
                        position: "relative"
                    },
                    {
                        type: "button",
                        action: {
                            type: "message",
                            label: "Read more",
                            text: `#${id}`
                        },
                        height: "sm",
                        position: "relative",
                        margin: "xs",
                        adjustMode: "shrink-to-fit",
                        style: "secondary"
                    }
                ]
            }
        }
                
        get.push(result)
    });
    
    const result = [{
            type: "flex",
            altText: "altText",           
            contents: {
                type: "carousel",
                contents: get
              }
        }]  

    return result
}

function flexlocation(data){
    const parsed = JSON.parse(data)
    let [...new_data] = [...parsed]
    const get = []
    console.log(typeof new_data)
    new_data.forEach((element) => {
        const name = element.Location_Name
        const url = element.Location_Url
        // const caption = parsed[i].Location_Caption
        const result ={
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "image",
                        url: url,
                        size: "full",
                        aspectMode: "cover",
                        aspectRatio: "2:3",
                        gravity: "top"
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        contents: [
                            {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: name,
                                        size: "xl",
                                        color: "#ffffff",
                                        weight: "bold"
                                    }
                                ]
                            },
                            {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "button",
                                        action: {
                                            type: "uri",
                                            label: "Enter",
                                            uri: url
                                        }
                                    }
                                ],
                                action: {
                                    type: "uri",
                                    label: "Enter",
                                    uri: url
                                }
                            }
                        ],
                        position: "absolute",
                        offsetBottom: "0px",
                        offsetStart: "0px",
                        offsetEnd: "0px",
                        backgroundColor: "#ffc8dd",
                        paddingAll: "20px",
                        paddingTop: "18px"
                    }
                ],
                paddingAll: "0px"
            }
        }
                
        get.push(result)
    });
    
    const result = [{
            type: "flex",
            altText: "altText",           
            contents: {
                type: "carousel",
                contents: get
              }
        }]  

    return result
}

function flexcontact(json){
    const parsed = JSON.parse(json)
    const province = parsed[0].Province
    const name = parsed[0].Name
    const number = parsed[0].Phone_number

    const get = {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "image",
                      "url": "https://lh3.googleusercontent.com/d/1-TsBqzvjYh_ioKurYE7pmE6Di83EcECW",
                      "aspectMode": "cover",
                      "size": "full"
                    }
                  ],
                  "cornerRadius": "100px",
                  "width": "72px",
                  "height": "72px"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": province,
                      "weight": "bold"
                    },
                    {
                      "type": "text",
                      "text": name
                    },
                    {
                      "type": "text",
                      "text": number
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "button",
                          "action": {
                            "type": "uri",
                            "label": "Call",
                            "uri": `tel:${number}`
                          },
                          "style": "primary",
                          "height": "sm"
                        }
                      ]
                    }
                  ]
                }
              ],
              "spacing": "xl",
              "paddingAll": "20px"
            }
          ],
          "paddingAll": "0px"
        }
      }

    return [{
            "type": "flex",
            "altText": "altText",           
            "contents":get
        }
    ]
}

function flextext(json){
    const parsed = JSON.parse(json)
    const get = parsed[0].Detail

    return [{
            "type": "text",         
            "text":get
        }]
    
}

module.exports = {
    flexnewsdata,
    flexlocation,
    flexcontact,
    flextext

};