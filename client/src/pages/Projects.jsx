import { useQuery } from "@apollo/client"
import { Link, useParams } from "react-router-dom"
import { GET_PROJECT } from "../queries/projectQuery"
import { Spinner } from "../components/Spinner"
import ClientInfo from "../components/ClientInfo"
import DeleteProjectButton from "../components/DeleteProjectButton"
import EditProjectForm from "../components/EditProjectForm"

export const Projects = () => {
    const {id} = useParams()
    const {loading,error,data} = useQuery(GET_PROJECT,{variables: {id}})
    if(loading) return <Spinner/>
    if(error) return <p>Something went wrong</p>
  return (
    <div className="card w-75 mx-auto p-5">
        <Link to='/' className="btn btn-light btn-sm ms-auto">Go Back</Link>
        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>

        <h5 className="mt-3">Project Status:</h5>
        <p className="lead">{data.project.status}</p>
        <ClientInfo client={data.project.client}/>
        <EditProjectForm project={data.project}/>
        <DeleteProjectButton id={id}/>
                    
    </div>
  )
}
