var mongoose = require( 'mongoose' );

var policeHelpSchema = new mongoose.Schema({
  _id : { type: String, index: true }, //_id is the mobile No
  seekHelp_date: { type: Date, default: Date.now },
  lat: Number,
  longt: Number
});

var PoliceHelp = module.exports = mongoose.model('PoliceHelp', policeHelpSchema);
