import { useState } from 'react'
import { useOktaAuth } from '@okta/okta-react';
import { useGetSingleBookApi, useCurrentLoansCountApi, useIsBookCheckout, useHasUserLeftReview, postReviewApi, checkOutBookApi } from '../../api/useBooksApi';
import SpinnerLoading from '../Utils/SpinnerLoading';
import StarReview from '../Utils/StarReview';
import CheckoutAndReviewBox from './CheckoutAndReviewBox';
import LatestReviews from './LatestReviews';

const BookCheckoutPage = () => {

  const bookId = (window.location.pathname).split('/')[2];
  const { authState } = useOktaAuth();
  const [isBookCheckedOut, setIsBookCheckedOut] = useState(false);
  const [hasUserLeftReview, setHasUserLeftReview] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const { book, isLoading, httpError, reviews, totalStars, isLoadingReview } = useGetSingleBookApi({
    bookId: bookId,
    isBookCheckedOut: isBookCheckedOut, hasUserLeftReview: hasUserLeftReview
  })
  const { currentLoansCount, isLoadingCurrentLoansCount, currentLoanCountHttpError } = useCurrentLoansCountApi({ isBookCheckedOut: isBookCheckedOut })
  const { isLoadingIsBookCheckedOut, isBookCheckedOutHttpError } = useIsBookCheckout({ bookId: bookId, setIsBookCheckedOut: setIsBookCheckedOut })
  const { isLoadingHasUserLeftReview, isLoadingHasUserLeftReviewHttpError } =
    useHasUserLeftReview({ bookId: bookId, setHasUserLeftReview: setHasUserLeftReview });

  const checkoutBookHandler = () => {
    checkOutBookApi({
      bookId: Number(bookId),
      setIsBookCheckedOut: setIsBookCheckedOut, setDisplayError: setDisplayError,
      accessToken: authState?.accessToken?.accessToken
    })
  }

  const postReviewHandler = (rating: number, reviewDescription: string) => {
    postReviewApi({
      rating: rating, bookId: Number(bookId), reviewDescription: reviewDescription, setHasUserLeftReview: setHasUserLeftReview,
      accessToken: authState?.accessToken?.accessToken
    })
  }


  if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingIsBookCheckedOut
    || isLoadingHasUserLeftReview) {
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

  if (currentLoanCountHttpError) {
    return (
      <div className='container m-5'>
        <p>{currentLoanCountHttpError.toString()}</p>
      </div>
    )
  }

  if (isBookCheckedOutHttpError) {
    return (
      <div className='container m-5'>
        <p>{isBookCheckedOutHttpError.toString()}</p>
      </div>
    )
  }

  if (isLoadingHasUserLeftReviewHttpError) {
    return (
      <div className='container m-5'>
        <p>{isLoadingHasUserLeftReviewHttpError.toString()}</p>
      </div>
    )
  }

  return (
    <div>
      <div className='container d-none d-lg-block'>
        {
          displayError && <div className='alert alert-danger mt-3' role='alert'>
            Please pay outstanding fees and/or return late book
          </div>
        }
        <div className='row mt-5'>
          <div className='col-sm-2 col-md-2'>
            {
              book?.img ?
                <img src={book.img} width='226' height='349' alt='Book' />
                :
                <img src={require('../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt='Book' />
            }
          </div>
          <div className='col-4 col-md-4 container'>
            <div className='ml-2'>
              <h2>{book?.title}</h2>
              <h5 className='text-primary'>{book?.author}</h5>
              <p className='lead'>{book?.description}</p>
              <StarReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount}
            isAuthenticated={authState?.isAuthenticated} isCheckedOut={isBookCheckedOut} hasUserLeftReview={hasUserLeftReview}
            checkoutBookHandler={checkoutBookHandler} postReviewHandler={postReviewHandler} />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className='container d-lg-none mt-5'>
        {
          displayError && <div className='alert alert-danger mt-3' role='alert'>
            Please pay outstanding fees and/or return late book
          </div>
        }
        <div className='d-flex justify-content-center align-items-center'>
          {
            book?.img ?
              <img src={book.img} width='226' height='349' alt='Book' />
              :
              <img src={require('../../Images/BooksImages/book-luv2code-1000.png')} width='226' height='349' alt='Book' />
          }
        </div>
        <div className='mt-4'>
          <div className='ml-2'>
            <h2>{book?.title}</h2>
            <h5 className='text-primary'>{book?.author}</h5>
            <p className='lead'>{book?.description}</p>
            <StarReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox book={book} mobile={false} currentLoansCount={currentLoansCount}
          isAuthenticated={authState?.isAuthenticated} isCheckedOut={isBookCheckedOut} hasUserLeftReview={hasUserLeftReview}
          checkoutBookHandler={checkoutBookHandler} postReviewHandler={postReviewHandler} />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  )
}

export default BookCheckoutPage
