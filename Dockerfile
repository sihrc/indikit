FROM sihrc/indikit
ADD . /indikit
WORKDIR /indikit
RUN . /root/.bashrc && \
    nvm use 0.12.7 && \
    npm install && \
    touch .env && echo "PORT=8000" >> .env && \
    gulp build
CMD ["/indikit/scripts/start.sh"]
