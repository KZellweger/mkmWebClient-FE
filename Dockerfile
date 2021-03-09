# build environment
FROM node:alpine as build
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --frozen-lockfile

# add app
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENV NODE_ENV=production
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]