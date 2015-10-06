FROM debian

RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y git build-essential python curl procps && \
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash && \
    . /root/.bashrc && \
    nvm install 4.0.0 && \
    nvm use 4.0.0 && \
    npm install -g gulp && \
    npm install -g forever

ADD . /indikit
WORKDIR /indikit
RUN . /root/.bashrc && \
    nvm use 4.0.0 && \
    npm install && \
    gulp build
CMD ["/indikit/scripts/start.sh"]
