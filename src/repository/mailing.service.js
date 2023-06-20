const nodemailer = require("nodemailer");
const { MAILING } = require("../config/config");

class Mailing {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAILING.USER,
        pass: MAILING.PASSWORD,
      },
    });
  }
  sendMail = async ({ to, subject, html }) =>
    this.transporter.sendMail({ to, subject, html });
}

module.exports = new Mailing();
