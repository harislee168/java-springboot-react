import React, { useState } from 'react'
import SpinnerLoading from '../../Utils/SpinnerLoading';
import useHistoriesApi from '../../../api/useHistoriesApi';
import { Link } from 'react-router-dom';
import Pagination from '../../Utils/Pagination';

const HistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageinateHandler = (pageNumber: number) => { setCurrentPage(pageNumber) }

  const { histories, isLoadingHistory, httpErrorHistory, returnTotalPages } =
    useHistoriesApi({ currentPage: currentPage, historiesPerPage: 3 });

  if (isLoadingHistory) {
    return (
      <SpinnerLoading />
    )
  }

  if (httpErrorHistory) {
    return (
      <div className='container m-5'>
        <p>{httpErrorHistory.toString()}</p>
      </div>
    )
  }

  return (
    <div className='mt-2'>
      {
        histories.length > 0 ?
          <React.Fragment>
            <h5>Recent histories:</h5>
            {
              histories.map((history) => {
                return (
                  <div key={history.id} className='card mt-3 shadow p-3 mb-3 bd-body rounded'>
                    <div className='row-g-0'>
                      <div className='col-md-2'>
                        <div className='d-none d-lg-block'>
                          {history.img ?
                            <img src={history.img} width='123' height='196' alt='Book' />
                            :
                            <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                              width='123' height='196' alt='Default' />
                          }
                        </div>
                        <div className='d-lg-none d-flex justify-content-center align-items-center'>
                          {history.img ?
                            <img src={history.img} width='123' height='196' alt='Book' />
                            :
                            <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                              width='123' height='196' alt='Default' />
                          }
                        </div>
                      </div>
                      <div className='col'>
                        <div className='card-body'>
                          <h5 className='card-title'>{history.author}</h5>
                          <h4>{history.title}</h4>
                          <p className='card-text'>{history.description}</p>
                          <hr />
                          <p className='card-text'>Checked out on: {history.checkoutDate}</p>
                          <p className='card-text'>Returned on: {history.returnedDate}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                )
              })
            }
          </React.Fragment>
          :
          <React.Fragment>
            <h3 className='mt-3'>Currently no history:</h3>
            <Link className='btn btn-primary' to='/search'>Search new book</Link>
          </React.Fragment>
      }
      {returnTotalPages > 1 && <Pagination currentPage={currentPage} totalPages={returnTotalPages} paginateHandler={pageinateHandler} />}
    </div>
  )
}

export default HistoryPage
