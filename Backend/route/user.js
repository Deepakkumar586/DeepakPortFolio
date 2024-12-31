const express = require("express");
const User = require("../model/user");
const userRouter = express.Router();
const nodemailer = require("nodemailer");

userRouter.post("/senddata", async (req, res) => {
  try {
    const { name, email, subject, desc } = req.body;

    // Validate all fields
    if (!name || !email || !subject || !desc) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.create({
      name,
      email,
      subject,
      desc,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Portfolio <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Contacting Us!",
      html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                            max-width: 600px;
                            margin: 20px auto;
                            text-align: center;
                        }
                        h1 {
                            color: #333333;
                        }
                        p {
                            color: #555555;
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        .footer {
                            margin-top: 20px;
                            font-size: 14px;
                            color: #888888;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Thank You, ${name}!</h1>
                        <p>We have received your message regarding <strong>${subject}</strong>.</p>
                        <p>Our team will review your inquiry and get back to you shortly.</p>
                        <p>If you have any urgent queries, feel free to reply to this email.</p>
                        <div class="footer">
                            <p>&copy; 2024 Your Portfolio. All rights reserved.</p>
                        </div>
                    </div>
                </body>
            </html>
            `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.status(201).json({
      message:
        "Your message has been received. A confirmation email has been sent.",
      data: user,
      success: true,
    });
  } catch (err) {
    console.error("Data Send Error:", err);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
});

module.exports = userRouter;
