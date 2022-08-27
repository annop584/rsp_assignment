# Rock Scrissors Paper Assignment

---

## _Deploy on localhost_

![alt text](https://github.com/annop584/rsp_assignment/blob/main/containers.png?raw=true)

## _Prerequisite_

- nodejs
- docker, docker-compose
- clone this repository

## _Run Application in Production mode_

start applications.

```sh
cd rsp_assignment
docker-compose -f docker-compose.production.yaml  up -d
```

wait a moment, then go to browser and enter url http://localhost:3050 for open web application

stop applications.

```sh
cd rsp_assignment
docker-compose.yaml -f docker-compose.production.yaml  down --rmi all
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
docker-compose.yaml -f docker-compose.development.yaml  up -d
```

wait a moment, then go to browser and enter url http://localhost:3050 for open web application

stop application in development mode

```sh
cd rsp_assignment
docker-compose.yaml -f docker-compose.development.yaml  down --rmi all
```

## _roughly E2E test by using cypress_

start application in development mode

```sh
cd rsp_assignment
docker-compose.yaml -f docker-compose.development.yaml  up -d
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

## _Deploy on Ubuntu Server_

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

install nginx

```sh
sudo apt update
sudo apt install nginx
```

adjusting the Firewall

```sh
sudo ufw allow 'Nginx HTTP'
sudo ufw enable
```

install git

```sh
sudo apt install git
```

install application & start application

```sh
cd ~
git clone git@github.com:annop584/rsp_assignment.git
cd rsp_assignment
docker-compose -f docker-compose.production.yaml  up -d
```

set nginx reverse proxy

```sh
cd ~
nano /etc/nginx/sites-available/default
```

rewrite in file "/etc/nginx/sites-available/default" to

```sh
upstream front {
    server localhost:3050;
}
upstream api {
    server localhost:3050/api;
}
server {
        listen 80;
        location / {
            proxy_pass http://front;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
        }
        location /socket.io {
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_http_version 1.1;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_pass http://api/socket.io/;
        }
        location /api {
            rewrite /api/(.*) /$1 break;
            proxy_pass http://api;
        }
}
```

enable the file by creating a link from it to the sites-enabled directory

```sh
sudo ln -s /etc/nginx/sites-available/deafult /etc/nginx/sites-enabled/
```

restart nginx

```sh
sudo systemctl restart nginx
```

don't forget to change api endpoint at frontend path "rsp_assignment/rsp_front/.env.production"

then try to test on browser by access url "http://your-ubuntu-server-ip"
