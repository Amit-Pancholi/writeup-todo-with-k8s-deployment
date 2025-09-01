# for frontend/react-client
FROM node:latest
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npm" ,"start"]
# PORT=8081