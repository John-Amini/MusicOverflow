# AWS
* Go to https://aws.amazon.com/console/
# Backend
* Create a .env file, using the .env.example as a template
* In psql, create a user (with CREATEDB privileges) to match your .env file
* run 'dotenv sequelize db:create'
* run 'dotenv sequelize db:migrate'
* run 'dotenv sequelize db:seed:all'
* run 'npm start'

# Frontend
* Start by navigating into the frontend folder
* run 'npm install' inside of that directory
* run 'npm start'

## Troubleshooting
* Make sure to 'npm start' the backend before the frontend, or you will get an error
* If you get an 'econnrefused' when trying to launch the application, run the command 'sudo service postgresql start' to get psql up and running