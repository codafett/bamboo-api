# Bamboo API

## Requirements
To run the project you will need MongoDB running on the computer

## Install dependencies
Run the command from the project directory
```
npm i
```

## Running the project

By default the connection string is:
mongodb://localhost:27017/bamboo

If you want to use a different connection string then edit the config.js file

To run the project use:

```
npm run start
```

## Docker

To run using the docker container you first need to create the bamboo network (if this hasn't already been done):

```
docker network create bamboo
```

In order for the db to be stored externally to the container and prevent data loss between restarts you need to create the following path:

C:\Users\[Your user name]\data\db

Next build the docker image with:
```
npm run docker:build
```

Finally to run the container:
```
npm run docker:up
```


## Functionality Included:
* List Products
* View Product
* Add Product
* Add Comment
* Docker containers

## Functionality Not Starts:
* Using socket.io to show real-time updates