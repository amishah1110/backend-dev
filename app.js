const express = require('express');
const app = express();
const morgan = require('morgan');

app.set("view engine", 'ejs');

app.use(morgan('dev'));

app.use(express.json());//this is a middleware
app.use(express.urlencoded({extended: true})); //used to get data in form of json string

app.use(express.static('public')); //express will access all static files in "public" folder

// Define routes with express
app.get('/about', (req, res) => {
    res.send("About Page");
});

app.get('/profile', (req, res) => {
    res.send("Profile Page");
});

app.get('/', (req, res)=>{
    res.render('index');
})

app.post('/get-form-data', (req, res)=>{
    console.log(req.body);
    res.send("Data received, Thanks!");
})
// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
