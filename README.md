# Rock Scrissors Paper Assignment

## ![alt text](https://github.com/annop584/rsp_assignment/blob/main/assets/demo.gif)

## ![alt text](https://github.com/annop584/rsp_assignment/blob/main/assets/demo2.gif)

# Deploy on localhost

![alt text](https://github.com/annop584/rsp_assignment/blob/main/assets/containers.png?raw=true)

## _Prerequisite_

- nodejs
- docker, docker-compose
- clone this repository

```sh
git clone git@github.com:annop584/rsp_assignment.git
```

## _Run Application in Production mode_

start applications.

```sh
cd rsp_assignment
docker-compose -f docker-compose.yaml -f docker-compose.production.yaml up -d
```

wait a moment, then go to browser and enter url http://localhost:3050 for open web application.

for stop applications

```sh
cd rsp_assignment
docker-compose -f docker-compose.yaml -f docker-compose.production.yaml  down --rmi all
```

## _Run Application in Development mode_

install node module in rsp_front

```sh
cd rsp_assignment/rsp_front
npm install
```

install node module in rsp-back

```sh
cd rsp_assignment/rsp-back
npm install
```

start application in development mode

```sh
cd rsp_assignment
docker-compose.yaml -f docker-compose.yaml -f docker-compose.development.yaml  up -d
```

wait a moment, then go to browser and enter url http://localhost:3050 for open web application

stop application in development mode

```sh
cd rsp_assignment
docker-compose.yaml -f docker-compose.yaml -f docker-compose.development.yaml  down --rmi all
```

## _roughly E2E test by using cypress_

start application in development mode

```sh
cd rsp_assignment
docker-compose.yaml -f docker-compose.yaml -f docker-compose.development.yaml  up -d
```

open cypress

```sh
cd rsp_assignment/rsp_front
npm run cypress
```

after cypress application appear select "cypress/e2e/spec.cy.ts" for run e2e test

## _Change api endpoint at fronend_

open file at "rsp_assignment/rsp_front/.env.production" or "rsp_assignment/rsp_front/.env.development"
and change env variable "NEXT_PUBLIC_ENDPOINT" to your desired endpoint

```sh
NEXT_PUBLIC_ENDPOINT=http://yourendpoint:3050
```

---

# Deploy on Ubuntu Server

access to server

```sh
  ssh root@your-ubuntu-server-ip
```

install docker

```sh
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
apt-cache policy docker-ce
sudo apt install docker-ce
```

install docker compose

```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

adjusting the Firewall

```sh
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 3050
sudo ufw enable
```

install git

```sh
sudo apt install git
```

install application

```sh
cd ~
git clone git@github.com:annop584/rsp_assignment.git
```

change api endpoint at frontend path "rsp_assignment/rsp_front/.env.production" to this server ip

install nano text editor

```sh
sudo apt install nano
```

open .evn.pruduction file

```sh
cd ~/rsp_assignment
nano ~/rsp_assignment/rsp_front/.env.production"
```

change api endpoint

```sh
NEXT_PUBLIC_ENDPOINT=http://your-ubuntu-server-ip:3050
```

start application

```sh
cd ~/rsp_assignment
docker-compose -f docker-compose.yaml -f docker-compose.production.yaml  up -d
```

then try to test on browser by access url "http://your-ubuntu-server-ip:3050"
