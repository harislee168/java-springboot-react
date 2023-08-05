import React, {useState, useEffect} from 'react'
import BookModel from '../../models/BookModel'
import axios from 'axios'

const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading]= useState(true);
  const [httpError, setHttpError] = useState(null);

  // useEffect(() => {
  //   const baseUrl = ''
  // }, [])

  return (
    <div>
      Test
    </div>
  )
}

export default SearchBooksPage
