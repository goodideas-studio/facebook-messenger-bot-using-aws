const index = require('./index.js')

const MESSAGE_DATA = {}

index.replyMessage(MESSAGE_DATA, {}, (error, response) => {

  if (error === null) console.log(response)
  else console.log(error)
  
})
