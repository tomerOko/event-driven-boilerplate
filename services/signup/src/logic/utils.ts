import { functionWrapper } from 'common-lib-tomeroko3';

export const sendEmail = async (email: string, subject: string, text: string) => {
  return functionWrapper(async () => {
    console.log(`Sending email to ${email} with subject: ${subject} and text: ${text}`);
  });
};
