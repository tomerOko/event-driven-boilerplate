import { functionWrapper } from '@src/testy/src/index';

import { connectToRabbitMq } from './connection';
import { initializeRabbitAgents } from './initialization';

export {
  teacherCreatedPublisher,
  teacherDeletedPublisher,
  teacherUpdatedPublisher,
  topicCreatedPublisher,
  topicDeletedPublisher,
  topicUpdatedPublisher,
} from './initialization';

export const setupRabbitMQ = async () => {
  return functionWrapper(async () => {
    await connectToRabbitMq();
    await initializeRabbitAgents();
  });
};
