import nodemailer from 'nodemailer';
import multiparty from 'multiparty';
import fs from 'fs';

// Disable the default body parser so we can parse the stream with multiparty
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the incoming multipart form data
    const form = new multiparty.Form();

    const data = await new Promise((resolve, reject) => {
      form.parse(req, function (err, fields, files) {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const fields = data.fields;
    const files = data.files;

    // Extract fields (multiparty returns arrays for fields)
    const position = fields.position ? fields.position[0] : 'General Application';
    const name = fields.name ? fields.name[0] : 'Applicant';
    const email = fields.email ? fields.email[0] : '';
    const phone = fields.phone ? fields.phone[0] : '';
    const message = fields.message ? fields.message[0] : '';

    if (!email) {
      return res.status(400).json({ error: 'Missing email field' });
    }

    // Configure the SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toEmail = process.env.CONTACT_EMAIL_TO || 'aviralshukla2612@gmail.com';

    // Prepare attachments
    const attachments = [];
    if (files && files.resume && files.resume.length > 0) {
      const file = files.resume[0];
      attachments.push({
        filename: file.originalFilename,
        path: file.path, // nodemailer can stream directly from the temp file path
      });
    }

    // Set up the email data
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: toEmail,
      subject: `New Job Application: ${position} - ${name}`,
      text: `
You have received a new career application.

Position: ${position}
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
      `,
      html: `
        <h3>New Career Application</h3>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      attachments: attachments,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('SMTP/Upload Error:', error);
    return res.status(500).json({ error: 'Failed to process application. Check server configuration.' });
  }
}
