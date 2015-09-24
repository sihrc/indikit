FROM debian

RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y git build-essential python curl && \
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash && \
    . /root/.bashrc && \
    nvm install 0.12.7 && \
    nvm use 0.12.7 && \
    npm install -g gulp && \
    npm install -g forever

ADD . /indikit
WORKDIR /indikit
RUN . /root/.bashrc && \
    nvm use 0.12.7 && \
    npm install && \
    touch .env && echo "PORT=8000" >> .env && \
    gulp build
CMD ["/indikit/scripts/start.sh"]
