const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../model/user");

const router = express.Router();

router.post("/senddata", async (req, res) => {
  try {
    const { name, email, subject, desc } = req.body;

    if (!name || !email || !subject || !desc) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save user data
    const user = await User.create({ name, email, subject, desc });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting Us!",
      text: `Hi ${name}, thanks for reaching out!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Message sent successfully.", user });
  } catch (err) {
    res.status(500).json({ message: "An error occurred.", error: err.message });
  }
});

module.exports = router;
