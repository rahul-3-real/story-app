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

// Account Created Email
export const accountCreatedEmail = async (sendTo) => {
  const appUrl = `${process.env.CORS_OPTIONS}`;

  const data = {
    email: sendTo.email,
    full_name: sendTo.full_name,
    appUrl,
  };

  try {
    const emailTemplate = await renderEmailTemplate(
      "src/templates/emailer/account-created.ejs",
      data
    );

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: sendTo.email,
      subject: "Story App",
      html: emailTemplate,
    });
    return info;
  } catch (error) {
    throw new ApiError(500, `Error sending Email :: ${error}`);
  }
};

// Verify Email
export const verifyEmail = async (sendTo, verifyEmailCode) => {
  const appUrl = `${process.env.CORS_OPTIONS}`;

  const data = {
    email: sendTo.email,
    full_name: sendTo.full_name,
    verifyLink: `${appUrl}/verify-email/${verifyEmailCode}`,
  };

  try {
    const emailTemplate = await renderEmailTemplate(
      "src/templates/emailer/verify-email.ejs",
      data
    );

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: sendTo.email,
      subject: "Story App",
      html: emailTemplate,
    });
    return info;
  } catch (error) {
    throw new ApiError(500, `Error sending Email :: ${error}`);
  }
};

// Sending Password Reset Email
export const sendPasswordResetEmail = async (sendTo, resetPasswordCode) => {
  const appUrl = `${process.env.CORS_OPTIONS}`;

  const passwordResetData = {
    email: sendTo,
    resetLink: `${appUrl}/forgot-password-request/${resetPasswordCode}`,
  };

  try {
    const emailTemplate = await renderEmailTemplate(
      "src/templates/emailer/password-reset.ejs",
      passwordResetData
    );

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: sendTo,
      subject: "Story App",
      html: emailTemplate,
    });
    return info;
  } catch (error) {
    throw new ApiError(500, `Error sending Email :: ${error}`);
  }
};
