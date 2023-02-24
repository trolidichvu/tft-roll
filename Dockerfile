# Dockerfile  
FROM node:10  
WORKDIR /app    
COPY . /app   
CMD node --max-old-space-size=1000 index.js
