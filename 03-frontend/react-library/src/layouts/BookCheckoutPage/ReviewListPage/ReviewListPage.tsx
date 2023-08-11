import {useState} from 'react'
import useReviewsApi from '../../../api/useReviewsApi';
import SpinnerLoading from '../../Utils/SpinnerLoading';
import Review from '../../Utils/Review';
import Pagination from '../../Utils/Pagination';

const ReviewListPage = () => {

  const bookId = (window.location.pathname).split('/')[2];
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [reviewsPerPage] = useState<number>(5)

  const { reviews, isLoading, httpError, returnTotalElements, returnTotalPages } = useReviewsApi({bookId: bookId,
    currentPage: currentPage, reviewsPerPage: reviewsPerPage})
  const paginateHandler = (pageNumber: number) => setCurrentPage(pageNumber);

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

    const indexOfCurrentLast = currentPage * reviewsPerPage
    const indexOfCurrentFirst = indexOfCurrentLast - reviewsPerPage
    let lastItem = indexOfCurrentLast <= returnTotalElements ? indexOfCurrentLast : returnTotalElements

  return (
    <div className='container m-5'>
      <div>
        <h3>Comments: ({reviews.length})</h3>
      </div>
      <p>{indexOfCurrentFirst + 1} to {lastItem} of {returnTotalElements}</p>
      <div className='row'>
        {reviews.map((review) => {
          return (<Review review={review} key={review.id} />)
        })}
      </div>
      {returnTotalPages > 1 && <Pagination currentPage={currentPage} totalPages={returnTotalPages}
        paginateHandler={paginateHandler} /> }
    </div>
  )
}

export default ReviewListPage
