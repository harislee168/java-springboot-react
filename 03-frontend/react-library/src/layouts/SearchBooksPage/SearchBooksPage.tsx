import React, { useState, useEffect } from 'react'
import BookModel from '../../models/BookModel'
import axios from 'axios'
import useBooksApi from '../../api/useBooksApi'
import SpinnerLoading from '../Utils/SpinnerLoading'
import SearchBook from './components/SearchBook'
import Pagination from '../Utils/Pagination'


const categoriesArray = [
  {key: 'all', value: 'All'},
  {key: 'fe', value: 'Front End'},
  {key: 'be', value: 'Back End'},
  {key: 'data', value: 'Data'},
  {key: 'devops', value: 'DevOps'},
]

const SearchBooksPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [booksPerPage] = useState<number>(3)
  const [searchText, setSearchtext] = useState<string>('')
  const [searchUrl, setSearchUrl] = useState<string>('')
  const [categorySelection, setCategorySelection] = useState<string>('Category')

  const paginateHandler = (pageNumber: number) => setCurrentPage(pageNumber);
  const searchButtonHandler = () => {
    setCurrentPage(1);
    setCategorySelection('Category');

    if (searchText === '') {
      setSearchUrl('')
    }
    else {
      setSearchUrl(`/search/findByTitleContaining?title=${searchText}`)
    }
  }
  const categoryHandler = ((valueSelected: string) => {
    setCurrentPage(1);
    setSearchtext('');

    if (valueSelected === 'all') {
      setCategorySelection('All')
      setSearchUrl('');
    }
    else {
      for (const category of categoriesArray) {
        if (category.key === valueSelected) {
          setCategorySelection(category.value);
        }
      }
      setSearchUrl(`/search/findByCategory?category=${valueSelected}`)
    }
  })

  const { books, isLoading, httpError, returnTotalElements, returnTotalPages } =
    useBooksApi({ currentPage: currentPage, booksPerPage: booksPerPage, searchUrl: searchUrl });

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
                  aria-labelledby='Search' value={searchText} onChange={(e) => setSearchtext(e.target.value)} />
                <button className='btn btn-outline-success' onClick={searchButtonHandler}>Search</button>
              </div>
            </div>
            <div className='col-4'>
              <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' type='button'
                  id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                  {categorySelection}
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                  {
                    categoriesArray.map((category) => {
                      return (
                        <li key={category.key} onClick={() => categoryHandler(category.key)}>
                          <a href='#' className='dropdown-item'>{category.value}</a>
                        </li>
                      )
                    })
                  }
                  {/* <li>
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
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          {
            returnTotalElements > 0 ?
              <React.Fragment>
                <div className='mt-3'>
                  <h5>Number of results: {returnTotalElements}</h5>
                </div>
                <p>{indexOfCurrentFirst + 1} to {lastItem} of {returnTotalElements} items</p>
                {books.map((book) => (<SearchBook key={book.id} book={book} />))}
              </React.Fragment>
              :
              <div className='m-5'>
                <h3>Can't find what you are looking for?</h3>
                <a href='#' type='button' className='btn main-color btn-md px-4 me md-2 fw-bold text-white'>Library Services</a>
              </div>
          }
          {returnTotalElements > 1 && <Pagination currentPage={currentPage} totalPages={returnTotalPages} paginateHandler={paginateHandler} />}
        </div>
      </div>
    </div>
  )
}

export default SearchBooksPage
