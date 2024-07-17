
#a basic image to start from
FROM node:19-alpine

# best practie is to update apk before instalations
RUN apk update

# install bash
RUN apk add --no-cache --upgrade bash 

# install git
RUN apk add git

# needed for git opperations
RUN apk add openssh-client

# needed for git opperations
RUN mkdir ~/.ssh
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

# needed global packages for the project
RUN npm i -g typescript nodemon ts-node

# make the binaries of the globaly installed packages avilable in the cli
ENV PATH=/usr/local/bin:/app/node_modules/.bin:$PATH

# copy the compiled js files into the container
COPY . /app

WORKDIR /app

RUN npm install

CMD ["npm", "start"]

