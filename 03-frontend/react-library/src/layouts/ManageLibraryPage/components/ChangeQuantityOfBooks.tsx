import React, { useState } from 'react'
import SpinnerLoading from '../../Utils/SpinnerLoading'
import Pagination from '../../Utils/Pagination'
import ChangeQuantityOfBook from './ChangeQuantityOfBook'
import BookModel from '../../../models/BookModel'
import { useBooksWithReloadNumberApi } from '../../../api/useBooksApi';

const ChangeQuantityOfBooks = () => {

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [booksPerPage] = useState<number>(5)
  const [reloadNumber, setReloadNumber] = useState<number>(0);

  const paginateHandler = (pageNumber: number) => setCurrentPage(pageNumber);

  const { books, isLoading, httpError, returnTotalElements, returnTotalPages } =
    useBooksWithReloadNumberApi({currentPage: currentPage, booksPerPage: booksPerPage, reloadNumber: reloadNumber });

  if (currentPage > returnTotalPages) {
    setCurrentPage(returnTotalPages)
  }

  const addReloadNumber = () => {
    setReloadNumber((prevValue) => {return prevValue + 1})
  }

  if (isLoading) {
    return (
      <SpinnerLoading />
    )
  }

  if (httpError) {
    return (
      <div className='container m-5'>
        <p>{httpError.toString()}</p>
      </div>
    )
  }

  const indexOfCurrentLast = currentPage * booksPerPage
  const indexOfCurrentFirst = indexOfCurrentLast - booksPerPage
  let lastItem = indexOfCurrentLast <= returnTotalElements ? indexOfCurrentLast : returnTotalElements

  return (
    <div className='container mt-5'>
      {
        returnTotalElements > 0 ?
          <React.Fragment>
            <div className='mt-3'>
              <h3>Number of result: {returnTotalElements}</h3>
              <p>{indexOfCurrentFirst + 1} to {lastItem} of {returnTotalElements} items</p>
              {books.map((book: BookModel) => {
                return (<ChangeQuantityOfBook book={book} key={book.id} addReloadNumber={addReloadNumber} />)
              })}
            </div>
          </React.Fragment>
          :
          <React.Fragment>
            <h5>No book added yet</h5>
          </React.Fragment>
      }
      {returnTotalPages > 1 && <Pagination currentPage={currentPage} totalPages={returnTotalPages} paginateHandler={paginateHandler} />}
    </div>
  )
}

export default ChangeQuantityOfBooks
