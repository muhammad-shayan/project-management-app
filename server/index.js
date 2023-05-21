const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const colors = require('colors')
const cors = require('cors')
//require('dotenv').config()
const connectDB = require('./config/db')
const path = require('path')

port = process.env.PORT || 5000

app = express()
connectDB()

app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV === 'development'
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'client', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }



app.listen(port,console.log(`Listening on port ${port}`))