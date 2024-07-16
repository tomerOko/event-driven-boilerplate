import AWS from 'aws-sdk';

import { functionWrapper } from '../logging/functionWrapper';

let s3: AWS.S3;
let fakeIt: boolean;
let bucketName: string;

export const initializeS3 = (
  accessKeyId: string,
  secretAccessKey: string,
  region: string,
  bucketName: string,
  fakeIt: boolean,
) => {
  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region,
  });
  s3 = new AWS.S3();
  fakeIt = fakeIt;
  bucketName = bucketName;
};

export const uploadFile = async (fileName: string, fileContentAsBase64: string) => {
  return functionWrapper(async () => {
    if (fakeIt) {
      return 'we do not save files not in production to avoid saving meaningles files';
    }
    const fileContent = Buffer.from(fileContentAsBase64, 'base64');
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent,
    };
    const result = await s3.upload(params).promise();
    return result;
  });
};

const oneMonth = 3600 * 24 * 30;
export const generatePresignedUrl = (fileName: string) => {
  return functionWrapper(() => {
    if (fakeIt) {
      /* just a mock link because we do not want to use real bucket space for proposal document outside production, so real link canot be generated */
      return 'https://google.com/';
    }
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Expires: oneMonth,
    };

    const result = s3.getSignedUrl('getObject', params);
    return result;
  });
};

export const deleteFile = async (fileName: string) => {
  return functionWrapper(async () => {
    if (fakeIt) {
      return 'we do not save files not in production to avoid saving meaningles files';
    }
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };
    const result = await s3.deleteObject(params).promise();
    return result;
  });
};
