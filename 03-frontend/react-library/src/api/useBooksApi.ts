import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BookModel from '../models/BookModel'
import ReviewModel from '../models/ReviewModel'
import { useOktaAuth } from '@okta/okta-react'

type booksProps = {
  currentPage: number,
  booksPerPage: number,
  searchUrl: string
}

type useBooksApiReturnType = {
  books: BookModel[],
  isLoading: boolean,
  httpError: null | Error,
  returnTotalElements: number,
  returnTotalPages: number
};

type singleBookProps = {
  bookId: string
}

type useSingleBookApiReturnType = {
  book: BookModel | undefined,
  isLoading: boolean,
  httpError: null | Error
  reviews: ReviewModel[],
  totalStars: number,
  isLoadingReview: boolean
}

type useCurrentLoansCountReturnType = {
  currentLoansCount: number,
  isLoadingCurrentLoansCount: boolean;
  currentLoanCountHttpError: null | Error
}

const baseUrl = process.env.REACT_APP_BASE_URL;

const useBooksApi = (props: booksProps): useBooksApiReturnType => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [returnTotalElements, setReturnTotalElements] = useState<number>(0);
  const [returnTotalPages, setReturnTotalPages] = useState<number>(1);

  useEffect(() => {
    let url = `${baseUrl}/api/books`

    if (props.searchUrl === '') {
      url += `?page=${props.currentPage - 1}&size=${props.booksPerPage}`
    }
    else {
      url += props.searchUrl + `&page=${props.currentPage - 1}&size=${props.booksPerPage}`;
    }

    axios.get(url)
      .then((response) => {
        const responseData = response.data._embedded.books;
        const loadedBooks: BookModel[] = [];
        setReturnTotalElements(response.data.page.totalElements);
        setReturnTotalPages(response.data.page.totalPages);

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
    window.scrollTo(0, 0);
  }, [props.currentPage, props.searchUrl])

  return { books, isLoading, httpError, returnTotalElements, returnTotalPages }
}

export const useGetSingleBookApi = (props: singleBookProps): useSingleBookApiReturnType => {

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //For review
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  useEffect(() => {
    const url = `${baseUrl}/api/books/${props.bookId}`

    axios.get(url)
      .then((response) => {
        const responseJson = response.data;
        const loadedBook: BookModel = {
          id: responseJson.id,
          title: responseJson.title,
          author: responseJson.author,
          description: responseJson.description,
          copies: responseJson.copies,
          copiesAvailable: responseJson.copiesAvailable,
          category: responseJson.category,
          img: responseJson.img
        }
        setBook(loadedBook);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      })
  }, [])

  useEffect(() => {
    const url = `${baseUrl}/api/reviews/search/findByBookId?bookId=${props.bookId}`
    let totalRatings: number = 0;

    axios.get(url)
      .then((response) => {
        const responseData = response.data._embedded.reviews;
        const loadedReviews: ReviewModel[] = [];

        for (const key in responseData) {
          loadedReviews.push({
            id: responseData[key].id,
            userEmail: responseData[key].userEmail,
            date: responseData[key].date,
            rating: responseData[key].rating,
            bookId: responseData[key].bookId,
            reviewDescription: responseData[key].reviewDescription
          })
          totalRatings += responseData[key].rating
        }

        if (loadedReviews) {
          const roundStar = (Math.round((totalRatings / loadedReviews.length) * 2) / 2).toFixed(1);
          setTotalStars(Number(roundStar));
        }
        setIsLoadingReview(false);
        setReviews(loadedReviews);

      })
      .catch((error: any) => {
        setIsLoadingReview(false);
        setHttpError(error.message);
      })
  }, [])

  return { book, isLoading, httpError, reviews, totalStars, isLoadingReview }
}

export const useCurrentLoansCountApi = (): useCurrentLoansCountReturnType => {
  const { authState } = useOktaAuth();
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);
  const [currentLoanCountHttpError, setCurrentLoanCountHttpError] = useState(null);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const url = `${baseUrl}/api/books/secure/currentloans/count`
      console.log(url);
      console.log(authState.accessToken?.accessToken);
      axios.get(url, {
        headers: {
          Authorization:`Bearer ${authState.accessToken?.accessToken}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log('response')
        setIsLoadingCurrentLoansCount(false);
        setCurrentLoansCount(response.data);
      }).catch((error: any) => {
        console.log('error')
        setIsLoadingCurrentLoansCount(false);
        setCurrentLoanCountHttpError(error.message);
      })
    }
  }, [authState])

  return { currentLoansCount, isLoadingCurrentLoansCount, currentLoanCountHttpError }
}

export default useBooksApi
