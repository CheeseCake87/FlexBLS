# FlexBLS 🤖

The Flex Business Logic System is designed to be a standardized template to use
to build further business logic.

## Attention 🚨

**This project is still in development.**

## Stack 🥞

- [SolidJS](https://www.solidjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Flask](https://palletsprojects.com/projects/flask)
- [Websockets](https://websockets.readthedocs.io/)
- [Huey](https://huey.readthedocs.io/)

## Tooling 🧰

- [Docker](https://www.docker.com/)
- [Vite](https://vitejs.dev/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [orjson](https://pypi.org/project/orjson/)
- [vite-transporter](https://pypi.org/project/vite-transporter/)
- [pyqwe](https://pypi.org/project/pyqwe/)

## Setup ⚙️

Create a `.env` file from the `env.example` file

Setup the virtual environment

```bash
python3 -m venv .venv
```

```bash
source .venv/bin/activate
```

Install the Python requirements

```bash
pip install -r requirements/development.txt
```

Install and update the Frontend (Node) requirements

```bash
pyqwe install-frontend && pyqwe update-frontend
```

### Ports

- Flask : 7070
- Vite : 7071
- Websockets : 7072

## Running 🏃‍

### Development

Terminal 1 : Run Flask

```bash
pyqwe run-stack
```

Terminal 2 : Run Vite w/ SolidJS

```bash
pyqwe run-frontend
```

Terminal 3 : Run Websockets

```bash
pyqwe run-websockets
```

Now visit http://localhost:7071 (Vite) - this will display the installer page.

Load the database

```bash
flask create-clients 10
# or
flask create-clients 100
```

### Staging

Compile the frontend with `vite-transporter`

```bash
vt pack transport -m development
```

Terminal 1 : Run Flask

```bash
pyqwe run-stack
```

Terminal 2 : Run Websockets

```bash
pyqwe run-websockets
```

Now visit http://localhost:7070 (Flask) - this will display the installer page.


## Deployment 🚀

FlexBLS is designed to be deployed on a server with Docker.

### Attention 🚨

**The frontend is compiled with `vite-transporter` in the Dockerfile.**

To configure these settings see the following files:

- [docker/Dockerfile](Dockerfile) - `RUN vt pack transport -m docker-production`
- [frontend/globals.js](frontend%2Fglobals.js) - `MODE_LOOKUP`

### Docker

Build the base Docker image

```bash
docker build -f docker/Dockerfile-flexbls -t flexbls .
```

Deploy the Docker compose file.

```bash
docker-compose -f docker/docker-compose.yml up -d --build
# or
docker compose -f docker/docker-compose.yml up -d --build
```

### Nginx

You can use the following Nginx configuration to proxy the Flask and Websockets services.

[nginx/nginx.app.conf](nginx%2Fnginx.app.conf)
