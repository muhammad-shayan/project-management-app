import { FaExclamationTriangle } from "react-icons/fa"
import { Link } from "react-router-dom"


export const NotFound = () => {
  return (
    <div className="text-center">
        <FaExclamationTriangle className="text-danger mb-3" size="5rem"/>
        <h1>404</h1>
        <p className="lead">This page does not exist</p>
        <Link to="/" className="btn btn-primary">Back</Link>

    </div>
  )
}
