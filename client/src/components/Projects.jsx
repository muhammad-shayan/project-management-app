import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQuery"
import { Spinner } from "./Spinner"
import { ProjectCard } from "./ProjectCard"

export const Projects = () => {
  const {loading,error,data} = useQuery(GET_PROJECTS)
  if(loading) return <Spinner/>
  if(error) return <p>Error! {error.data}</p>
  return (
    <>
    {data.projects.length>0?<div className="row mb-4">
        {data.projects.map(project=>{
            return <ProjectCard key={project.id} project={project}/>
        })}
    </div>:<p>No projects to show</p>}
    </>
  )
}
