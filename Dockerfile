FROM node as base

FROM base as dev
ENV NODE_ENV=development
COPY . .
RUN npm install -g nodemon && npm install --force -y
# ENTRYPOINT ls
# CMD ["node", "index.js"]