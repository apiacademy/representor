FROM irakli/node-alpine:6.2

#RUN adduser -S tester
#USER tester

COPY ./ /home/tester/application
WORKDIR /home/tester/application
RUN rm -rf node_modules \ 
 && npm install

CMD ["npm", "test"]