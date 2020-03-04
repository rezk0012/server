const express = require("express");
const router = express.Router();
var request = require("request");
const Kpn = require('../models/kpn');
const report = require('./create-invoice');



var body = [];

// Get Device status

router.get("/sim/:id", (req, res, next) => {
  request
    .get("https://restapi2.jasper.com/rws/api/v1/devices/" + req.params.id)
    .auth("alfredrezk", "6810913e-d29c-4418-b60a-ddbf3aa87178", false)
    .on("error", function (error) {
      console.log("Error:", error);
    })
    .on("response", function (response) {
      console.log(response.statusCode); // return statusCode
      console.log(response.headers["content-type"]); // return contentType
    })
    .on("data", function (chunk) {
      body.push(chunk);
    })
    .on("end", function () {
      body = Buffer.concat(body).toString();
      console.log(body);
      res.status(200).json(JSON.parse(body));
      body = [];
    });
});

router.get("/usage/:id", (req, res, next) => {
  request
    .get(
      "https://restapi2.jasper.com/rws/api/v1/devices/" +
      req.params.id +
      "/ctdUsages"
    )
    .auth("alfredrezk", "6810913e-d29c-4418-b60a-ddbf3aa87178", false)
    .on("error", function (error) {
      console.log("Error:", error);
    })
    .on("response", function (response) {
      console.log(response.statusCode); // return statusCode
      console.log(response.headers["content-type"]); // return contentType
    })
    .on("data", function (chunk) {
      body.push(chunk);
    })
    .on("end", function () {
      body = Buffer.concat(body).toString();
      console.log(body);
      res.status(200).json(JSON.parse(body));
      body = [];
    });
});

router.post("/report", (req, res, next) => {

  report.createInvoice(req.body, 'backend/images/invoice.pdf')
  res.status(200).json({
    message:'Invoice Generated'
  })

})


router.put("/setprice", (req, res, next) => {
  console.log(req.body)
  const price = new Kpn({
    _id: "7",
    dollars: req.body.dollars,
    flatrateUnit: req.body.flatrateUnit,
    flatrate: req.body.flatrate,
    flatrateData: req.body.flatrateData,
    unit: req.body.unit, 
    flatrateDollars: req.body.flatrateDollars
  });

  Kpn.updateOne({ _id: '7' }, price)
    .then(result => {
      res.status(201).json({
        message: "KPN Pricing updated Succesfully", 
        data: price
      });
    })

});


router.get("/getprice", (req, res, next) => {
  Kpn.findById('7').then(Pricing => {
    if (Pricing) {
      res.status(200).json(Pricing);
    } else {
      res.status(404).json({ message: "Pricing not found!" });
    }
  });
})




module.exports = router;
