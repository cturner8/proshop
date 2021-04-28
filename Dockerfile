FROM node:14
WORKDIR /proshop
COPY package.json frontend/package.json ./
RUN npm i
WORKDIR /frontend
RUN npm i
WORKDIR /proshop
COPY . .
CMD ["npm", "run", "dev"]