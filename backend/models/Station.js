const mongoose = require("mongoose");

const stationSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },

  serial: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  chargePoint: {
    type: String,
    required: true
  },
  chargeBox: {
    type: String,
    required: true
  },
  qrCode: String,
  firmware: String,
  date: String,
  simType: String,
  img: String,
  iccid: String,
  cpo: String,
  ports: String,
  notes: String,
  lte: String
});

module.exports = mongoose.model("Station", stationSchema);
