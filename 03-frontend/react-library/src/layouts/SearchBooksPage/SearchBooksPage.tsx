import React, { useState, useEffect } from 'react'
import BookModel from '../../models/BookModel'
import axios from 'axios'
import useBooksApi from '../../api/useBooksApi'
import SpinnerLoading from '../Utils/SpinnerLoading'

const SearchBooksPage = () => {
  const searchBooksProps = { pageNumber: 0, size: 5 }
  const { books, isLoading, httpError } = useBooksApi({ book: searchBooksProps });

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

  return (
    <div>
      <div className='container'>
        <div>
          <div className='row mt-5'>
            <div className='col-6'>
              <div className='d-flex'>
                <input className='form-control me-2' type='search' placeholder='search' aria-labelledby='Search'/>
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
            <h5>Number of results: (22)</h5>
          </div>
          <p>1 to 5 of 22 items</p>
          <div>Search books</div>
        </div>
      </div>
    </div>
  )
}

export default SearchBooksPage
