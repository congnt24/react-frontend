FROM mhart/alpine-node:8.9.4
WORKDIR /app
ADD . /app
RUN npm i && npm run build \
    && npm prune --production \
    && ls | egrep '[^public|build|pm2.json|node_modules]' | xargs rm -rf
EXPOSE 3000
CMD node ./build/server.js