import { useOktaAuth } from "@okta/okta-react"
import { Link } from "react-router-dom"

const LibraryServices = () => {
  const { authState } = useOktaAuth();

  return (
    <div className='container my-5'>
      <div className='row p-4 align-items-center border shadow-lg' >
        <div className='col-lg-7 p-3'>
          <h1 className='display-4 fw-bold'>Can't find what you are looking for</h1>
          <p className='lead'>If you cannot find what  you are looking for, send our library admin's a personal message</p>
          <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
            {
              authState?.isAuthenticated ?
                <Link className='btn btn-primary btn-lg text-white px-4 me-md-4 fw-bold' to='#'>Library Services</Link>
                :
                <Link className='btn btn-primary btn-lg text-white' to='login'>Sign in</Link>
            }
          </div>
        </div>
        <div className='col-lg-4 offset-lg-1 shadown-lg lost-image'>
        </div>
      </div>
    </div>
  )
}

export default LibraryServices
