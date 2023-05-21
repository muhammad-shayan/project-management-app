import { useMutation } from "@apollo/client"
import { UPDATE_PROJECT } from "../mutations/projectMutations"
import { GET_PROJECT } from "../queries/projectQuery"
import { useState } from "react"

export default function EditProjectForm({project}) {
    const [name,setName] = useState(project.name)
    const [description,setDescription] = useState(project.description)
    const [status,setStatus] = useState (()=>{
        switch(project.status){
            case "Not Started":
                return "new"
            case "In Progress":
                return "progress"
            case "Completed":
                return "completed"
            default:
                throw new Error(`Unknown status: ${project.status}`);
        }

    })
    
    const [updateProject] = useMutation(UPDATE_PROJECT,
        {variables:{id:project.id,name,description,status},
        refetchQueries:[{query:GET_PROJECT,variables:{id:project.id}}]})
    
    const onSubmit = (e) => {
        e.preventDefault()
        if (!name || !description || !status){
            alert('Please fill all fields')
        }
        updateProject(name,description,status)
    }


  return (
    <div className="mt-5">
        <h3>Update Project Details</h3>
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
            
            <button type="submit" className="btn btn-secondary mt-3">Submit</button>
        </form>
    </div>
  )
}
