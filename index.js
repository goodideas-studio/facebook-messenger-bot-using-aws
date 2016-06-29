'use strict';

const fetch = require('node-fetch')

const PAGE_ACCESS_TOKEN = `PUT_YOUR_PAGE_ACCESS_TOKEN_HERE`

/**
 * Main function
 */
exports.replyMessage = (event, context, callback) => {


    const MESSAGE_BODY = processMessageFromSender(event)
    const SENDER_INFORMATION = { name: '' }

    getSenderInformation(MESSAGE_BODY.recipient.id)
      .then(response => response.json())
      .then(snederInformation => {

        const text = replyMessageWithSpecificKeywords(MESSAGE_BODY.message.text)

        SENDER_INFORMATION.name = `${snederInformation.first_name}`
        MESSAGE_BODY.message.text = `${SENDER_INFORMATION.name}, ${text}`

        return sendMessageToSender(MESSAGE_BODY)

      })
      .then(response => response.json())
      .then(result => {

        callback(null, result)

      })
      .catch(error => {

        callback(error)

      })

}

/**
 * process message from user
 */

 const processMessageFromSender = (rawData) => {

   const MESSAGE_DATA = {
     "recipient": {
       "id": ""
     },
     "message": {
       "text": ""
     }
   }

   rawData.entry.forEach(item => {

     item.messaging.forEach(item => {

       MESSAGE_DATA.recipient.id = item.sender.id
       MESSAGE_DATA.message.text = item.message.text

     })

   })

   return MESSAGE_DATA

 }

/**
 * send message to user
 */

 const sendMessageToSender = (messageBody) => {

   return fetch(`https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(messageBody)
   })

 }

/**
 * reply specific message when user type specific keywords
 */
const replyMessageWithSpecificKeywords = (messageText) => {

  if (messageText.indexOf('portfolio') >= 0) {

    return `Hi nice to meet you! here is my GitHub url: https://github.com/jacky810124`

  } else if (messageText.indexOf('contact') >= 0) {

    return `Hi nice to meet you! my email is: jacky810124@hotmail.com \n\nor here is my facebook: https:facebook.com/huangjikang`

  } else if (messageText.indexOf('help') >= 0) {

    return `You can type 'portfolio' or 'contact' to get more information.`

  } else {

    return `Sorry, I just a bot, I can not understand what are you talking about. You can type 'help' to get more information!`

  }

}

/**
 * get user information
 */

 const getSenderInformation = (senderId) => {

   return fetch(`https://graph.facebook.com/v2.6/${senderId}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${PAGE_ACCESS_TOKEN}`)

 }
