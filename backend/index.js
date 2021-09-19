// importing func connecting to Mongo from db.js file 
const connectToMongo = require('./db');

const cors = require('cors')
// importing express app
const express = require('express')

// calling func to connect with Mongo
connectToMongo();

// creating app on express
const app = express()

// port no. on which our app will work
const port = 5000

// To use JSON 
app.use(express.json())

app.use(cors())

// Available Routes
// ---> Authentication route
app.use('/api/auth', require('./routes/auth'))
// ---> Notes route 
app.use('/api/notes', require('./routes/notes'))

// App is listening at port:5000 
app.listen(port, () => {
    console.log(`iNotebook listening at http://localhost:${port}`)
})
