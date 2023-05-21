import { useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { GET_PROJECTS } from "../queries/projectQuery"
import { FaTrash } from "react-icons/fa"
import { DELETE_PROJECT } from "../mutations/projectMutations"

export default function DeleteProjectButton({id}) {
    const navigate = useNavigate()
    const [deleteProject] = useMutation(DELETE_PROJECT,{variables:{id}, 
        onCompleted: () => navigate('/'),
        refetchQueries:[{query: GET_PROJECTS}] })
  return (
        <div className="d-flex mt-5 ms-auto">
            <button className="btn btn-danger m-2" onClick={deleteProject}>
                <FaTrash /> Delete Project
            </button>
        </div>
  )
}
