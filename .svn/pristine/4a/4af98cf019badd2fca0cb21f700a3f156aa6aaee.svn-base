var mongoose = require( 'mongoose' );

var registeredStaffsSchema = new mongoose.Schema({
  _id : { type: String, index: true }, //_id is the mobile No
  fb_id: String,
  office_id: String,
  email_id: String,
  pwd: String,
  fname: String,
  mname: String,
  lname: String,
  designation: String,
  managers_name: String,
  office_ph_no: String,
  pin: String,
  current_office_name: String,
  current_office_location: String,
  city: String,
  state: String,
  country: { type: String, default: 'IND'},
  registered_Date: { type: Date, default: Date.now }
});

var RegisteredStaffs = module.exports = mongoose.model('RegisteredStaffs', registeredStaffsSchema);
