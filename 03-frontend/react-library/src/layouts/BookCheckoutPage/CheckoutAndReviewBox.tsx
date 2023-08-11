import React from 'react'
import BookModel from '../../models/BookModel'
import { Link } from 'react-router-dom'
import { buttonCheckOutHandler } from '../../api/useBooksApi'

const CheckoutAndReviewBox: React.FC<{ book: BookModel | undefined, mobile: boolean,
  currentLoansCount: number, isAuthenticated: boolean | undefined, accessToken: string | undefined
  setIsBookCheckedOut: (value:boolean) => void, isCheckedOut: boolean }> = (props) => {

  const buttonRender = () => {
    if (props.isAuthenticated) {
      if (props.isCheckedOut) {
        return (<p><b>Book checked out. Enjoy!</b></p>)
      }
      else {
        if (props.currentLoansCount < 5) {
          return (<button onClick={() => buttonCheckOutHandler({bookId: props.book?.id,
            setIsBookCheckedOut: props.setIsBookCheckedOut, accessToken: props.accessToken})}
            className='btn btn-success btn-lg'>Checkout</button>)
        }
        else {
          return (<p className='text-danger'>Too many books checked out</p>)
        }
      }
    } else {
      return (<Link to='/login' className='btn btn-success btn-lg'>Sign in</Link>)
    }
  }

  return (
    <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
      <div className='mt-3'>
        <p>
          <b>{props.currentLoansCount}/5 </b> books checked out
        </p>
        <hr />
        {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ?
          <h4 className='text-success'>
            Available
          </h4>
          :
          <h4 className='text-danger'>
            Wait List
          </h4>
        }
        <div className='row'>
          <p className='col-6 lead'>
            <b>{props.book?.copies} </b> copies
          </p>
          <p className='col-6 lead'>
            <b>{props.book?.copiesAvailable} </b> available
          </p>
        </div>
      </div>
      {buttonRender()}
      <hr />
      <p className='mt-3'>This number can change until placing order has been completed</p>
      <p>Sign in to be able to leave a review</p>
    </div>
  )
}

export default CheckoutAndReviewBox
