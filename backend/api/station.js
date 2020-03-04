const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Station = require("../models/Station");

//------------------------------------------//
//                  ADD Station             //
//------------------------------------------//

router.post("/", (req, res, next) => {
  Station.find({ serial: req.body.serial })
    .exec()
    .then(stn => {
      if (stn.length >= 1) {
        return res.status(400).json({
          message: "Station already exist"
        });
      } else {
        const station = new Station({
          _id: req.body.chargePoint,
          serial: req.body.serial,
          type: req.body.type,
          chargePoint: req.body.chargePoint,
          chargeBox: req.body.chargeBox,
          qrCode: req.body.qrCode,
          firmware: req.body.firmware,
          date: new Date(),
          simType: req.body.simType,
          iccid: req.body.iccid,
          ports: req.body.ports,
          cpo: req.body.cpo,
          notes: req.body.notes,
          lte: req.body.lte
        });
        station
          .save()
          .then(result => {
            res.status(201).json({
              message: "Station Created Succesfully"
            });
          })
          .catch(err => {
            res.status(500).json({
              message: "Failure to create Station",
              error: err
            });
          });
      }
    });
});

//------------------------------------------//
//                  GET Station             //
//------------------------------------------//

router.get("/:id", (req, res, next) => {
  Station.findById(req.params.id).then(stn => {
    if (stn) {
      res.status(200).json(stn);
    } else {
      res.status(404).json({ message: "Station not found!" });
    }
  });
});

//------------------------------------------//
//                  EDIT Station            //
//------------------------------------------//

router.put("/:id", (req, res, next) => {
  var stn_serial;

  Station.findById({ _id: req.params.id })
    .exec()
    .then(stn => {
      stn_serial = stn.serial;
      Station.find({ serial: req.body.serial })
        .exec()
        .then(stn => {
          console.log(stn.length);
          console.log(req.body.serial);
          console.log(stn_serial);
          if (stn.length >= 1 && stn_serial !== req.body.serial) {
            return res.status(400).json({
              message: "Station Serial already exist"
            });
          } else {
            const station = new Station({
              _id: req.body.chargePoint,
              serial: req.body.serial,
              type: req.body.type,
              chargePoint: req.body.chargePoint,
              chargeBox: req.body.chargeBox,
              qrCode: req.body.qrCode,
              firmware: req.body.firmware,
              date: new Date(),
              simType: req.body.simType,
              iccid: req.body.iccid,
              ports: req.body.ports,
              cpo: req.body.cpo,
              notes: req.body.notes,
              lte: req.body.lte
            });
            Station.updateOne({ _id: req.params.id }, station)
              .then(result => {
                res.status(200).json({
                  message: "Station updated successful!"
                });
              })
              .catch(err => {
                res.status(500).json({
                  message: "Failure to update station",
                  error: err
                });
              });
          }
        });
    });
});

//------------------------------------------//
//                  Delete Station          //
//------------------------------------------//
router.delete("/:id", (req, res) => {
  Station.deleteOne({ _id: req.params.id })
    .then(rec => {
      console.log(rec);
      res.status(200).json({
        message: "Station Deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
//------------------------------------------//
//                  Get All Stations        //
//------------------------------------------//

router.get("/", (req, res) => {
  Station.find()
    .then(rec => {
      res.status(200).json(rec);
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

module.exports = router;
