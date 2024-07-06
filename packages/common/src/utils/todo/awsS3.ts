// import AWS from 'aws-sdk';

// import { ENVs } from '../config/ENVs/ENVs';
// import { nodeEnvironments } from '../config/constAndTypes';

// import { functionWrapper, functionWrapperNoSync } from './functionWrapper';

// const { accessKeyId, secretAccessKey, region, bucketName, saveFilesNotInProduction } = ENVs.AWS;
// AWS.config.update({
//   accessKeyId,
//   secretAccessKey,
//   region,
// });

// const s3 = new AWS.S3();

// const { env } = ENVs;

// const dontActuallySaveTheFiles = !(env == nodeEnvironments.production || saveFilesNotInProduction);

// export const uploadFile = async (fileName: string, fileContentAsBase64: string) => {
//   return functionWrapper(async () => {
//     if (dontActuallySaveTheFiles) {
//       return 'we do not save files not in production to avoid saving meaningles files';
//     }
//     const fileContent = Buffer.from(fileContentAsBase64, 'base64');
//     const params = {
//       Bucket: bucketName,
//       Key: fileName,
//       Body: fileContent,
//     };
//     const result = await s3.upload(params).promise();
//     return result;
//   });
// };

// const oneMonth = 3600 * 24 * 30;
// export const generatePresignedUrl = (fileName) => {
//   return functionWrapperNoSync(() => {
//     if (dontActuallySaveTheFiles) {
//       /* just a mock link because we do not want to use real bucket space for proposal document outside production, so real link canot be generated */
//       return 'https://online.smartbull.co.il/';
//     }
//     const params = {
//       Bucket: bucketName,
//       Key: fileName,
//       Expires: oneMonth,
//     };

//     const result = s3.getSignedUrl('getObject', params);
//     return result;
//   });
// };
