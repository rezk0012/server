const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  (SENDGRID_API_KEY =
    "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")
);
router.post("/", (req, res, next) => {
  const msg = {
    to: req.body.to,
    from: req.body.from,
    cc: req.body.cc,
    subject: req.body.subject,
    html: req.body.html
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({
        message: "email Send successfully"
      });
      console.log("email send");
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
