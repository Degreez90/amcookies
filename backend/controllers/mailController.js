import asyncHandler from 'express-async-handler'
import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import dotenv from 'dotenv'

dotenv.config()

const sendMessage = asyncHandler(async (req, res) => {
  const { from, subject, message, firstName, LastName, phoneNumber } = req.body

  const key = process.env.MAIL_API_KEY
  const DOMAIN = process.env.DOMAIN

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

  client.messages
    .create(DOMAIN, messageData)
    .then((result) => {
      res.status(200).send('Message sent')
    })
    .catch((err) => {
      throw new Error(err + ' Message not sent')
    })
})

//Order confirmation mail
const mailOrderConfirmation = asyncHandler(async (req, res) => {
  //destructuring data receieved from Frontend order details
  const {
    orderDetails: { nonRegUser, shippingAddress, orderItems, _id },
  } = req.body

  const key = process.env.MAIL_API_KEY
  const DOMAIN = process.env.DOMAIN

  const mailgun = new Mailgun(FormData)
  const client = mailgun.client({
    username: 'api',
    key: key,
  })

  let itemsText = ''
  orderItems.forEach((item) => {
    itemsText += `\nName: ${item.name}, qty: ${item.qty}\n`
  })

  const messageData = {
    from: `amookies@gmail.com`,
    to: [nonRegUser.email],
    subject: `AM Cookies Order Connfirmation`,
    text: `Thank You for Your Purchase!
    \nYour Order # ${_id}
    \nFirst Name: ${nonRegUser.firstName}
    \nLast Name: ${nonRegUser.lastName}
    \nEmail: ${nonRegUser.email}
    \nPhone Number: ${nonRegUser.phoneNumber}
    \nShipping Address: ${shippingAddress.address}
    \nState: ${shippingAddress.state}
    \nZip Code: ${shippingAddress.postalCode}
    \nCountry: ${shippingAddress.country}
    \nitems: ${itemsText}`,
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
