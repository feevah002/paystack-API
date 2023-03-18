const Webhook = require('./model')

// create a due
exports.save_webhook_data = async (data)=>{
  const payload = await Webhook.create(data)
  return payload
}
