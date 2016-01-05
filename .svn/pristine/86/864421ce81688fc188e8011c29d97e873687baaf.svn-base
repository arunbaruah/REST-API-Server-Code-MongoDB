var mongoose = require( 'mongoose' );

var accidentHelpSchema = new mongoose.Schema({
  _id : { type: String, index: true }, //_id is the mobile No
  seekHelp_date: { type: Date, default: Date.now },
  lat: Number,
  longt: Number
});

var AccidentHelp = module.exports = mongoose.model('AccidentHelp', accidentHelpSchema);
