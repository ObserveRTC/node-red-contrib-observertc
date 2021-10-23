# Build your own Docker image
Docker Image for ObserveRTC Node-RED usage
---

The docker image is built by using node-red-docker [repository](https://github.com/node-red/node-red-docker). The extra npm modules are in Dockerfile.custom


To build the image

   ./docker-alpine.sh; docker push observertc/node-red:latest

To push the image

   docker login; docker push observertc/node-red:latest