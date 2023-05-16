const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    status:{
        type:String,
        enum:['Not Started','In Progress', 'Completed']
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Clients'
    }
})

module.exports = mongoose.model('Projects',projectSchema)