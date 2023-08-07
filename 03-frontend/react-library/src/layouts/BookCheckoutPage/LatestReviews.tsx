import React from 'react'
import ReviewModel from '../../models/ReviewModel'
import { Link } from 'react-router-dom'
import Review from '../Utils/Review'

const LatestReviews:React.FC<{reviews: ReviewModel [], bookId: number | undefined, mobile: boolean}> = (props) => {
  return (
    <div className={props.mobile? 'mt-3' : 'row mt-5'}>
      <div className={props.mobile? '': 'col-sm-2 col-md-2'}>
        <h2>Latest Reviews: </h2>
      </div>
      <div className='col-sm-10 col-md-10'>
        {
          props.reviews.length > 0?
          <React.Fragment>
            {props.reviews.slice(0, 3).map((review) => {
              return (<Review key={review.id} review={review} />)
            })}
            <div className='m-3'>
              <Link type='button' className='btn btn-primary btn-md text-white' to='/#'>Reach all reviews</Link>
            </div>
          </React.Fragment>
          :
          <div className='m-3'>
            <p className='lead'>Currently there are no reviews for this book</p>
          </div>
        }
      </div>
    </div>
  )
}

export default LatestReviews
