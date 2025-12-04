FROM node:20
WORKDIR /frontend
COPY ./package*.json ./
RUN npm install
COPY . .
# VOLUME ["/frontend/src"]

EXPOSE 5173

CMD ["npm", "start"] 
# 1 hours 6 minutes