import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BookModel from '../models/BookModel'

type booksProps = {
  pageNumber: number,
  size: number
}

type useBooksApiReturnType = {
  books: BookModel[];
  isLoading: boolean;
  httpError: null | Error;
};

const bookBaseUrl = 'http://localhost:8080/api/books'

const useBooksApi = (props: { book: booksProps }): useBooksApiReturnType => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const url = `${bookBaseUrl}?page=${props.book.pageNumber}&size=${props.book.size}`
    axios.get(url)
      .then((response) => {
        const responseData = response.data._embedded.books
        const loadedBooks: BookModel[] = [];

        for (const key in responseData) {
          loadedBooks.push({
            id: responseData[key].id,
            title: responseData[key].title,
            author: responseData[key].author,
            description: responseData[key].description,
            copies: responseData[key].copies,
            copiesAvailable: responseData[key].copiesAvailable,
            category: responseData[key].category,
            img: responseData[key].img
          })
        }
        setBooks(loadedBooks);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      })
  }, [props.book.pageNumber, props.book.size])

  return { books, isLoading, httpError }
}

export default useBooksApi
