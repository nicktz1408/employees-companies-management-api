How to setup the server:
1. Go to /.env.tpl and fill in the fields by following the instructions there. Specifically
NODE_PRODUCTION should be "development" (temporarly).
PORT should be the desired port that the API should run on.
2. Rename ".env.tpl" to ".env"
3. Hit on the console npm install to install all the required dependencies (which are listed on the /package.json file).
4. Hit on the console node app.js to run the app!

node version: v8.12.0