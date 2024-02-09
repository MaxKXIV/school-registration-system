# School Registration System

## TO USE INSERT SCRIPTS ADD `"type":"module"` TO YOUR PACKAGE.JSON

## Requirements

- [ ] Stored Procedures
- [ ] Materialized Views
- [ ] Transactions
- [ ] Indicies

## .env

Create .env file with the required information:

```
DB_USER="YOUR_USERNAME"
DB_PASSWORD="YOUR_PASSWORD"
DB_SERVER="YOUR_SERVER_NAME"
DB_NAME="YOUR_DATABASE_NAME"
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run init-students`

Runs the initStudents.js file and inserts student data into the students table

### `npm run init-courses`

Runs the initCourses.js file and inserts student data into the students table

### `npm run init-prereqs`

Runs the initPrereqs.js file and generates prereqs for some courses

### `npm run init-teachers`

Runs the initTeacherss.js file and generates teachers

## ER Diagram

<img src='./images/er-diagram.png'/>

## Troubleshooting

### Login Error

Make sure SQL Server Authentication is on:
See this video: <a href='https://www.youtube.com/watch?v=nKlIMvgL1vI'>link</a>
<img src='./images\troubleshooting-login.png'/>

Enable TCP/IP for sql server:
<img src='./images/troubleshooting-enable-tcp.png'/>
