import ejs from "ejs";
import nodemailer from "nodemailer";

import ApiError from "../utils/apiError.js";

// Render Email Template
const renderEmailTemplate = async (templatePath, data) => {
  try {
    const renderedTemplate = await ejs.renderFile(templatePath, data);
    return renderedTemplate;
  } catch (error) {
    throw new Error(`Error rendering email template: ${error.message}`);
  }
};

// Transporter (Setting up SMTP details)
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
