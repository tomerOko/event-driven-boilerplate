import { createServer } from 'http';

import { ENVs } from './configs/ENVs';

import { app } from './app';

export const initializeServer = async () => {
  const server = createServer(app);

  server.listen(ENVs.port, () => {
    console.log(`⚡️[server]: Server is litening to port ${ENVs.port} of the container
      or at http://localhost:<path according to the ingress routing rules> if run in the cluster locally
      so it is reachable at http://localhost:<port connected by the port farword> from the host machine also if run in the cluster locally
      or at http://localhost:${ENVs.port} if run outside the cluster (locally)
      or at http://<real domain>:<path according to the ingress routing rules> if run in the cloud
      `);
  });
};
