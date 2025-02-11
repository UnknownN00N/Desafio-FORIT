const express = require('express');

const path = require('path');
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/index.routes.js");

app.use(express.static(path.join(__dirname, '..', 'public')))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app
.use('/', indexRouter)




app.listen(PORT, () =>
console.log("Server is running in: " + "http://localhost:" + PORT));