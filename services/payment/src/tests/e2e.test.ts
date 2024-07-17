import { initiateCommonUtils } from 'common-lib-tomeroko3';
import request from 'supertest';

import { app } from '../app';
import { connectToMongo } from '../configs/mongo';
import { channel, closeConnection, connectRabbitMQ } from '../configs/rabbitConnections';
import * as model from '../logic/DAL';
import { Payment } from '../logic/typesAndConsts';

jest.setTimeout(30000);

const paymentMock: Payment = {
  holderName: 'John Doe',
  cardNumber: '1234567890123456',
  expirationDate: '12/23',
  cvv: '123',
};

describe('Payment API Integration Tests', () => {
  beforeAll(async () => {
    initiateCommonUtils(false, 'app-payment-test');
    await connectToMongo();
    await model.initCollections();
    await connectRabbitMQ();
    await model.cleanrCollections();
    await channel.assertQueue('paymentQueue', { durable: false });
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    await model.cleanrCollections();
    await channel.purgeQueue('paymentQueue');
  });

  it('should return all payments', async () => {
    const _id = (await model.createPayment(paymentMock)).toString();
    const response = await request(app).get(`/payment/payment/${_id}`);
    expect(response.status).toBe(200);
    expect(response.body.payment).toEqual({ ...paymentMock, _id });
  });

  it('should create a new payment and send a message to RabbitMQ', async () => {
    const response = await request(app).post('/payment/payment').send(paymentMock);
    expect(response.status).toBe(201);
    const _id = response.body.paymentId;
    const paymentDetails = { ...paymentMock, _id };

    const payments = await model.getAllPayments();
    expect(payments).toHaveLength(1);
    const createdPayment = payments[0];
    createdPayment._id = createdPayment._id?.toString() as any;
    expect(createdPayment).toEqual(paymentDetails);

    //EVENTS
    const msg = await new Promise<Buffer | null>((resolve) => {
      //we could use the channel.get method to get the message from the queue, bet in real life we would use the consume method everywhere
      channel.consume(
        'paymentQueue',
        (message) => {
          resolve(message?.content || null);
        },
        { noAck: true },
      );
    });

    expect(msg).not.toBeNull();
    const receivedMsg = JSON.parse(msg!.toString());
    expect(receivedMsg).toEqual({ type: 'new payment', data: paymentDetails });
  });

  it('should update a payment', async () => {
    const _id = await model.createPayment(paymentMock);
    paymentMock.cvv = '200';
    const response = await request(app)
      .put(`/payment/payment`)
      .send({ _id, update: { cvv: '200' } });
    expect(response.status).toBe(200);
    const updatedPayment = await model.getPaymentById(_id);
    expect(updatedPayment).toEqual({ ...paymentMock, _id });
  });

  it('should delete a payment', async () => {
    const _id = await model.createPayment(paymentMock);
    const response = await request(app).delete(`/payment/payment/${_id}`);
    expect(response.status).toBe(200);
    const payments = await model.getAllPayments();
    expect(payments).toHaveLength(0);
  });

  it('should return a payment by ID', async () => {
    const _id = (await model.createPayment(paymentMock)).toString();
    const response = await request(app).get(`/payment/payment/${_id}`);
    expect(response.status).toBe(200);
    expect(response.body.payment).toEqual({ ...paymentMock, _id });
  });
});
