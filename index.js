'use strict';

const fetch = require('node-fetch')

const PAGE_ACCESS_TOKEN = `PUT_YOUR_TOKEN_HERE`

/**
 * Main function
 */
exports.replyMessage = (event, context, callback) => {

  const MESSAGE_BODY = processMessageFromSender(event)

  sendMessageToSender(MESSAGE_BODY)
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


}

/**
 * get user information
 */
const getSenderInformation = (senderId) => {


}
