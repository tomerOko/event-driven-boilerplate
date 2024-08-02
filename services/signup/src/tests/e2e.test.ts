import { headerNames, initiateCommonUtils } from 'common-lib-tomeroko3';
import exp from 'constants';
import Request from 'supertest';

import { app } from '../app';
import { connectToMongo } from '../configs/mongo';
import { channel, closeConnection, connectToRabbitMq } from '../configs/rabbitConnections2';
import * as model from '../logic/dal';

jest.setTimeout(30000);

const request = Request(app);
const email = 'tomeroko2@gmail.com';
const password = '123456';
const firstName = 'Tomer';
const lastName = 'Oko';

beforeAll(async () => {
  initiateCommonUtils(false, 'signup-test');
  await connectToMongo();
  await model.initCollections();
  await connectToRabbitMq();
  await model.cleanCollections();
  await channel.assertQueue('userQueue', { durable: false });
  await channel.purgeQueue('userQueue');
});

afterAll(async () => {
  await closeConnection();
});

describe('Send Pincode Endpoint', () => {
  beforeEach(async () => {
    await model.cleanCollections();
  });

  test('Send Pincode - Success', async () => {
    const response = await request.post('/signup/send-pincode').send({
      email: 'tomeroko2@gmail.com',
    });
    expect(response.status).toBe(201);
    const pincodeDocument = await model.getPincode(email);
    expect(pincodeDocument?.email).toBe(email);
    expect(pincodeDocument?.pincode).toHaveLength(6);
  });

  test('Send Pincode - Fail - no email provided', async () => {
    const response = await request.post('/signup/send-pincode').send({});
    expect(response.status).toBe(409);
    expect(response.body.error.description).toBe('request did not passed route validations');
    expect(response.body.error.data['body.email']).toBeDefined();
  });

  test('Send Pincode - Fail - email is not valid', async () => {
    const response = await request.post('/signup/send-pincode').send({
      email: 'tomeroko2',
    });
    expect(response.status).toBe(409);
    expect(response.body.error.description).toBe('request did not passed route validations');
    expect(response.body.error.data['body.email']).toBeDefined();
  });

  test('Send Pincode - Resend', async () => {
    const response1 = await request.post('/signup/send-pincode').send({
      email: 'tomeroko2@gmail.com',
    });
    expect(response1.status).toBe(201);
    const pincodeDocument1 = await model.getPincode(email);
    expect(pincodeDocument1?.pincode).toHaveLength(6);

    const response2 = await request.post('/signup/send-pincode').send({
      email: 'tomeroko2@gmail.com',
    });
    expect(response2.status).toBe(201);
    const pincodeDocument2 = await model.getPincode(email);
    expect(pincodeDocument2?.pincode).toHaveLength(6);
    expect(pincodeDocument1?.pincode).not.toBe(pincodeDocument2?.pincode);
  });
});

describe('Create User Endpoint', () => {
  beforeEach(async () => {
    await model.cleanCollections();
    await channel.purgeQueue('userQueue');
  });

  test('Create User - Success', async () => {
    /**
     * asume that the pincode endpoint is tested above
     */
    await request.post('/signup/send-pincode').send({
      email,
    });
    const pincodeDocument = await model.getPincode(email);
    const pincode = pincodeDocument?.pincode;

    const signupResponse = await request.post('/signup/create-user').send({
      pincode,
      user: {
        firstName,
        lastName,
        email,
        password,
      },
    });

    expect(signupResponse.status).toBe(201);
    const userDocument = await model.getUserByEmail(email);
    expect(userDocument).toBeTruthy();
    expect(userDocument?.email).toBe(email);
    expect(userDocument?.firstName).toBe(firstName);
    expect(userDocument?.lastName).toBe(lastName);
    expect(userDocument?.password).toBe(password);

    const userQueueMessage = (await new Promise((resolve) => {
      channel.consume('userQueue', (msg) => {
        resolve(JSON.parse(msg!.content.toString()));
      });
    })) as { type: string; data: any };

    expect(userQueueMessage.type).toBe('new user');
    expect(userQueueMessage.data).toEqual({
      firstName,
      lastName,
      email,
      password,
    });
  });

  test('Create User - Fail - no pincode provided', async () => {
    const signupResponse = await request.post('/signup/create-user').send({
      user: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    expect(signupResponse.status).toBe(409);
    expect(signupResponse.body.error.description).toBe('request did not passed route validations');
    expect(signupResponse.body.error.data['body.pincode']).toBeDefined();
  });

  test('Create User - Fail - no user provided', async () => {
    const signupResponse = await request.post('/signup/create-user').send({
      pincode: '123456',
    });
    expect(signupResponse.status).toBe(409);
    expect(signupResponse.body.error.description).toBe('request did not passed route validations');
    expect(signupResponse.body.error.data['body.user']).toBeDefined();
  });

  test('Create User - Fail - wrong pincode', async () => {
    await request.post('/signup/send-pincode').send({
      email,
    });
    const signupResponse = await request.post('/signup/create-user').send({
      pincode: '123456',
      user: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    expect(signupResponse.status).toBe(409);
    expect(signupResponse.body.error.description).toBe('user entered wrong pincode');
  });
});

describe('Signin Endpoint', () => {
  beforeEach(async () => {
    await model.cleanCollections();
    await channel.purgeQueue('userQueue');
  });

  test('Signin API - Success', async () => {
    const sendPincodeResonse = await request.post('/signup/send-pincode').send({
      email,
    });
    expect(sendPincodeResonse.status).toBe(201);
    const pincodeDocument = await model.getPincode(email);
    const pincode = pincodeDocument?.pincode;
    const signupResponse = await request.post('/signup/create-user').send({
      pincode,
      user: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    expect(signupResponse.status).toBe(201);
    const signinResponse = await request.post('/signup/signin').send({
      email,
      password,
    });
    expect(signinResponse.status).toBe(200);
    expect(signinResponse.headers[headerNames.accessToken]).toBeTruthy();
  });

  test('Signin API - Fail - no email provided', async () => {
    const signinResponse = await request.post('/signup/signin').send({
      password,
    });
    expect(signinResponse.status).toBe(409);
    expect(signinResponse.body.error.description).toBe('request did not passed route validations');
    expect(signinResponse.body.error.data['body.email']).toBeDefined();
  });

  test('Signin API - Fail - no password provided', async () => {
    const signinResponse = await request.post('/signup/signin').send({
      email,
    });
    expect(signinResponse.status).toBe(409);
    expect(signinResponse.body.error.description).toBe('request did not passed route validations');
    expect(signinResponse.body.error.data['body.password']).toBeDefined();
  });

  test('Signin API - Fail - email is not valid', async () => {
    const signinResponse = await request.post('/signup/signin').send({
      email: 'tomeroko2',
      password,
    });
    expect(signinResponse.status).toBe(409);
    expect(signinResponse.body.error.description).toBe('request did not passed route validations');
    expect(signinResponse.body.error.data['body.email']).toBeDefined();
  });

  test('Signin API - Fail - user not found', async () => {
    const signinResponse = await request.post('/signup/signin').send({
      email: 'something@gmail.com',
      password,
    });
    expect(signinResponse.status).toBe(409);
    expect(signinResponse.body.error.description).toBe('user with this email not found');
  });

  test('Signin API - Fail - wrong password', async () => {
    const sendPincodeResonse = await request.post('/signup/send-pincode').send({
      email,
    });
    expect(sendPincodeResonse.status).toBe(201);
    const pincodeDocument = await model.getPincode(email);
    const pincode = pincodeDocument?.pincode;
    const signupResponse = await request.post('/signup/create-user').send({
      pincode,
      user: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    expect(signupResponse.status).toBe(201);
    const signinResponse = await request.post('/signup/signin').send({
      email,
      password: '1234567',
    });
    expect(signinResponse.status).toBe(409);
    expect(signinResponse.body.error.description).toBe('user entered wrong password');
  });
});
