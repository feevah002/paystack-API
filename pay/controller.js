const { 
        save_webhook_data,
      } = require('./repository');


/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description create payment link
 * @route /v1/pay/initialize
 * @access Public
 * @type POST
 */
exports.create_payment_link = async (req,res)=>{
  try{
    const https = require('https')
    const params = JSON.stringify({
      "email": `ikenna@gmail.com`,
      "amount": 100000,
    })

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        // your paystack secret key in .env file
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    }

    const req_paystack = https.request(options, res_paystack => {
      let data = ''

      res_paystack.on('data', (chunk) => {
        data += chunk
      });

      res_paystack.on('end', () => {
        data = JSON.parse(data)
        return  res.status(200).json({
                  data
                })

      })
    }).on('error', error => {
      console.error(error)
    })

    req_paystack.write(params)
    req_paystack.end()
   
  } catch(error){
    console.log(error);
    return  res.status(500).json({
              error,
              status:'false'
            });
  }
} 

/**
 * @author Ikenna Emmanuel <eikenna58@gmail.com>
 * @description handle event after payment
 * @route /v1/pay/webhook
 * @access Public
 * @type POST
 */

exports.collect_webhook_data = async(req,res)=>{
  try{
    //validate event
    const crypto = require('crypto');
    const secret = process.env.SECRET_KEY;
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {

      // Retrieve the request's body
      const all_webhook_data = req.body
  
      // Do something with retrieived data if seccessful
      switch (all_webhook_data.event){
        case 'charge.success':
          const payload = await save_webhook_data({all_webhook_data})
          return  res.status(200).json({
                    data: payload,
                    status:true
                  });
          break;
        default:
          return  res.status(500).json({
                    message:'Something went wrong',
                    status:'false'
                  });
      }
    }
  } catch(error){
    console.log(error)
    return  res.status(500).json({
              error,
              status:'false'
            });
  } 
}



