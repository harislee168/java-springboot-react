import {useState, useEffect} from 'react'
import ReviewModel from '../models/ReviewModel';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

interface useReviewsApiProps {
  currentPage: number,
  reviewsPerPage: number,
  bookId: string | undefined
}

interface useReviewsApiReturnType {
  reviews: ReviewModel[],
  isLoading: boolean,
  httpError: null | Error,
  returnTotalElements: number,
  returnTotalPages: number
}

const useReviewsApi = (props: useReviewsApiProps):useReviewsApiReturnType => {

  const [reviews, setReviews] = useState<ReviewModel[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [returnTotalElements, setReturnTotalElements] = useState<number>(0);
  const [returnTotalPages, setReturnTotalPages] = useState<number>(1);

  useEffect(() => {
    const url = `${baseUrl}/api/reviews/search/findByBookId?bookId=${props.bookId}&page=${props.currentPage-1}&size=${props.reviewsPerPage}`

    axios.get(url)
      .then((response) => {
        const responseData = response.data._embedded.reviews;
        const loadedReviews: ReviewModel[] = [];
        setReturnTotalElements(response.data.page.totalElements);
        setReturnTotalPages(response.data.page.totalPages);

        for (const key in responseData) {
          loadedReviews.push({
            id: responseData[key].id,
            userEmail: responseData[key].userEmail,
            date: responseData[key].date,
            rating: responseData[key].rating,
            bookId: responseData[key].bookId,
            reviewDescription: responseData[key].reviewDescription,
          })
        }
        setReviews(loadedReviews);
        setIsLoading(false);
      })
      .catch((error) => {
        setHttpError(error.message())
        setIsLoading(false);
      })
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, [props.currentPage])

  return { reviews, isLoading, httpError, returnTotalElements, returnTotalPages }
}

export default useReviewsApi
