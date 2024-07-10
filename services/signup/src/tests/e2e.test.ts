import { initiateCommonUtils } from 'common-lib-tomeroko3';

import { connectToMongo } from '../configs/mongo';
import { channel, closeConnection, connectRabbitMQ } from '../configs/rabbitConnections';
import * as model from '../logic/DAL';

jest.setTimeout(30000);

describe('Signup API Integration Tests', () => {
  beforeAll(async () => {
    initiateCommonUtils(false, 'signup-test');
    await connectToMongo();
    await model.initCollections();
    await connectRabbitMQ();
    await model.cleanCollections();
    await channel.assertQueue('userQueue', { durable: false });
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    await model.cleanCollections();
    await channel.purgeQueue('signupQueue');
  });
});
