
'use strict';

function flexlocation(json){
    const get = []
    json.forEach((element,i) => {
        const parsed = JSON.parse(element)
        const name = parsed[i].Location_Name
        const url = parsed[i].Location_Url
        const caption = parsed[i].Location_Caption
        const result = {
          "imageUrl": url,
          "action": {
            "type": "uri",
            "label": name,
            "uri": url
          }
        }
        get.push(result)
    });

    return get
}

function flexcontact(json){
    const parsed = JSON.parse(json)
    const province = parsed[0].Province
    const name = parsed[0].Name
    const number = parsed[0].Phone_number

    return [
        {
            type: "text",
            text: province
        },
        {
            type: "text",
            text: name
        },
        {
            type: "text",
            text: number
        }
    ]
}

module.exports = {
    flexlocation,
    flexcontact

};