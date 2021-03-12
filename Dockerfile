FROM node:13.10.1-alpine AS build-stage

# Create src directory
RUN mkdir -p /src
WORKDIR /src

# Install src dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# wherer available
COPY package.json /src/
COPY package-lock.json /src/

RUN npm install

# Bundle src source
COPY . /src/

RUN npm run compile

FROM node:13.12.0-alpine AS prod

# Create src directory
# RUN mkdir /src
WORKDIR /src

COPY --from=build-stage /src/lib/ /src/lib/
COPY --from=build-stage /src/package.json /src/
COPY --from=build-stage /src/package-lock.json /src/
COPY --from=build-stage /src/.babelrc /src/

RUN npm i --production

# Define Commands
CMD [ "npm", "run", "start:prod" ]