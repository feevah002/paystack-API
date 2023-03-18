const mongoose = require('mongoose')

const DuesPaySchema = new mongoose.Schema(
  {
    // customize to only data you want to aqcuire
    all_webhook_data:[{
      type:Object,
      required:true
    }],
  },{
      timestamps:true
    }
)

const DuesPay = mongoose.model('DuesPay', DuesPaySchema)

module.exports = DuesPay