import { functionWrapper } from '/Users/tomer/code/micro/services/signup/src/test_modules/src/index';

export const sendEmail = async (email: string, subject: string, text: string) => {
  return functionWrapper(async () => {
    console.log(`Sending email to ${email} with subject: ${subject} and text: ${text}`);
  });
};
