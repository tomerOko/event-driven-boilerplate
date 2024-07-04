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
}

describe('Payment API Integration Tests', () => {
  beforeAll(async () => {
    await connectToMongo();
    await model.initPaymentsCollection(); 
    await connectRabbitMQ();
    await model.cleanrCollection();
    await channel.assertQueue('paymentQueue', { durable: false });
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    await model.cleanrCollection();
    await channel.purgeQueue('paymentQueue');
  });



  it('should return all payments', async () => {
    const _id = (await model.createPayment(paymentMock)).toString();
    const response = await request(app).get(`/add-payment/payment/${_id}`);
    expect(response.status).toBe(200);
    expect(response.body.payment).toEqual({...paymentMock, _id});
  });

  it('should create a new payment and send a message to RabbitMQ', async () => {
    //CRUD
    const response = await request(app).post('/add-payment/payment').send(paymentMock);
    expect(response.status).toBe(201);
    const _id = response.body.paymentId
    const payments = await model.getAllPayments()
    expect(payments).toHaveLength(1);
    const createdPayment = payments[0]
    const paymentDetails = {...paymentMock, _id}
    //EVENTS
    expect(createdPayment).toEqual(paymentDetails);
    const msg = await new Promise<Buffer | null>((resolve) => {
      channel.consume('paymentQueue', (message) => {
        resolve(message?.content || null);
      }, { noAck: true });
    });
    expect(msg).not.toBeNull();
    const receivedMsg = JSON.parse(msg!.toString());
    expect(receivedMsg).toEqual({ type: 'new payment', data: paymentDetails });
  });

  it('should update a payment', async () => {
    const _id = await model.createPayment(paymentMock);
    paymentMock.cvv = "200";
    const response = await request(app).put(`/add-payment/payment`).send({_id, ...paymentMock});
    expect(response.status).toBe(200);
    const updatedPayment = await model.getPaymentById(_id);
    expect(updatedPayment).toEqual({...paymentMock, _id});
  });

  it('should delete a payment', async () => {
    const _id = await model.createPayment(paymentMock);
    const response = await request(app).delete(`/add-payment/payment/${_id}`);
    expect(response.status).toBe(200);
    const payments = await model.getAllPayments();
    expect(payments).toHaveLength(0);
  });

  it('should return a payment by ID', async () => {
    const _id = (await model.createPayment(paymentMock)).toString()
    const response = await request(app).get(`/add-payment/payment/${_id}`);
    expect(response.status).toBe(200);
    expect(response.body.payment).toEqual({...paymentMock, _id});
  });
});
