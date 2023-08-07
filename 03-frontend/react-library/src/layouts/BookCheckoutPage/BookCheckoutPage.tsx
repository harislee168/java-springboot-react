import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import BookModel from '../../models/BookModel'
import { useGetSingleBookApi } from '../../api/useBooksApi';
import SpinnerLoading from '../Utils/SpinnerLoading';
import StarReview from '../Utils/StarReview';
import CheckoutAndReviewBox from './CheckoutAndReviewBox';

const BookCheckoutPage = () => {

  const bookId = (window.location.pathname).split('/')[2];
  const { book, isLoading, httpError } = useGetSingleBookApi({ bookId: bookId })
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
      <div className='container d-none d-lg-block'>
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
              <StarReview rating={2.5} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox book={book} mobile={false} />
        </div>
        <hr />
      </div>
      <div className='container d-lg-none mt-5'>
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
            <StarReview rating={2.5} size={32} />
          </div>
        </div>
        <hr />
        <CheckoutAndReviewBox book={book} mobile={true} />
      </div>
    </div>
  )
}

export default BookCheckoutPage
