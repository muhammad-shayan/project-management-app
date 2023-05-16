const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const colors = require('colors')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

app = express()
connectDB()

//app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV === 'development'
}))


port = process.env.PORT || 5000

app.listen(port,console.log(`Listening on port ${port}`))