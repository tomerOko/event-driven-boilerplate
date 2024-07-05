import * as amqp from 'amqplib/callback_api';

const rabbitmqHost = process.env.DEV_ENVIRONMENT === 'EXTERNAL' ? 'localhost' : 'rabbitmq';
const rabbitmqPort = '5672';
const rabbitmqUsername = 'user';
const rabbitmqPassword = 'password';

const connectionString = `amqp://${rabbitmqUsername}:${rabbitmqPassword}@${rabbitmqHost}:${rabbitmqPort}`;

export let channel: amqp.Channel;

export const connectRabbitMQ = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    amqp.connect(connectionString, (error0, connection) => {
      if (error0) {
        reject(error0);
        console.error('Error connecting to RabbitMQ', error0);
      } else {
        connection.createChannel((error1, ch) => {
          if (error1) {
            reject(error1);
            console.error('Error creating RabbitMQ channel', error1);
          }
          channel = ch;
          resolve();
          console.log('Connected to RabbitMQ');
        });
      }
    });
  });
};

export const closeConnection = async () => {
  if (channel) {
    await channel.close((error) => {
      if (error) {
        console.error('Error closing RabbitMQ channel', error);
      }
    });
  }
};
