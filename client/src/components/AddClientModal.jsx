import { useMutation } from "@apollo/client"
import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { ADD_CLIENT } from "../mutations/clientMutations"
import { GET_CLIENTS } from "../queries/clientQuery"


export const AddClientModal = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')

    const [addClient] = useMutation(ADD_CLIENT,{variables:{name,email,phone},
        update(cache,{data:{addClient}}){
            const {clients} = cache.readQuery({query:GET_CLIENTS})
            cache.writeQuery({
              query:GET_CLIENTS,
              data:{
                clients: [...clients,addClient]
              }
            })
          }
        })
    const onSubmit = (e) => {
        e.preventDefault()
        if(name === '' || email === '' || phone=== ''){
            return alert('Please add all fields')
        }
        addClient(name,email,phone)
        setName('')
        setEmail('')
        setPhone('')
    }


  return (
    <>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div className="d-flex align-items-center">
            <FaUser /> 
            <span className="ms-2">Add Client</span>
        </div>
        
        </button>
        
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Client</h1>
            </div>
            <div className="modal-body">
                <form className="form-group" onSubmit={onSubmit}>
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" placeholder="Enter client's name"
                    value={name} onChange={(e)=>setName(e.target.value)}/>

                    <label className="form-label mt-3">Email</label>
                    <input type="email" className="form-control" placeholder="Enter client's email"
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>

                    <label className="form-label mt-3">Phone</label>
                    <input type="text" className="form-control" placeholder="Enter client's phone"
                    value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    <button type="submit" className="btn btn-secondary mt-3">Submit</button>
                </form>
            </div>
            
            </div>
        </div>
        </div>
    </>
  )
}
