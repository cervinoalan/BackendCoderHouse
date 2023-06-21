const nodemailer = require("nodemailer");
const { MAILING } = require("../config/config");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAILING.USER,
      pass: MAILING.PASSWORD,
    },
});

module.exports = transport;
