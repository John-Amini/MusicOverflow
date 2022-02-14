# AWS
* Go to https://aws.amazon.com/console/
* Sign into AWS and go to S3 in order to create a new bucket
* Create a new bucket
  \*\* Remember to copy both the key and the secret key for the newly created bucket
* Go to Permissions in the new bucket and turn off all Block Public Access Settings.
# Backend
## In the backend folder:
* Create a .env file while using the .env\_example file as a guideline
* run npm install
* Go to psql and create a user with "CREATEDB" privileges.
* run 'npx dotenv sequelize db:create'
* run 'npx dotenv sequelize db:migrate'
* run 'npx dotenv sequelize db:seed:all'
* run 'npm start'
# Frontend
## In the frontend folder
* run 'npm install'
* run 'npm start'
