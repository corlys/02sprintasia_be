# ERD

# How To Run The App

- First, make sure you have node installed on your machine

```bash
node -v # shoudl print your node version
```

- Make sure you have postgres client installed

- Afte that make sure you have an environment file `.env` that
  have contents like below. Fill each of the variables with your
  configuration

```bash
# fill each of these, save it as a .env file
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
DB_PORT=
APP_PORT=
```

- lastly, install and run the app using your node package manager

```bash
# i used pnpm in here
pnpm i # will install packagesa

pnpm dev # will run in development mode
```
