import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { FaList } from "react-icons/fa"
import { GET_CLIENTS } from "../queries/clientQuery"
import { ADD_PROJECT } from "../mutations/projectMutations"
import { GET_PROJECTS } from "../queries/projectQuery"



export const AddProjectModal = () => {
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [status,setStatus] = useState('new')
  const [clientId,setClientId] = useState('')

  const {loading,error,data} = useQuery(GET_CLIENTS)

  const [addProject] = useMutation(ADD_PROJECT,{variables:{name,description,status,clientId},
      update(cache,{data:{addProject}}){
          const {projects} = cache.readQuery({query:GET_PROJECTS})
          cache.writeQuery({
            query:GET_PROJECTS,
            data:{
              projects: [...projects,addProject]
            }
          })
        }
      })
  const onSubmit = (e) => {
      e.preventDefault()
      if(name === '' || description === '' || clientId === ''){
          return alert('Please add all fields')
      }
  
      addProject(name,description,status,clientId)
      setName('')
      setDescription('')
      setStatus('new')
      setClientId('')
  }

  if(loading) return null
  if(error) return <p>Something went wrong</p> 

  return (
    <>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#projectModal">
        <div className="d-flex align-items-center">
            <FaList /> 
            <span className="ms-2">Add Project</span>
        </div>
        
        </button>
        
        <div className="modal fade" id="projectModal" aria-labelledby="projectModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="projectModalLabel">Add Project</h1>
            </div>
            <div className="modal-body">
                <form className="form-group" onSubmit={onSubmit}>
                    <label className="form-label">Project Name</label>
                    <input type="text" className="form-control" placeholder="Enter project's name"
                    value={name} onChange={(e)=>setName(e.target.value)}/>
                    
                    <label className="form-label mt-3">Description</label>
                    <textarea className="form-control" placeholder="Enter project description"
                    value={description} onChange={(e)=>setDescription(e.target.value)}/>

                    <label className="form-label mt-3">Status</label>
                    <select className="form-select"
                    value={status} onChange={(e)=>setStatus(e.target.value)}>
                      <option value="new">Not Started</option>
                      <option value="progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <label className="form-label mt-3">Client</label>
                    <select className="form-select"
                    value={clientId} onChange={(e)=>setClientId(e.target.value)}>
                      <option selected>Select Client</option>
                      {data.clients.map(client => {
                        return <option key={client.id} value={client.id}>{client.name}</option>
                      })}
                    </select>
                    <button type="submit" className="btn btn-secondary mt-3">Submit</button>
                </form>
            </div>
            
            </div>
        </div>
        </div>
    </>
  )
}

