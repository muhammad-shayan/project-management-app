import {Link} from 'react-router-dom'

export const ProjectCard = ({project}) => {
  return (
    <div className="col-md-6 mb-2">
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">
                      {project.name}
                  </h5>
                  <Link to={`projects/${project.id}`} className="btn btn-light">View</Link>
                </div>
                <p className="small">Status: <strong>{project.status}</strong></p>
            </div>
        </div>
    </div>
  )
}
