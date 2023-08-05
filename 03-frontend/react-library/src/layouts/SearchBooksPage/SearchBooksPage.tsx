import React, {useState, useEffect} from 'react'
import BookModel from '../../models/BookModel'
import axios from 'axios'
import useBooksApi from '../../api/useBooksApi'
import SpinnerLoading from '../Utils/SpinnerLoading'

const SearchBooksPage = () => {
  const searchBooksProps = {pageNumber: 0, size: 5}
  const { books, isLoading, httpError } =  useBooksApi({book:searchBooksProps});

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
      Test
    </div>
  )
}

export default SearchBooksPage
