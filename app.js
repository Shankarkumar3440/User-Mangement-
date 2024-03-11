const path = require('path');
const express = require('express');
const router = require('./routes/index')
const exphbs = require('express-handlebars');
const models = require('./models/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',router)


models.sync().then(() => {
    console.log("users table created");
    app.listen(3000)
}).catch((err) => {
    console.log(err);
})


