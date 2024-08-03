import { functionWrapper } from '/Users/tomer/code/micro/services/signup/src/test_modules/src/index';

import { connectToRabbitMq } from './connection';
import { initializeRabbitAgents } from './initialization';

export { newUserPublisher } from './initialization';

export const setupRabbitMQ = async () => {
  return functionWrapper(async () => {
    await connectToRabbitMq();
    await initializeRabbitAgents();
  });
};
