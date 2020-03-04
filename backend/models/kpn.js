const mongoose = require('mongoose');

const kpnSchema = mongoose.Schema({
  _id: String,
    dollars: String,
    flatrateUnit: String,
    flatrate: Boolean,
    flatrateData: String,
    unit: String, 
    flatrateDollars:String
});

module.exports = mongoose.model('Kpn', kpnSchema);
