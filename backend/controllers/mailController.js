import asyncHandler from 'express-async-handler'
import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import dotenv from 'dotenv'

dotenv.config()

const sendMessage = asyncHandler(async (req, res) => {
  const { from, subject, message, firstName, LastName, phoneNumber } = req.body

  const key = process.env.MAIL_API_KEY
  const DOMAIN = process.env.DOMAIN

  console.log(key + DOMAIN)

  const mailgun = new Mailgun(FormData)
  const client = mailgun.client({
    username: 'api',
    key: key,
  })

  const messageData = {
    from,
    to: 'offitt90@gmail.com',
    subject,
    text: `First Name: ${firstName}
    \nLast Name: ${LastName}
    \nPhone Number: ${phoneNumber}
    \n\n${message}`,
  }
  console.log(messageData)

  client.messages
    .create(DOMAIN, messageData)
    .then((result) => {
      res.status(200).send('Message sent')
    })
    .catch((err) => {
      throw new Error(err + ' Message not sent')
    })
})

const mailOrderConfirmation = asyncHandler(async (req, res) => {
  const { data } = req.body

  const key = process.env.MAIL_API_KEY
  const DOMAIN = process.env.DOMAIN

  const mailgun = new Mailgun(FormData)
  const client = mailgun.client({
    username: 'api',
    key: key,
  })

  const messageData = {
    from,
    to: data.nonRegUser.email,
    subject,
    text: `First Name: ${firstName}
    \nLast Name: ${LastName}
    \nEmail: ${email}
    \nPhone Number: ${phoneNumber}
    \nPhone Number: ${phoneNumber}
    \n\n${message}`,
  }
  console.log(messageData)

  client.messages
    .create(DOMAIN, messageData)
    .then((result) => {
      res.status(200).send('Message sent')
    })
    .catch((err) => {
      throw new Error(err + ' Message not sent')
    })
})

export { sendMessage, mailOrderConfirmation }
