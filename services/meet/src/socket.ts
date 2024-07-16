import { functionWrapper } from 'common-lib-tomeroko3';
import { Server } from 'socket.io';

import { server } from './server';

interface User {
  socketId: string;
  userEmail: string;
}

const users: User[] = [];

export const initiateSocket = () => {
  return functionWrapper(() => {
    const io = new Server(server);

    io.on('connection', (socket) => {
      console.log('a user connected', socket.id);

      socket.on('join', (userEmail: string) => {
        users.push({ socketId: socket.id, userEmail });
        io.emit('users', users);
      });

      socket.on('call', (data: { to: string; offer: any }) => {
        io.to(data.to).emit('call', { from: socket.id, offer: data.offer });
      });

      socket.on('answer', (data: { to: string; answer: any }) => {
        io.to(data.to).emit('answer', { from: socket.id, answer: data.answer });
      });

      socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        const index = users.findIndex((user) => user.socketId === socket.id);
        if (index !== -1) {
          users.splice(index, 1);
        }
        io.emit('users', users);
      });
    });
  });
};
