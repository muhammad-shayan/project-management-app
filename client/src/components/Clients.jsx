import { useQuery } from "@apollo/client" 
import { ClientRow } from "./ClientRow"
import { GET_CLIENTS } from "../queries/clientQuery"


const Clients = () => {
  const {loading,error,data} = useQuery(GET_CLIENTS)

  if (loading) return null
  if(error) return <p>Error! {error.message}</p>
  
  return (
    <table className="table table-hover mt-4"> 
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Phone</th>
          <th className="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.clients.map((client,index)=>{
          return <ClientRow key={client.id} client={client} index={index}/>
        })}      
      </tbody>
    </table>
  )
}

export default Clients