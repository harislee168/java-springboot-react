import React, { useState, useEffect } from 'react'
import BookModel from '../../models/BookModel'
import axios from 'axios'
import useBooksApi from '../../api/useBooksApi'
import SpinnerLoading from '../Utils/SpinnerLoading'
import SearchBook from './components/SearchBook'
import Pagination from '../Utils/Pagination'

const SearchBooksPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [booksPerPage] = useState<number>(3)

  const paginateHandler = (pageNumber: number) => setCurrentPage(pageNumber);
  const { books, isLoading, httpError, returnTotalElements, returnTotalPages } = useBooksApi({ currentPage: currentPage, booksPerPage: booksPerPage });

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
    <div>
      <div className='container'>
        <div>
          <div className='row mt-5'>
            <div className='col-6'>
              <div className='d-flex'>
                <input className='form-control me-2' type='search' placeholder='Search your book'
                  aria-labelledby='Search' />
                <button className='btn btn-outline-success'>Search</button>
              </div>
            </div>
            <div className='col-4'>
              <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type='button'
                  id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                  Category
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                  <li>
                    <a href='#' className='dropdown-item'>All</a>
                  </li>
                  <li>
                    <a href='#' className='dropdown-item'>Front End</a>
                  </li>
                  <li>
                    <a href='#' className='dropdown-item'>Back end</a>
                  </li>
                  <li>
                    <a href='#' className='dropdown-item'>Data</a>
                  </li>
                  <li>
                    <a href='#' className='dropdown-item'>DevOps</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <h5>Number of results: {returnTotalElements}</h5>
          </div>
          <p>{indexOfCurrentFirst + 1} to {lastItem} of {returnTotalElements} items</p>
          {books.map((book) => (<SearchBook key={book.id} book={book} />))}
          {returnTotalElements > 1 && <Pagination currentPage={currentPage} totalPages={returnTotalPages} paginateHandler={paginateHandler}/>}
        </div>
      </div>
    </div>
  )
}

export default SearchBooksPage
