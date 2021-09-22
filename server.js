const express = require('express');
const dotEnv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const connectDB = require('./server/database/connection')
const app = express();

dotEnv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))

// mongoDB connection 
connectDB();

//parse requests to body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname, 'views/ejs'))

//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

// load routers
app.use('/', require('./server/routes/router.js'))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


//PAREI NO VIEWS 01:22:40 MONGODB VIDEO