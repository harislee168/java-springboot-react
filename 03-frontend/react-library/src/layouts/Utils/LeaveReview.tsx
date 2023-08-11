import React, {useState} from 'react'
import StarReview from './StarReview';
import { postReviewApi } from '../../api/useBooksApi';

const LeaveReview: React.FC<{postReviewHandler: (rating: number, reviewDescription: string) => void}> = (props) => {
  const [rating, setRating] = useState(0);
  const [displayInput, setDisplayInput] = useState(false);
  const [reviewDescription, setReviewDescription] = useState('');
  const starValueArray: number[] = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

  const starDropDownhandler = (starValue: number) => {
    setDisplayInput(true);
    setRating(starValue);
  }

  return (
    <div className='dropdown' style={{ cursor: 'pointer' }}>
      <h5 className='dropdown-toggle' id='dropdownMenuButton1' data-bs-toggle='dropdown'>
        Leave a review?
      </h5>
      <ul id='submitReviewRating' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
        {starValueArray.map((starValue) => {
          return (<li className='dropdown-item' key={starValue} onClick={() => starDropDownhandler(starValue)}>{starValue} star</li>)
        })}
      </ul>
      <StarReview rating={rating} size={32} />

      {
        displayInput &&
        <form method='POST' action='#'>
          <hr />
          <div className='mb-3'>
            <label className='form-label'>Description</label>
            <textarea className='form-control' id='submitReviewDescription' placeholder='Optional'
              rows={3} onChange={(e) => setReviewDescription(e.target.value)} />
          </div>
          <div>
            <button type='button' className='btn btn-primary mt-3'
              onClick={() => props.postReviewHandler(rating, reviewDescription)}>
                Submit Review</button>
          </div>
        </form>
      }
    </div>
  )
}

export default LeaveReview
