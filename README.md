
# Form Builder!

This project consists of three components:
- Server side written with NodeJS
- Client written with ReactJS
- Database (MySQL 8, Server version: 10.4.11-MariaDB)

Full detail about the form builder can be found [here](https://github.com/wix-incubator/form-builder-exam#form-submit-page)

Deployed to production version on Heroku: https://form-builder-server.herokuapp.com/

# Setup

#### prerequisites
- node v12.18.3
- MySQL database 
- Optional: Use [DataGrip](https://www.jetbrains.com/datagrip/) to manage database

#### Step 1: Database
IMPORTANT NOTE: Credentials for my Google Cloud database are provided in the 'connection.js' file. If you wish to connect to my database, you can skip this step. 

- Create a MySQL database with a server of your choice (i.e XAMPP),  and connect to it
- The database/schema can be created with the following query:
```sh
CREATE SCHEMA DummyName;
```
- Once you've done so, in your schema, create the 4 tables with the following queries: 
```sh
CREATE TABLE `form_fields` (
  `field_id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) NOT NULL,
  `field_type` varchar(256) NOT NULL,
  `field_label` varchar(256) NOT NULL,
  `input_name` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```
```sh
CREATE TABLE `form_submissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `value` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```
```sh
CREATE TABLE `form_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `submissions` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```
```sh
CREATE TABLE `user_id` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```

#### Step 2: Server
 
 - Navigate to the root folder (FormBuilderLocalVersion - master), and run the following command:
```sh
$ npm install
```
- Inside 'connection.js' file, enter the database's credentials like so: (skip this if you want to use my Google Cloud database)
```sh
const db = mysql.createConnection({
  host: "<ExampleHost>",
  user: "<SomeUser>",
  password: "<IloveMom>",
  database: "<Database Name>",
});
```
- In the terminal run the following command to start the server:
```sh
$ node app.js
```

#### Step 3: Client

- Open a new terminal. Navigate to the client folder (FormBuilderLocalVersion - master/client), and run the following commands:
```sh
$ npm install
$ npm start
```
