var mongoose = require( 'mongoose' );

var subscriptionsSchema = new mongoose.Schema({
  _id : { type: String, index: true }, //_id is the mobile No
  fb_id: String,
  email_id: String,
  plan: String,
  amount_paid: Number,
  discount: Number,
  txn_date: { type: Date, default: Date.now },
  txn_status: String,
  txn_no: String
});

var Subscriptions = module.exports = mongoose.model('Subscriptions', subscriptionsSchema);
