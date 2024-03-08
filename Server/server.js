const path = require('path');
const cookieParser  = require('cookie-parser');
const cors = require("cors");
const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const app = express();

const port = process.env.PORT || 3001;
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    maxAge: 3600,
    exposedHeaders: ['set-cookie'],
}));
app.use(cookieParser ());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

app.use(express.static(path.join(__dirname, './ui/build')));
// app.use(express.static(path.join(__dirname, './public')));
// app.use(express.static(path.join(__dirname, './ui/build/uploads')));
// app.use('/public', express.static('/public'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/course'));
app.use('/api/tenancy', require('./routes/tenancy'));
app.use('/api/user', require('./routes/user'));
app.use('/api/module', require('./routes/module'));
app.use('/api/survey', require('./routes/survey'));
app.use('/api/surveyReports', require('./routes/surveyReports'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './ui/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})