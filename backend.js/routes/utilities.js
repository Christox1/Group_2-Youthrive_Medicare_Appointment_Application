import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});

// Load environment variables from .env file
dotenv.config();

export const sendEmail = async (email, username) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });
  const logoUrl = 'https://res.cloudinary.com/dkgjuilbv/image/upload/v1718777871/Youthrive_Medicare_Appointment_Application_gvdats.jpg'
  
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Registration Successful to the Youthrive Medicare Appointment Application',
    html: `
      <div>
        <img src="${logoUrl}" alt="Youthrive Medicare Logo" style="width:100px; height:auto;"/>
        <h1>Hello ${username}</h1>
        <h2>We are excited to have you join the Youthrive Medicare Appointment Application!</h2>
        <p>Here we provide you with world-class health resources on our online platform</p>
        <h6>Thanks for joining the Youthrive Medicare Tribe</h6>
      </div>
    `,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', res);
    return res;
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Detailed Error:', error.response || error.message);
    throw new Error('Email not sent'); // Throw error to be caught by calling function
  }
};

export default sendEmail;
