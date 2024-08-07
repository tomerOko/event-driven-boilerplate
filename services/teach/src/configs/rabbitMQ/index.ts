import { functionWrapper } from 'common-lib-tomeroko3';

import { connectToRabbitMq } from './connection';
import { initializeRabbitAgents } from './initialization';

export {
  teacherCreatedPublisher,
  teacherDeactivatedPublisher,
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
