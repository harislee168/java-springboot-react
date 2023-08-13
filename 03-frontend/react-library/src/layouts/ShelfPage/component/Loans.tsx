import { Link } from "react-router-dom"
import { returnBookApi, useGetCurrentLoans, renewBookApi } from "../../../api/useBooksApi"
import SpinnerLoading from "../../Utils/SpinnerLoading"
import React, {useState} from 'react'
import LoansModal from "./LoansModal"
import { useOktaAuth } from "@okta/okta-react"


const Loans = () => {
  const { authState } = useOktaAuth();
  const [checkout, setCheckout] = useState(false);
  const { shelfCurrentLoans, isLoadingShelfCurrentLoans, httpErrorShelfCurrentLoans } = useGetCurrentLoans({checkout: checkout})
  const returnBookHandler = (bookId: number) => {
    returnBookApi({bookId: bookId, checkout: checkout, setCheckout: setCheckout, accessToken: authState?.accessToken?.accessToken})
  }

  const renewBookHandler = (bookId: number) => {
    renewBookApi({bookId: bookId, checkout: checkout, setCheckout: setCheckout, accessToken: authState?.accessToken?.accessToken})
  }

  if (isLoadingShelfCurrentLoans) {
    return (
      <SpinnerLoading />
    )
  }

  if (httpErrorShelfCurrentLoans) {
    return (
      <div className='container m-5'>
        <p>{httpErrorShelfCurrentLoans.toString()}</p>
      </div>
    )
  }
  return (
    <div>
      {/* Desktop */}
      <div className='d-none d-lg-block mt-2'>
        {shelfCurrentLoans.length > 0 ?
          <React.Fragment>
            <h5>Current Loans:</h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => {
              return (
                <div key={shelfCurrentLoan.book.id}>
                  <div className='row mt-3 mb-3'>
                    <div className='col-4 col-md-4 container'>
                      {shelfCurrentLoan.book.img ?
                        <img src={shelfCurrentLoan.book.img} width='226' height='349' alt='Book' />
                        :
                        <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt='Book' />
                      }
                    </div>
                    <div className='card col-3 col-md-3 container d-flex'>
                      <div className='card-body'>
                        <div className='mt-3'>
                          <h4>Loan Options</h4>
                          {shelfCurrentLoan.daysLeft > 0 &&
                            <p className='text-secondary'>Due in {shelfCurrentLoan.daysLeft} days.</p>
                          }
                          {shelfCurrentLoan.daysLeft === 0 &&
                            <p className='text-success'>Due today.</p>
                          }
                          {shelfCurrentLoan.daysLeft < 0 &&
                            <p className='text-danger'>Past due by {shelfCurrentLoan.daysLeft} days.</p>
                          }
                          <div className='list-group mt-3'>
                            <button className='list-group-item list-group-item-action list-group-item-dark' aria-current='true'
                              data-bs-toggle='modal' data-bs-target={`#modal${shelfCurrentLoan.book.id}`}>
                              Manage Loan
                            </button>
                            <Link to='/search' className='list-group-item list-group-item-action'>Search more books?</Link>
                          </div>
                        </div>
                        <hr />
                        <p className='mt-3'>
                          Help other find the adventure by reviewing your loan.
                        </p>
                        <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.book.id}`}>Leave a review</Link>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <LoansModal shelfCurrentLoanModel={shelfCurrentLoan} mobile={false} returnBookHandler={returnBookHandler}
                  renewBookHandler={renewBookHandler} />
                </div>
              )
            })}
          </React.Fragment>
          :
          <React.Fragment>
            <h3 className='mt-3'>Currently no loans</h3>
            <Link className='btn btn-primary' to='/search'>Search for new book</Link>
          </React.Fragment>
        }
      </div>

      {/* Mobile */}
      <div className='container d-lg-none mt-2'>
        {shelfCurrentLoans.length > 0 ?
          <React.Fragment>
            <h5 className='mb-3'>Current Loans:</h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => {
              return (
                <div key={shelfCurrentLoan.book.id}>

                  <div className='d-flex justify-content-center align-items-center'>
                    {shelfCurrentLoan.book.img ?
                      <img src={shelfCurrentLoan.book.img} width='226' height='349' alt='Book' />
                      :
                      <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt='Book' />
                    }
                  </div>
                  <div className='card d-flex mt-5 mb-3'>
                    <div className='card-body container'>
                      <div className='mt-3'>
                        <h4>Loan Options</h4>
                        {shelfCurrentLoan.daysLeft > 0 &&
                          <p className='text-secondary'>Due in {shelfCurrentLoan.daysLeft} days.</p>
                        }
                        {shelfCurrentLoan.daysLeft === 0 &&
                          <p className='text-success'>Due today.</p>
                        }
                        {shelfCurrentLoan.daysLeft < 0 &&
                          <p className='text-danger'>Past due by {shelfCurrentLoan.daysLeft} days.</p>
                        }
                        <div className='list-group mt-3'>
                          <button className='list-group-item list-group-item-action list-group-item-dark' aria-current='true'
                            data-bs-toggle='modal' data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}>
                            Manage Loan
                          </button>
                          <Link to='/search' className='list-group-item list-group-item-action'>Search more books?</Link>
                        </div>
                      </div>
                      <hr />
                      <p className='mt-3'>
                        Help other find the adventure by reviewing your loan.
                      </p>
                      <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.book.id}`}>Leave a review</Link>
                    </div>
                  </div>
                  <hr />
                  <LoansModal shelfCurrentLoanModel={shelfCurrentLoan} mobile={true} returnBookHandler={returnBookHandler}
                  renewBookHandler={renewBookHandler}/>
                </div>
              )
            })}
          </React.Fragment>
          :
          <React.Fragment>
            <h3 className='mt-3'>Currently no loans</h3>
            <Link className='btn btn-primary' to='/search'>Search for new book</Link>
          </React.Fragment>
        }
      </div>
    </div>
  )
}

export default Loans
