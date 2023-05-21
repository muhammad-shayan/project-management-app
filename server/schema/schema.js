const Clients = require('../models/clientModel')
const Projects = require('../models/projectModel')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql')

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent,args){
                return Clients.findById(parent.client)
            }
        }
    })
})

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })

})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        projects:{
            type:GraphQLList(ProjectType),
            resolve(parent,args){
                return Projects.find()
            }
        },
        project:{
            type:ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return Projects.findById(args.id)
            }
        },
        clients:{
            type:new GraphQLList(ClientType),
            resolve(parent,args){
                return Clients.find()
            }
        },
        client:{
            type:ClientType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                return Clients.findById(args.id)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addClient:{
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                const client = new Clients({
                    name:args.name,
                    email:args.email,
                    phone:args.phone
                })
                return client.save()
            }
        },
        deleteClient:{
            type:ClientType,
            args:{id:{type:GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                Projects.find({client:args.id}).then(projects=>{
                    projects.forEach(project=>project.deleteOne())
                })

                return Clients.findByIdAndDelete(args.id)
            }
        },
        addProject:{
            type: ProjectType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                description: {type:GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                    name: 'ProjectStatus',
                    values: {
                        new: {value:'Not Started'},
                        progress:{value: 'In Progress'},
                        completed: {value: 'Completed'}
                        },
                    }),
                    defaultValue: 'Not Started'
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent,args){
                const project = new Projects({
                    name:args.name,
                    description: args.description,
                    status: args.status,
                    client:args.clientId
                })
                return project.save() 
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
              id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
              return Projects.findByIdAndRemove(args.id);
            },
        },
        updateProject:{
            type: ProjectType,
            args: {
                id:{type:GraphQLNonNull(GraphQLID)},
                name:{type:GraphQLString},
                description: {type:GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values:{
                            new:{value:'Not Started'},
                            progress:{value:'In Progress'},
                            completed:{value: 'Completed'}
                        }
                    }),
                    defaultValue: 'Not Started'
                }
            },
            resolve(parent,args){
                return Projects.findByIdAndUpdate(args.id,
                    {
                        $set:{
                            name:args.name,
                            description:args.description,
                            status:args.status
                        }
                    },
                    {new:true}
                    )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation
})