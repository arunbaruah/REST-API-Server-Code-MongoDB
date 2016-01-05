var mongoose = require( 'mongoose' );

var registeredUsersSchema = new mongoose.Schema({
  //CARE: _ID WE ARE TAKING AS MOBILE_NO INSTEAD OF DEFAULT _ID value
  _id : { type: String, index: true }, //_id is the mobile No
  fb_id: String,
  home_ph_no: String,
  email_id: String,
  pwd: String,
  fname: String,
  mname: String,
  lname: String,
  home_add_residence_name: String,
  home_add_1: String,
  home_add_2: String,
  pin: String,
  current_office_name: String,
  city: String,
  state: String,
  country: { type: String, default: 'IND'},
  registered_Date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RegisteredUsers', registeredUsersSchema);
