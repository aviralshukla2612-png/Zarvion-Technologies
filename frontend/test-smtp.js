import nodemailer from 'nodemailer';

async function testSMTP() {
  console.log('Testing SMTP connection...');
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: 'zarvion@vardaansmartsolutions.com',
      pass: '=C4;r>lDY4k~',
    },
  });

  try {
    // Verify connection configuration
    await transporter.verify();
    console.log('Server is ready to take our messages!');

    // Send a test email
    const info = await transporter.sendMail({
      from: '"Test Script" <zarvion@vardaansmartsolutions.com>',
      to: 'aviralshukla2612@gmail.com', // Replace with a test email if needed
      subject: 'SMTP Test Successful',
      text: 'If you receive this, SMTP is working perfectly from the local machine.',
    });

    console.log('Message sent successfully. Message ID:', info.messageId);
  } catch (error) {
    console.error('SMTP Connection/Sending Error:', error);
  }
}

testSMTP();
