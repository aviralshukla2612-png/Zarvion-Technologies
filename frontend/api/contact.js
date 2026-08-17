import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS configuration (in case they call this from a different domain)
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
    const { name, email, phone, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Configure the SMTP transporter using Environment Variables
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // 465 requires secure: true
      auth: {
        user: 'zarvion@vardaansmartsolutions.com',
        pass: '=C4;r>lDY4k~',
      },
    });

    // Destination email address (where you want to receive the messages)
    const toEmail = process.env.CONTACT_EMAIL_TO && process.env.CONTACT_EMAIL_TO !== 'undefined' 
        ? process.env.CONTACT_EMAIL_TO 
        : 'aviralshukla2612@gmail.com';

    // Set up the email data
    const mailOptions = {
      from: `"${name}" <zarvion@vardaansmartsolutions.com>`, // Send via authenticated user
      replyTo: email, // Reply goes to the submitter
      to: toEmail,
      subject: `New Contact Request from ${name}`,
      text: `
You have received a new contact request from Zarvion Technologies website.

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
      `,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // 1. Send the email to the company
    await transporter.sendMail(mailOptions);

    // 2. Send the auto-reply to the user
    const autoReplyOptions = {
      from: `"Zarvion Technologies" <zarvion@vardaansmartsolutions.com>`,
      to: email,
      subject: `Thank you for contacting Zarvion Technologies`,
      text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message and our team will get back to you shortly.\n\nBest regards,\nThe Zarvion Technologies Team`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to us. We have received your message and our team will get back to you shortly.</p>
          <br/>
          <p>Best regards,<br/><strong>The Zarvion Technologies Team</strong></p>
        </div>
      `,
    };
    await transporter.sendMail(autoReplyOptions);

    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ error: 'Failed to send message. Check SMTP configuration.', details: error.toString(), stack: error.stack });
  }
}
