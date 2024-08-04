import { functionWrapper } from 'common-lib-tomeroko3';
import { SendEmailEventType } from 'events-tomeroko3';
import nodemailer from 'nodemailer';

import { ENVs } from '../configs/ENVs';

const { address, password } = ENVs.email;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: address,
    pass: password,
  },
});

export const handleSendEmailEvent = async (payload: SendEmailEventType['data']) => {
  return functionWrapper(async () => {
    try {
      // Compose the email message
      const { email, content, subject } = payload;
      const mailOptions = {
        from: address,
        to: email,
        subject,
        text: content,
      };
      // Send the email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  });
};
