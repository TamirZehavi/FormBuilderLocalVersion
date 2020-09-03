
# Form Builder!

This project consists of three components:
- Server side written with NodeJS
- Client written with ReactJS
- Database (MySQL)

Full detail about the form builder can be found [here](https://github.com/wix-incubator/form-builder-exam#form-submit-page)

# Setup

#### prerequisites
- node v12.18.3
- MySQL database 
- Optional: Use [DataGrip](https://www.jetbrains.com/datagrip/) to manage database

#### Step 1: Database

- Create a MySQL database with a server of your choice (i.e XAMPP),  and connect to it
- Once you've done so, create the 4 tables with the following queries: 
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
- Inside 'connection.js' file, enter the database's credentials like so:
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
$ nodemon
```

#### Step 3: Client

- Navigate to the client folder (FormBuilderLocalVersion - master/client), and run the following commands:
```sh
$ npm install
$ npm start
```
