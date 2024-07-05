import { createServer } from 'http';

import { app } from './app';

export const initializeServer = async () => {
  const server = createServer(app);

  server.listen(3000, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:3000`);
  });
};
