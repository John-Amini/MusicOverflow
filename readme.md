# MusicOverflow
MusicOverflow is a clone of SoundCloud where users are able to post ,listen and comment on different songs. MusicOverflow utilizes S3 in order to store and persist data allowing users to send files for upload. 
## Live Site
  - https://musicflow.herokuapp.com/

## Features
  - Users have the ability to sign up, login , and also login as a demo user.
  - Songs
    - Create new songs
    - Edit previously posted songs 
    - Delete songs
  - Listen to Songs posted by other users
  - Comments
    - Create new Comments
    - Read Comments
    - Edit previously posted comments
  - User Page
    - Read all comments and songs posted by specific user.
## Technologies Used
  - FrontEnd
    - React
    - Redux
  - Backend
    - Express
    - Postgresql

# Installation

## AWS
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

# Site Preview
## Home Page
![image](https://user-images.githubusercontent.com/91162716/165173141-ea651031-42cd-4e87-94f4-8230359aa452.png)
## Login Page
![image](https://user-images.githubusercontent.com/91162716/165173176-66c417b2-6878-4c50-803c-f258c1633d33.png)
## Signup Page
![image](https://user-images.githubusercontent.com/91162716/165173214-226a0abf-b0ee-4b0f-a0f9-afb368c58405.png)
## User Page
![image](https://user-images.githubusercontent.com/91162716/165173248-ef1167f0-489c-4ab4-9ddf-8125126c8716.png)
