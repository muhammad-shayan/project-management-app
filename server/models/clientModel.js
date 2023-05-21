const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    phone:{
        type: String,
        unique:true
    }
})

module.exports = mongoose.model('Clients',clientSchema)